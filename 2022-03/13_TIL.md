# 03월 13일

> node교과서 책 7장의 예제를 MariaDB + Express + Vue로 재구현 했을 때 공부한 내용 정리

---

# Node.js와 MariaDB 연동

> Docker로 MariaDB Container를 만들고 node.js에서 mariaDB를 사용하는 방법에 대해 설명한다.

# 1. MariaDB Container 생성 & 실행

## 1.1. MariaDB Container 생성

- MariaDB 공식문서에서 현재 안전된 버전을 확인하여 해당 버전의 image를 Docker Hub에서 가져온다.

  ```bash
  docker pull mariadb:10.7.3
  ```

  - 버전 중에 rc라는 단어가 붙는 데 정식 출시전 마지막 베타에 붙는 단어이다.

    [[오픈소스 버전\] Beta, RC, Nightly 이게 무슨말이야?](https://web-front-end.tistory.com/24)

- mariadb image를 빌드하여 container를 생성과 동시에 실행한다.

  ```bash
  docker run --detach --name some-mariadb --env MARIADB_ROOT_PASSWORD=qwe123 --p 3306:3306 mariadb:10.7.3
  
  docker run --detach --name [생성할 container 이름] --env MARIADB_ROOT_PASSWORD=[root 비밀번호] --p 3306:3306 [image 이름]
  ```

## 1.2. 그외의 자주 사용되는 명령어들

- Container 명령어

  - container 실행 명령어

    ```bash
    docker start [container 이름]
    ```

  - Container에 쉘 접속

    ```bash
    docker exec -it [container 이름] bash
    ```

  - container 에서 mariadb 접속 (mariadb는 mysql과 명령어가 같다.)

    ```bash
    mariadb -h localnost -u root -p
    
    mariadb -h [접속 ip] -u [user name] -p
    ```

  - mariaDB에서 table 출력

    ```bash
    DESC [테이블 명];
    ```

  - 현재 사용할 DB 선택

    ```bash
    USE [DB 이름];
    ```

  - 현재 DB에 있는 Table들

    ```bash
    SHOW TABLES;
    ```

# 2. mariadb 모듈로 DB에 연결 & query 전송

## 2.1. mariadb 모듈 설치

```bash
npm i mariadb
```

## 2.2. DB에 연결

- `.env`파일을 생성하여 DB 접속에 필요한 정보를 작성한다.

  ```jsx
  DB_HOST=localhost
  DB_USER=root
  DB_PASS=qwe123
  DB_DATABASE=nodejs
  PORT=3000
  ```

- createPool함수로 연결에 필요한 객체를 생성한다.

  ```jsx
  import mariadb from 'mariadb';
  
  import dotenv from 'dotenv';
  dotenv.config();
  
  const pool = mariadb.createPool({
      host : process.env.DB_HOST,
      port : 3306,
      user : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB_DATABASE,
      connectionLimit : 5,
  });
  ```

- pool.getConnection()함수로 DB로 연결한다.

  ```jsx
  let conn = await pool.getConnection();
  ```

  - mariadb에 접속할 때 주의할 점
    - 해당 user가 접근하려는 DB에 권한이 있는지 확인해야한다.
    - 해당 user로 다른 client또는 termical에서 접속하고 있는지 확인해야한다.(중복 접속 안됨)

## 2.3. DB에 query 전송

```jsx
const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
```

------

### reference

[Mariadb - Official Image | Docker Hub](https://hub.docker.com/_/mariadb)

docker image에서 tag란?

[37. [Docker\] Docker image에서 Tag가 의미하는 것](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=alice_k106&logNo=220462660147)

npm mariadb

[mariadb](https://www.npmjs.com/package/mariadb)

MariaDB에서 사용자 생성 & 삭제& 권한 부여 & 권한 제거

---

# Express와 Vue.js 연동

## 1. vue 프로젝트 폴더에 vue.config.js파일 생성

backend 프로젝트 폴드에 빌드된 vue 파일들이 넣어지도록 하는 내용을 작성.

```jsx
var path = require("path");

module.exports = {
    outputDir : path.resolve("../node_mariadb_ex/public"),
    devServer : {
        proxy : {
            'api' : {
                target : '<http://localhost:3000/api>',
                changeOrigin : true,
                pathRewrite : {
                    "^api" : ''
                }
            }
        }
    }
};
```

- vue.config.js를 만드는 대신 dist에 생성한 파일들을 backend 프로젝트 폴더에 직접 넣어도 된다.
- devServer는 굳이 필요하지 않는 듯 하다.(그럼 무슨 뜻이지?)

## 2. express.static 미들웨어를 이용하여 화면 배포

```jsx
import express from "express";

//static 모듈 사용
app.use(express.static('public'));
```

---

# Node.js 버전 관리하는 NVM 모듈 사용법

> windows10에서 nvm.exe로 직접 설치하면 에러가 난다. 이를 해결 하기 위해 scoop를 통해 설치 해야한다. (나의 경우 error 5가 났었다.)

# 1. Windows10에서 NVM 설치

1. powershell을 관리자 권한으로 연다.

2. Scoop 설치

   ```bash
   > Set-ExecutionPolicy RemoteSigned -scope CurrentUser 
   > $env:SCOOP = 'C:\\Scoop'
   > iex (new-object net.webclient).downloadstring('<https://get.scoop.sh>')
   ```

3. Scoop으로 nvm 설치

```bash
> scoop install nvm
```

# 2. nvm 사용 방법

아래 명령어를 실행할 때 PowerShell을 관리자 권한으로 열어야 한다.

## 2.1. node 설치

```bash
//최신 버전 설치
> nvm install latest

//안정화 버전 설치
> nvm install lts

//특정 버전 설치
> nvm install 16.13.1
```

## 2.2. 자주 사용되는 명령어

- 현재 설치된 node.js 버전 목록

  ```bash
  > nvm ls
  ```

- 사용할 node.js 버전 선택

  ```bash
  > nvm use 16.13.1
  ```

- 현재 사용하는 node.js 확인

  ```bash
  node --version
  ```

## 2.3. 자주나는 에러

- exit status 1 오류가 발생 했다면 관리자 권한으로 PowerShell을 실행하면 해결 가능하다.

---

# Node.js에서 import 사용하는 방법

> ES6(ECMA2015) 이후 부터는 JS에서는 `import` / `export` 방식으로 모듈을 지원했다. 하지만 Node.js는 CommonJs 방식을 채택했기 때문에 JS의 기본 모듈 방식을 사용할 수 없다. 굳이 사용해야 한다면 아래의 두가지 방법이 있다.

- Babel을 이용하여 ES6 이전 문법으로 변환하는 과정  추가
- Node.js 13 버전 이상 이용

## Node.js 13 버전 이상 에서 import를 사용하는 방법

- package.json에서 type 속성을 추가

  ```bash
  {
    "name": "node_mariadb_ex",
    "version": "0.0.1",
    "description": "node와 mariadb를 연동하는 예제",
    "main": "app.js",
    "type": "module",
  	...
  }
  ```

### 이때 생길 수 있는 문제

- __dirname을 바로 사용할 수 없어 ****`__dirname is not defined`에러가 난다. 아래 처럼 사용해야 한다.

  ```jsx
  import path from 'path';
  const __firname = path.resolve();
  ```

