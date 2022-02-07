# 02월 07일

> '견고한 node.js 프로젝트 아키텍쳐 설계하기' 를 읽고 요약 &  좀더 알아본 내용에 대해 정리

# node.js 프로젝트 설계하기

# 요약

- 3 계층 구조를 사용하십시오. (3 layer architecture)
- 비지니스 로직을 express.js의 controller에 넣지 마십시오.
- 백그라운드 작업을 할 때는 PubSub 패턴을 사용하고 이벤트를 발생 시키십시오.
- 마음의 평화를 위해 의존성 주입을 사용하십시오.
- 비밀번호, secrets와 API key들을 절대 누출하지 말고 configuration manager를 사용하십시오.
- node.js 서버 설정파일을 작은 모듈들로 분리하여 독립적으로 로드할 수 있게 하십시오.

# 폴더 구조

```html
src
│   app.js          # 앱 시작 점
└───api             # 앱의 모든 엔드 포인트에 대한 express 라우터
└───config          # 환경 변수와 그 외의 것들에 관련된 환경 설정
└───jobs            # agenda.js 파일에 대한 작업 정의(agenda 의제, 예정, 일정)
└───loaders         # 컴파일에 필요한 프로세스를 모듈로 분할
└───models          # 데이터베이스 모델 들
└───services        # 모든 비즈니스 로직은 여기에
└───subscribers     # 비동기 작업에 대한 이벤트 핸들러 
└───types           # Typescript용 타입 선언 파일 (d.ts)
```

# 3계층 설계(3Layer Architecture)

> Controller(API Router), Service Layer(비지니스 로직), Data Access Layer(SQL query)로 분리해야한다.

![3계층 설계](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e7fb77b2-9bd3-4f4c-b614-7ef2e8a5b902/Untitled.png)

3계층 설계

![실제 프로젝트 구성할 때 express와 DB를 사용한다.](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7018885f-e256-4895-b9fe-cbf54965e38c/Untitled.png)

실제 프로젝트 구성할 때 express와 DB를 사용한다.

**[ 이렇게 설계하는 이유 ]**

- 관심사 분리(principle of separation of concerns) 원칙을 적용하기 위해 해당 설계를 차용했다.
- 이를 통해 복잡하지 않고 유닛 테스트를 작성하기 쉬운 코드를 작성할 수 있다.
- 커맨드 라인 도구(CLI)로 비지니스 로직을 테스트 해야 하기 위해(API 호출로 테스트하면 안되는 이유는?)

**[ Controller ]**

- req와 res 객체를 이용할 수 있다. 다른 계층에서는 이용할 수 없다.
- HTTP전송에 관련된 계층이다.

**[ Service Layer ]**

- 비지니스 로직들이 작성된다.
- 분명한 목적이 있는 class들의 집합이다.
- 비지니스 로직들은 분명한 목적이 있는 코드 이기 때문에 객체 지향 설계를 적용해야한다.

**[ data access layer ]**

- ‘SQL query’ 형태의 코드가 작성되는 곳

## API Router와 비지니스 로직 분리 예제

**[ 분리 되기 전 코드 ]**

```jsx
route.post('/', async (req, res, next) => {

  // This should be a middleware or should be handled by a library like Joi.
  const userDTO = req.body;
  const isUserValid = validators.user(userDTO)
  if(!isUserValid) {
    return res.status(400).end();
  }

  // Lot of business logic here...
  const userRecord = await UserModel.create(userDTO);
  delete userRecord.password;
  delete userRecord.salt;
  const companyRecord = await CompanyModel.create(userRecord);
  const companyDashboard = await CompanyDashboard.create(userRecord, companyRecord);

  ...whatever...

  // And here is the 'optimization' that mess up everything.
  // The response is sent to client...
  res.json({ user: userRecord, company: companyRecord });

  // But code execution continues :(
  const salaryRecord = await SalaryModel.create(userRecord, companyRecord);
  eventTracker.track('user_signup',userRecord,companyRecord,salaryRecord);
  intercom.createUser(userRecord);
  gaAnalytics.event('user_signup',userRecord);
  await EmailService.startSignupSequence(userRecord)
});
```

**[ 분리 된 후 코드]**

