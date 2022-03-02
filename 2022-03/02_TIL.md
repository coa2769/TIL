# 03월 02일

> Node에서 MySQL 사용하는 방법

# Node에서 Sequelize로 DB 사용

# 1. Sequelize 란?

- NodeJS에서 DB를 사용하기 위해 사용하는 패키지이다.
- ORM(Object-relational Mapping)으로 분류되는 도구
  - JS 객체와 데이터베이스의 릴레이션을 매핑해주는 도구를 말한다.
- MySQL, MariaDB, PostgreSQL, MSSQL 등 다른 데이터베이스도 같이 쓸 수 있다.

## 1.1. Sequeliz 설치

```bash
npm i sequelize sequelize-cli mysql2
```

- sequelize-cli은 시퀄라이즈 명령어를 실행하기 위한 패키지이다.

  - 프로젝트에서 DB와 관련된 폴더를 생성 & 초기화를 위해 명령어를 실행

    ```bash
    npx sequelize init
    ```

    - sequelize-cli를 전역 설치 없이 사용하려면 명령어 앞에 npx를 붙여줘야 한다.
    - config, model, migrations, seeders 폴더가 생성된다.
    - `model/index.js`의 코드를 아래의 내용으로 수정해준다.(기존 코드를 에러가 발생한다.)

    ```jsx
    const Sequelize = require('sequelize');
    
    const env = process.env.NODE_ENV || 'development';
    const config = require('../config/config.json')[env];
    const db = {};
    
    const sequelize = new Sequelize(config.database, config.username, config.password, config);
    db.sequelize = sequelize;
    
    module.exports = db;
    ```

- mysql2는 MySQL과 시퀄라이즈를 이어주는 드라이버이다.

# 2. express와 Sequlize 연동

- 연동하는 코드

  ```jsx
  const { sequelize } = require('./models');
  
  sequelize.sync({force : false})
  .then(()=>{
      console.log('데이터베이스 연결 성공');
  })
  .catch((err)=>{
      console.error(err);
  });
  ```

  - force : 서버 실행 시 마다 테이블을 재생성 여부를 나타내는 옵션.

- `config/config.json` 에 연동에 필요한 정보 채워넣는다.

  ```jsx
  {
    "development": {
      "username": "root",
      "password": null,
      "database": "database_development",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "test": {
      "username": "root",
      "password": null,
      "database": "database_test",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "production": {
      "username": "root",
      "password": null,
      "database": "database_production",
      "host": "127.0.0.1",
      "dialect": "mysql"
    }
  }
  ```

- DB에 있는 Table을 시퀄라이즈에서도 정의해야 한다.

  - model폴더에 각 테이블의 이름으로 된 파일을 만들과 table의 칼럼과 옵션에 대한 내용을 작성해 준다.
    - Sequelize.Model을 확장한 클래스를 선언한다.
    - super.init함수에 table에 대한 내용을 작성한다.

  ```jsx
  const Sequelize = require('sequelize');
  
  module.exports = class [table 명] extends Sequelize.Model{
      static init(sequelize){
          return super.init({
              [컬럼 명] : {
  								//해당 컬럼에 대한 옵션 작성
                  type : Sequelize.STRING(20), //DB에서의 타입(정수, 문자, 문자 열 등)
                  allowNull : false, //default로 Null인가?
                  unique : true, //중복 값을 넣을 수 없는가?
              },
  						[컬럼 명] : {
                  type : Sequelize.DATE,
                  allowNull : false,
                  defaultValue : Sequelize.NOW, //default 값 입려
              },
          },{
  						//table에 대한 옵션 작성
              sequelize,
              timestamps : false,
              underscored : false,
              modelName : 'User',
              tableName : 'users',
              paranoid : false,
              charset : 'utf8',
              collate : 'utf8_general_ci',
          });
      }
      static associations(db){}
  };
  ```

  - sequlize는 모델 이름은 단수형으로, 테이블 이름은 복수형으로 사용한다.

  - DB와 sequelize는 사용하는 Type과 table 옵션 명이 다르다.(아래의 URL 참고)

    [data type]

    [Sequelize](https://sequelize.org/v5/manual/data-types.html)

    [table option]

    [Sequelize](http://sequelize.org/master/class/src/model.js~Model.html#static-method-init)

------

### reference

[Sequelize](https://sequelize.org/v5/index.html)