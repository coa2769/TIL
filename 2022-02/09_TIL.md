# 02월 08일

> '견고한 node.js 프로젝트 아키텍쳐 설계하기' 를 읽고 요약 &  좀더 알아본 내용에 대해 정리

# node.js 프로젝트 설계하기

# 1. 요약

- 3 계층 구조를 사용하십시오. (3 layer architecture)
- 비지니스 로직을 express.js의 controller에 넣지 마십시오.
- 백그라운드 작업을 할 때는 PubSub 패턴을 사용하고 이벤트를 발생 시키십시오.
- 마음의 평화를 위해 의존성 주입을 사용하십시오.
- 비밀번호, secrets와 API key들을 절대 누출하지 말고 configuration manager를 사용하십시오.
- node.js 서버 설정파일을 작은 모듈들로 분리하여 독립적으로 로드할 수 있게 하십시오.

아래의 URL의 내용에 추가 설명을 붙여 작성하였다.

[견고한 node.js 프로젝트 설계하기](https://velog.io/@hopsprings2/견고한-node.js-프로젝트-아키텍쳐-설계하기)

# 2. 폴더 구조

```html
src
│   app.js          # 앱 시작 점
└───api             # 앱의 모든 엔드 포인트에 대한 express 라우터
└───config          # 환경 변수와 그 외의 것들에 관련된 환경 설정
└───jobs            # agenda.js 파일에 대한 작업 정의(agenda 의제, 예정, 일정, 스케줄링 작업과 연관이 있다.)
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

- 관심사 분리(principle of separation of concerns) 원칙이 적용되었다.
- 각 Layer가 독립적이므로 확장성이 용이하다.
- 유닛 테스트 코드를 작성하기 쉬워진다.
  - 각 독립적으로 작동하도록 작성된 비지니스 로직은 해당 class만으로도 각각 테스트 가능하다. ([링크](https://www.inflearn.com/questions/22656))

# 4. Pub-Sub(Publisher/Subscriber) 패턴

> publisher와 subscriber 중간에 **이벤트 관리자(or MessageBroker)**를 두는 디자인 패턴. 해당 구조는 3계층 구조 범위 밖이지만 계층 간 데이터 또는 이벤트 전달을 할 때 사용된다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/954a3e8d-91d6-4e2e-9422-23552ea06d3e/Untitled.png)

## 4.1. 특징

- 이벤트 관리자(or MessageBroker)가 queue 역활을 한다.
- publisher와 subscriber간의 직접적인 관계가 없으므로 코드 관리, 재사용성, 안정성이 높아진다.
  - Subscriber가 수정되어도 publisher를 수정할 필요 없다.
  - 서로의 상태를 몰라도 된다.
- 주로 비동기적으로 작동하므로 시스템의 자원 낭비를 줄일 수 있다.
  - 작업이 백그라운드에서 이루어진다.
- cross-appblication(교차 플랫폼)에 사용하기 적합하다.

## 4.2. 해당 패턴을 사용 하는 이유

- 각 계층 간 또는 다른 서비스 간에 직접적인 관계를 없애기 위해 사용된다.

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
  ```

  ```jsx
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
  ```

  ```jsx
  eventEmitter.on('user_signup', async ({ user, company }) => {
    const salaryRecord = await SalaryModel.create(user, company);
  })
  ```

  ```jsx
  eventEmitter.on('user_signup', async ({ user, company }) => {
    await EmailService.startSignupSequence(user)
  })
  ```

- API함수의 응답이 전달된 후에도 실행되어야 할 작업이 백그라운드에서 이루어지도록 하기 위해 사용된다.

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

# 5. 의존성 주입(Dependency Injection)

> 의존 대상을 외부에서 생성하여 대입하는 디자인 패턴이다. IoC(Inverse of Control)  장식 중 가장 대표적인 방식이다.

## 5.1. IoC(**Inverse of Control) 란?**

제어권을 제3자 (프레임워크)가 가지게 하여 대상 간의 의존성을 제거하여 느슨하게 결합되도록 하기 위해 사용된다.

대표적인 방식으로 DI와 [Service Locator](https://ahea.wordpress.com/2018/09/09/1754/)가 있다. (TypeScript에서는 typeedi 패키지로 이를 해결한다.)

## 5.2. 사용하는 이유

의존 관계에서 의존 대상에 변화가 생겼을 때 이를 의존하던 다른 대상들도 코드를 수정해야 하는 문제점이 생긴다.

```jsx
import UserModel from '../models/user';
import CompanyModel from '../models/company';
import SalaryModel from '../models/salary';  

class UserService {
  constructor(){}
  Sigup(){
    // UserMode, CompanyModel, SalaryModel를 여기서 호출한다.
    ...
  }
}
class Coffee {...} // interface로 설계할 수도 있다

// Coffee 클래스를 상속
class Cappuccino extends Coffee {...}
class Americano extends Coffee {...}

// Programmer.java
class Programmer {
    private Coffee coffee;

    public Programmer() {
    	this.coffee = new Cappuccino(); // 직접 수정
        // 또는 
        this.coffee = new Americano(); // 직접 수정
    }
    
    ...
}
```

이를 해결하기 위해 사용하기 위해 런타임 시점에서 의존 대상을 외부에서 생성하여 생성자나 함수를 통해 전달한다.

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
// Programmer.java
class Programmer {
    private Coffee coffee;

    // 그 날 마실 커피를 고를 수 있게된 개발자
    public Programmer(Coffee coffee) {
    	this.coffee = coffee;
    }
    
    public startProgramming() {
    	this.coffee.drink();
        ...
    }
}
```

이런 의존성을 해결하는 방법 준 Service Locator 패턴이 있는 데 해당 패턴는 코드를 읽기 어렵다고 한다.

Node.js 프로젝트에서도 서비스가 가질 수 있는 종속성은 무한하기 종속되는 인스턴스를 추가할 때 마다 리팩토링해야 하거나 에러가 발생하는 문제를 해결하기 위해 의존성 주입(Dependency Injection) 패턴을 활용한다.

## 5.3. 특징

- 유닛 테스트 작성이 용이해진다.
- 코드의 재사용성이 높아진다.
- 의존성을 줄여준다.
- 결합도가 낮아져 유연한 코드를 작성할 수 있다.

# 6. 스케줄링(Cron Jobs) 및 반복 작업(Recurring Task)

## 6.1 여기서 말하는 스케줄링(Cron Jobs) 이란?

> 지정된 시간마다 특정 작업이 반복 실행되도록 하는 것을 말한다. ex) 이메일 알림, 파일 다운로드, 데이터베이스 백업 등

이런 스케줄링을 setTimeout이나 setIntveral같은 원시적인 방법으로 구현하는 것은 좋지 않다.

이 보다는 스케줄러 프레임워크를 사용하여야 실패한 작업에 대한 제어와 피드백을 받을 수 있다.

비지니스 로직이 service layer에 캡술화 되어 있기 때문에 스케줄링을 부여하기 쉽다.

## 6.2. 종류

- nix(Linux, MacOS)시스템에는 기본 탑재된 **Cron Scheduler**
- **node-cron** (npm으로 설치 가능)
- **node-scheduler** (npm으로 설치 가능, [실제 예제](https://ichi.pro/ko/node-jsleul-sayonghan-jag-eob-seukejulling-35888015509206))
- Agenda (Node.js용 경량 작업 스케줄링 라이브러리)
  - DB를 활용하여 작업을 실행하고 관리자 대시보드를 지원한다.

# 7. 설정 및 시크릿 파일(Configurations and secrets)

> 외부에 알려서는 안되는 key나 특정 설정을 별도 파일에 저장하여 `dotenv`과 같은 모듈을 사용하여 불러들이는 방법을 권장한다.

## 7.1. 적용 하는 방법

1. `.env` 파일 생성 (단 해당 파일을 커밋해서는 안된다.)

2. npm 으로 dotenv를 설치하여 `.env`파일을 로드하면 process.env 객체에 해당 값들이 대입된다.

3. `config/index.ts` 파일에서 process.env값을 객체에 다시 저장한다. (코드 구조화 과정)

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

# 8. Loaders

> 이 패턴은 node.js 서비스의 프로그램을 시작하는 데 필요한 패키지들을 테스트가 가능한 모듈로 나눈다. W3Tech microframework에서 참고한 것이지만 해당 패키지를 사용하지는 않는다.

## 8.1. 저용한 예제

mongoose, express,

**[ 적용 전 ]**

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

**[ 적용 후 ]**

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