```jsx
route.post('/', 
  validators.userSignup, // this middleware take care of validation
  async (req, res, next) => {
    // The actual responsability of the route layer.
    const userDTO = req.body;

    // Call to service layer.
    // Abstraction on how to access the data layer and the business logic.
    const { user, company } = await UserService.Signup(userDTO);

    // Return a response to client.
    return res.json({ user, company });
  });
import UserModel from '../models/user';
import CompanyModel from '../models/company';

export default class UserService() {

  async Signup(user) {
    const userRecord = await UserModel.create(user);
    const companyRecord = await CompanyModel.create(userRecord); // needs userRecord to have the database id 
    const salaryRecord = await SalaryModel.create(userRecord, companyRecord); // depends on user and company to be created
    
    ...whatever
    
    await EmailService.startSignupSequence(userRecord)

    ...do more stuff

    return { user: userRecord, company: companyRecord };
  }
}
```

**[ 읽으면서 들었던 의문들]**

- 클라이언트로 response를 보낼 때와 프로세스를 백그라운드에서 계속 실행할 때를 구분해야 하는 이유는?

  - 클라이언트에게 요청에 대한 응답을 보냈다면 해당 프로세스를 종료하고 이후 필요한 작업은 백그라운드에서 이루어져야 하기 때문인가?

  - 클라이언트로 response를 보낸 후에 프로세스 작업을 계속 하는 코드

    ```jsx
    route.post('/', async (req, res, next) => {
    
      // This should be a middleware or should be handled by a library like Joi.
      const userDTO = req.body;
      const isUserValid = validators.user(userDTO)
      if(!isUserValid) {
        return res.status(400).end();
      }
    
      // Lot of business logic here...
      const userRecord = await UserModel.create(userDTO);
      delete userRecord.password;
      delete userRecord.salt;
      const companyRecord = await CompanyModel.create(userRecord);
      const companyDashboard = await CompanyDashboard.create(userRecord, companyRecord);
    
      ...whatever...
    
      // And here is the 'optimization' that mess up everything.
      // The response is sent to client...
      res.json({ user: userRecord, company: companyRecord });
    
      // But code execution continues :(
      const salaryRecord = await SalaryModel.create(userRecord, companyRecord);
      eventTracker.track('user_signup',userRecord,companyRecord,salaryRecord);
      intercom.createUser(userRecord);
      gaAnalytics.event('user_signup',userRecord);
      await EmailService.startSignupSequence(userRecord)
    });
    ```

- api와 비지니스 로직을 어떻게 정확히 구분하는 가?

- 유닛 테스트 코드는 어떻게 작성될까?

# Pub/Sub 계층

3계층 구조 범위 내에는 없는 계층이지만 활용하면 유용하다.

**[ 특징 ]**

- 하나의 함수가 여러 가지 일을 하게되어 ‘단일 책임 원칙(principle of single responsibility)’을 위배하는 것을 막기 위해 이용되는 계층이다.
- 책임을 분리하여 간결한 코드를 유지 관리 할 수 있다.
- 독립적인 서비스들을 직접 호출하는 것이 이벤트 발생으로 접근 방법이 더 좋다. (이렇게 하면 리스터들이 그들의 역할을 책임지게 된다.)

## pub/sub 패턴을 적용한 예제

**[ 적용 전 ]**

```jsx
import UserModel from '../models/user';
import CompanyModel from '../models/company';
import SalaryModel from '../models/salary';

export default class UserService() {

  async Signup(user) {
    const userRecord = await UserModel.create(user);
    const companyRecord = await CompanyModel.create(user);
    const salaryRecord = await SalaryModel.create(user, salary);

    eventTracker.track(
      'user_signup',
      userRecord,
      companyRecord,
      salaryRecord
    );

    intercom.createUser(
      userRecord
    );

    gaAnalytics.event(
      'user_signup',
      userRecord
    );
    
    await EmailService.startSignupSequence(userRecord)

    ...more stuff

    return { user: userRecord, company: companyRecord };
  }

}
```

**[ 적용 후 ]**

```jsx
import UserModel from '../models/user';
import CompanyModel from '../models/company';
import SalaryModel from '../models/salary';

export default class UserService() {

  async Signup(user) {
    const userRecord = await this.userModel.create(user);
    const companyRecord = await this.companyModel.create(user);
    this.eventEmitter.emit('user_signup', { user: userRecord, company: companyRecord })
    return userRecord
  }
}
eventEmitter.on('user_signup', ({ user, company }) => {

  eventTracker.track(
    'user_signup',
    user,
    company,
  );

  intercom.createUser(
    user
  );

  gaAnalytics.event(
    'user_signup',
    user
  );
})
eventEmitter.on('user_signup', async ({ user, company }) => {
  const salaryRecord = await SalaryModel.create(user, company);
})
eventEmitter.on('user_signup', async ({ user, company }) => {
  await EmailService.startSignupSequence(user)
})
```

