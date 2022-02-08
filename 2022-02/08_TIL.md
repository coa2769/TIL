# 02월 08일

> '견고한 node.js 프로젝트 아키텍쳐 설계하기' 를 읽고 요약 &  좀더 알아본 내용에 대해 정리
> Age Of Vue 강의 노트 요약 & 좀더 알아본 내용 정리

# node.js 프로젝트 설계하기

# 1. 요약

- 3 계층 구조를 사용하십시오. (3 layer architecture)
- 비지니스 로직을 express.js의 controller에 넣지 마십시오.
- 백그라운드 작업을 할 때는 PubSub 패턴을 사용하고 이벤트를 발생 시키십시오.
- 마음의 평화를 위해 의존성 주입을 사용하십시오.
- 비밀번호, secrets와 API key들을 절대 누출하지 말고 configuration manager를 사용하십시오.
- node.js 서버 설정파일을 작은 모듈들로 분리하여 독립적으로 로드할 수 있게 하십시오.

# 2. 폴더 구조

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

# 3. 3계층 설계(3Layer Architecture)

> Controller(API Router), Service Layer(비지니스 로직), Data Access Layer(SQL query)로 분리된 구조로 구현하는 것이 좋다.

![3계층 설계](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e7fb77b2-9bd3-4f4c-b614-7ef2e8a5b902/Untitled.png)

3계층 설계

## 3.1. 각 계에 대한 설명

### Controller

- HTTP전송에 관련된 계층이다.
  - 클라이언트 요청을 받고 요청에 맞는 서비스에 전달한다.
  - 서비스에서 가공한 데이터를 클라이언트에게 응답으로 전달한다.
- req와 res 객체를 이용할 수 있다. (른 계층에서는 이용할 수 없다.)

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
```

### Service Layer

- 비지니스 로직을 포함한다.
- 비지니스 로직들은 분명한 목적이 있는 코드 이기 때문에 객체 지향 설계를 적용해야한다. (캡슐화 & 추상화)

```jsx
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

### Data Access Layer

- DB와 직접적인 통신을 다룬다.
- ‘SQL query’ 형태의 코드가 작성되는 곳

## 3.2. 특징

- 관심사 분리(principle of separation of concerns) 원칙을 적용되었다.

- 각 Layer가 독립적이므로 확장성이 용이하다.

- 유닛 테스트 코드를 작성하기 쉬워진다.

  - 각 독립적으로 작동하도록 작성된 비지니스 로직은 해당 class만으로도 각각 테스트 가능하다. ([링크](https://www.inflearn.com/questions/22656))

- 각각이 독립적으로 작동해야 클라이언트에게 응답을 보낸 후에도 해당 API함수가 실행되는 상황을 방지 할 수 있다.

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

## 02 Vue 인스턴스

# 2.1. Vue 인스턴스 란?

> Vue로 개발할 때 필수로 작성해야 하는 코드로 생성자 함수로 Vue 인스턴스를 생성한다.

```jsx
var vm = new Vue();
console.log(vm);
```

- 인스턴스에 정의된 속성과 메서드는 Vue에서 제공하는 기능들이다.
- 인스턴스를 여러개 생성할 수 도 있다.
- 인스턴스는 그려지는 화면의 시작점이 되는 tag를 ‘el’ 속성으로 지정해 줘야한다.

```jsx
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app">
        <!--이 안에서 인스턴스의 내용들이 적용된-->
    </div>

    <script src="<https://cdn.jsdelivr.net/npm/vue/dist/vue.js>"></script>
    <script>
        var vm = new Vue({
            el : '#app', //이 인스턴스의 기능들이 적용될 테그 선택
            data:{
                message : 'hi',
            }
        });

    </script>
</body>
</html>
```

# 2.2. 인스턴스의 속성들

```jsx
new Vue({
  el: ,
  template: ,
  data: ,
  methods: ,
  created: ,
  watch: ,
});
```

- el : Vue 기능을 활용한 화면이 그려지는 시작점
- **[template](https://joshua1988.github.io/vue-camp/vue/template.html)** : 화면에 표시할 요소 (HTML, CSS 등). 컴포넌트의 화면에 표시될 요소를 선언할 때 사용된다.
- data : 뷰의 반응성(Reactivity)이 반영된 데이터 속성
- **[methods](https://joshua1988.github.io/vue-camp/syntax/methods.html)** : 화면의 동작과 이벤트 로직을 제어하는 메서드.
- **[created](https://joshua1988.github.io/vue-camp/vue/life-cycle.html)** : 뷰의 라이프 사이클과 관련된 속성.
- **[watch](https://joshua1988.github.io/vue-camp/syntax/watch.html)** : data에서 정의한 속성이 변화했을 때 추가 동작을 수행할 수 있게 하는 속성.