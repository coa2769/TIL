# 02월 05일

> '견고한 node.js 프로젝트 아키텍쳐 설계하기' 를 읽고 요약 &  좀더 알아본 내용에 대해 정리

## node.js 프로젝트 설계하기

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

![3계층 설계](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e7fb77b2-9bd3-4f4c-b614-7ef2e8a5b902/Untitled.png)

3계층 설계

![실제 프로젝트 구성할 때 express와 DB를 사용한다.](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7018885f-e256-4895-b9fe-cbf54965e38c/Untitled.png)

실제 프로젝트 구성할 때 express와 DB를 사용한다.

API Router(Controller)과 비지니스 로직은 꼭 분리해야 한다.

**[ 그 이유]**

- principle of separation of concerns 규칙을 적용하기 위해(이 규칙은 뭐지?)
- 커맨드 라인 도구(CLI)로 비지니스 로직을 테스트 해야 하기 위해(API 호출로 테스트하면 안되는 이유는?)
- 스파게티 코드가 된다.
- 유닛 테스트를 작성이 까다로워 진다.(정확한 예시 필요)
- 비지니스 로직들은 분명한 목적이 있는 코드 이기 때문에 SOLID원칙을 적용 해야 한다.

**[ Controller ]**

- req와 res 객체를 이용할 수 있다. 다른 계층에서는 이용할 수 없다.
- HTTP전송에 관련된 계층이다.

**[ Service Layer ]**

- 비지니스 로직들이 작성된다.
- 분명한 목적이 있는 class들의 집합이다.
- SOLID 원칙이 적용 된다.

**[ data access layer ]**

- ‘SQL query’ 형태의 코드가 작성되는 곳

## API Router와 비지니스 로직 분리 예제

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

  