**[ 읽으면서 들었던 의문들]**

- pub/sub 패턴 이란?
- await구문에서 ‘unhandledPromise’를 process.on(’unhandleRejection’, cb)로 처리는 방법은 무엇인가?

# 의존성 주입(Dependency Injection)

다른 이름으로 제어 역전(IoC)이라 불리는 이 패턴은 코드를 구조화하는데 많이 사용된다.

**[ 특징 ]**

- 생성자를 통해 클래스와 함수의 의존성을 전달해주는 방식이다.
- ‘호환 가능한 의존성(compatible dependency)’을 주입함으로써 유연하게 코드를 유지할 수 있다.

**[ 사용하는 이유 ]**

- 서비스에 대한 유닛 테스트 작성하는데 도움이 된다.
- 다른 흐름(context)에서 해당 코드를 사용할 때 도움이 된다.

## 의존성 주입을 적용한 예제

[ 적용 전 ]

```jsx
import UserModel from '../models/user';
import CompanyModel from '../models/company';
import SalaryModel from '../models/salary';  
class UserService {
  constructor(){}
  Sigup(){
    // Caling UserMode, CompanyModel, etc
    ...
  }
}
```

[ 적용 후]

```jsx
export default class UserService {
  constructor(userModel, companyModel, salaryModel){
    this.userModel = userModel;
    this.companyModel = companyModel;
    this.salaryModel = salaryModel;
  }
  getMyUser(userId){
    // models available throug 'this'
    const user = this.userModel.findById(userId);
    return user;
  }
}
import UserService from '../services/user';
import UserModel from '../models/user';
import CompanyModel from '../models/company';
const salaryModelMock = {
  calculateNetSalary(){
    return 42;
  }
}
const userServiceInstance = new UserService(userModel, companyModel, salaryModelMock);
const user = await userServiceInstance.getMyUser('12346');
```

## Node.js의 Express.js에서 의존성 주입 사용한 예제

```jsx
route.post('/', 
  async (req, res, next) => {
    const userDTO = req.body;

    const userServiceInstance = Container.get(UserService) // Service locator

    const { user, company } = userServiceInstance.Signup(userDTO);

    return res.json({ user, company });
});
```

**[ 읽으면서 들었던 의문들]**

- 의존성을 왜 전달해주는가?
- 어떻게 생성자를 통해 클래스와 함수의 의존성을 절달해 줄 수 있지?(예제 코드 필요)
- ‘*호환 가능한 의존성(compatible dependency)’ 이란 무엇인가?*
- 유연하게 코드를 유지한다는 것이 무엇인가?
- 이걸 적용하지 않으면 어떤 안 좋은 일이 일날 수 있는가?(정확한 예가 필요)
- Service Locator 란? (인스턴스가 필요할 때 호출되지?)

# Unit Testing 예제

분석 필요

```jsx
import UserService from '../../../src/services/user';

describe('User service unit tests', () => {
  describe('Signup', () => {
    test('Should create user record and emit user_signup event', async () => {
      const eventEmitterService = {
        emit: jest.fn(),
      };

      const userModel = {
        create: (user) => {
          return {
            ...user,
            _id: 'mock-user-id'
          }
        },
      };

      const companyModel = {
        create: (user) => {
          return {
            owner: user._id,
            companyTaxId: '12345',
          }
        },
      };

      const userInput= {
        fullname: 'User Unit Test',
        email: 'test@example.com',
      };

      const userService = new UserService(userModel, companyModel, eventEmitterService);
      const userRecord = await userService.SignUp(teamId.toHexString(), userInput);

      expect(userRecord).toBeDefined();
      expect(userRecord._id).toBeDefined();
      expect(eventEmitterService.emit).toBeCalled();
    });
  })
})
```

# 스케줄링 및 반복 작업(Cron Jobs and Recurring Task)

- 비지니스 로직이 service layer에 캡슐화 되어 스케줄링 작업을 하기 용이해 졌다.

[ 코드 실행을 지연 시킬 때 사용하는 방법 ]

코드 실행을 지연 시킬 때 node.js의 setTimeout(원시적 방법)을 사용하는 것이 아닌 DB에서 작업을 유지하고 실행하는 프레임워크를 사용해야 한다.

그래야 실패한 작업을 제어하고 성공한 작업으로부터 피드백을 받기 쉽다.

