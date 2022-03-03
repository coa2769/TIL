# 03월 03일

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

# 2. Sequlize와 DB 연동

## 2.1. sequlize와 db 연결

- `config/config.json`에 DB와 통신하는데 필요한 정보를 채워넣는다.

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

- 프로젝트 entrypoint 파일에서 sync함수를 호출하여 DB와 연결

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

## 2.2. Table을 Sequlize의 Model로 정의

model폴더에 각 테이블의 이름으로 된 파일을 만들과 table의 칼럼과 옵션에 대한 내용을 작성해 준다.

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

- Sequelize.Model을 확장한 클래스를 선언한다.

- sequlize는 모델 이름은 대문자 단수형으로, 테이블 이름은 소문자 복수형으로 지은다.

- super.init함수에 table 컬럼과 table 옵션에 대해 작성한다.

- DB와 sequelize는 사용하는 Type과 table 옵션 명이 다르다.(아래의 URL 참고)

  [data type]

  [Sequelize](https://sequelize.org/v5/manual/data-types.html)

  [table option]

  [Sequelize](http://sequelize.org/master/class/src/model.js~Model.html#static-method-init)

- 자주 사용되는 super.init함수의 table 옵션

  - sequelize : db.sequelize 객체가 넣어진다.
  - timestamps : sequelize에서 createAt과 updateAt컬럼을 추가 할 것인지 여부를 묻는 옵션이다. 각각 row가 생성또는 수정될 때 자동으로 업데이트 된다.
  - underscored : table 명과 colum명을 snake case(ex:create_at)로 바꾸는 옵션이다.
  - modelName : 모델 이름을 설정.
  - tableName : 실제 DB의 table이름.
  - paranoid : colum에 deleteAt가 생성된다. row를 삭제할 때 완전히 지워지지 않고 deleteAt값이 업데이트 된다.
    - row를 복원할 일이 있을 것 같을 때 사용된다.
  - charset과 collate : utf8과 utf8_general_ci로 설정해야 한글이 입력된다. 이모티콘까지 입력하길 원한다면 utf8mb4와 utf8mb4_general_ci로 설정한다.

- `model/index.js` 에서 model을 초기화 한다.

  ```jsx
  const Sequelize = require('sequelize');
  const User = require('./user');
  const Comment = require('./comment')
  
  const env = process.env.NODE_ENV || 'development';
  const config = require('../config/config.json')[env];
  const db = {};
  
  const sequelize = new Sequelize(config.database, config.username, config.password, config);
  db.sequelize = sequelize;
  
  //db에 model을 대입
  db.User = User;
  db.Comment = Comment;
  //model 초기화
  User.init(sequelize);
  Comment.init(sequelize);
  //model에 db 입력
  User.associate(db);
  Comment.associate(db);
  
  module.exports = db;
  ```

## 2.3. Model간 관계 정의

Sequelize는 Table의 1:N, 1:1, N:M 관계를 정의하기 위해 static associate(db) 함수에서 정의한다.

ex) Comment Table에는 작성한 사람을 식별하기 위해 commenter라는 Colum을 가지고 이는 users Table의 식별 정보 값을 가져온다. (Foreign Key)

```jsx
const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model{
    static init(sequelize){
        return super.init(...);
    }
    
    static associate(db){
        db.Comment.belongsTo(db, User, {foreignKey:'commenter', targetKey : 'id'});
    }
};
```

### 2.3.1. 1:N 관계

- hasMany : 다른 모델에 자신의 식별값이 들어가는 table에서 해당 함수를 호출한다.

  - ex) users table의 row 하나를 불러 올 때 연결된 comments table의 row들이 같이 불러 올 수 있다.

  ```jsx
  module.exports = class User extends Sequelize.Model{
  		...
      static associations(db){
          db.User.hasMany(db.Comment, { foreignKey : 'commenter', sourceKey : 'id'});
      }
  };
  ```

- belongsTo : 다른 모델의 정보가 들어가는 table에서 해당 함수를 호출한다.

  - ex) 해당 Comment를 누가 작성 했는지 commter Colume을 ForeignKey로 설정하여 Users table과 연결했다.

  ```jsx
  module.exports = class Comment extends Sequelize.Model{
  		...
      static associate(db){
          db.Comment.belongsTo(db.User, { foreignKey : 'commenter', targetKey : 'id'});
      }
  };
  ```

------

### reference