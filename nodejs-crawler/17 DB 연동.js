//6-3 데이터베이스 연동하기
//해당 강의에서는 사용할 수 있는 무료 프록시 목록을 데이터베이스에 저장하기위해 쓰인다.
//1. sequlize, sequelize-cli 모듈 설치
// - node.js에서 DB를 연동하기 위해 사용하는 모듈이다. (많이 사용된다.)
// - sequelize-cli는 global로 설치되어야 한다. (npm i -g sequelize-cli)
//2. MySQL에서 table을 생성한다. (create new schema... 메뉴 선택)
//3. 프로젝트 폴더에서 sequeilze init 명령어를 실행한다.
// - config, migrations, models, seeders 폴더가 프로젝트에 생성된다.
//4. config/config.json의 모든 database과 password를 수정한다.
/*
    "password": 12345,
    "database": "node-crawler",
*/
//5. models/index.js 파일 내용을 간단하게 변경한다.
// - 해당 파일이 DB를 연결하는 부분이다.
//6. models/proxy.js 파일을 생성하여 table을 만드는 코드를 작성한다.

//!! 해당 예제를 실행할 때 config에 비밀번호를 입력해야 한다.

const puppeteer = require('puppeteer');
const dotenv = require('dotenv');

const db = require('./models');
dotenv.config(); 

const crawler = async ()=>{

    //7. DB 연결
    await db.sequelize.sync();

    try{


    }catch(e){
        console.error(e);
    }
};

crawler();