**[ 읽으면서 들었던 의문들]**

- 여기서 말하는 스케줄링 작업은 무엇인가? (thread 스케줄링 작업? callbakc 스케줄링 작업?)
- 여기서 말하는 반복 작업이란 무엇인가?
- DB에서 작업을 유지하고 실행하는 프레임워크에는 뭐가 있을 까?(정확한 예시 코드 필요)
- ‘node.js의 태스크 매니저인 agenda.js를 사용하는 가이드’의 내용을 찾아보자.

# 설정 및 시크립 파일(Configurations and secrets)

> 외부에 알려서는 안되는 key나 특정 설정을 저장하는 방법으로 dotenv 방법을 추천한다.

[ 적용 하는 방법 ]

- `.env` 파일 생성 (단 해당 파일을 커밋해서는 안된다.)

- npm 으로 dotenv를 설치하여 `.env`파일을 로드하면 process.env 객체에 해당 값들이 대입된다.

- `config/index.ts` 파일에서 process.env값을 객체에 다시 저장한다. (코드 구조화 과정)

  ```jsx
  const dotenv = require('dotenv');
  // config() will read your .env file, parse the contents, assign it to process.env.
  dotenv.config();
  
  export default {
    port: process.env.PORT,
    databaseURL: process.env.DATABASE_URI,
    paypal: {
      publicKey: process.env.PAYPAL_PUBLIC_KEY,
      secretKey: process.env.PAYPAL_SECRET_KEY,
    },
    paypal: {
      publicKey: process.env.PAYPAL_PUBLIC_KEY,
      secretKey: process.env.PAYPAL_SECRET_KEY,
    },
    mailchimp: {
      apiKey: process.env.MAILCHIMP_API_KEY,
      sender: process.env.MAILCHIMP_SENDER,
    }
  }
  ```

**[ 읽으면서 들었던 의문들]**

- Twelve-Factor App의 battle-tested 개념이 무엇인가?

# Loaders

> 이 패턴은 node.js 서비스의 시작 프로세스를 테스트 가능한 모듈로 나눌 수 있다. W3Tech microframework에서 참고한 것이지만 해당 패키지를 사용하지는 않는다.

## 목적이 있는 작은 파일 단위로 나누기

[ 적용 전 ]

```jsx
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const errorhandler = require('errorhandler');
const app = express();

app.get('/status', (req, res) => { res.status(200).end(); });
app.head('/status', (req, res) => { res.status(200).end(); });
app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json(setupForStripeWebhooks));
app.use(require('method-override')());
app.use(express.static(__dirname + '/public'));
app.use(session({ secret: process.env.SECRET, cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

require('./config/passport');
require('./models/user');
require('./models/company');
app.use(require('./routes'));
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({'errors': {
    message: err.message,
    error: {}
  }});
});

... more stuff 

... maybe start up Redis

... maybe add more middlewares

async function startServer() {    
  app.listen(process.env.PORT, err => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Your server is ready !`);
  });
}

// Run the async function to start our server
startServer();
```

[ 적용 후 ]

```jsx
const loaders = require('./loaders');
const express = require('express');

async function startServer() {

  const app = express();

  await loaders.init({ expressApp: app });

  app.listen(process.env.PORT, err => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Your server is ready !`);
  });
}

startServer();
//loaders/index.js
import expressLoader from './express';
import mongooseLoader from './mongoose';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  console.log('MongoDB Intialized');
  await expressLoader({ app: expressApp });
  console.log('Express Intialized');

  // ... more loaders can be here

  // ... Initialize agenda
  // ... or Redis, or whatever you want
}
//loaders/express.js
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

export default async ({ app }: { app: express.Application }) => {

  app.get('/status', (req, res) => { res.status(200).end(); });
  app.head('/status', (req, res) => { res.status(200).end(); });
  app.enable('trust proxy');

  app.use(cors());
  app.use(require('morgan')('dev'));
  app.use(bodyParser.urlencoded({ extended: false }));

  // ...More middlewares

  // Return the express app
  return app;
})
//loaders/mongoose.js
import * as mongoose from 'mongoose'
export default async (): Promise<any> => {
  const connection = await mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
  return connection.connection.db;
}
```

**[ 읽으면서 들었던 의문들]**

- node.js 서비스의 시작 프로세스란 무엇인가? (정확한 예시 필요)
  - node.js 서비스에 쓰이는 module or 미들웨어 들을 사용하기 위한 초기화 작업들을 시작 프로세스라고 하는 것 같다.