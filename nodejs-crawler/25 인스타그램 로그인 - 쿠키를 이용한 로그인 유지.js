//8-2 userDataDir로 로그인 유지하기
//내 컴퓨터나 노트북에는 이미 여러 계정들이 로그인 되어 있는 경우가 많다.
//이를 이용하여 로그인 과정을 생략하는 방법을 강의에서 설명해준다.

//- 로그인 아이콘들로 로그인이 되어있음을 판단할 수 있다.
//- puppeteer는 모든 데이터들이 초기화 된 상태의 브라우저가 기본이다.
//- puppeteer도 쿠키와 같은 것들을 저장할 수 있다. -> userDataDir 활용
//  - puppeteer.launch에서 userDataDir 속성에 쿠키를 저장할 폴더를 지정해 주면된다.
//  - 우리가 사용하는 chrome은 아래의 폴더에 쿠키를 저장한다.
//      - [사용자이름]/AppData/Local/Google/Chrome/UserData/Default
//  - 우리는 위 폴더 위치에 puppeteer의 쿠키를 저장한다.
//  - 쿠키를 저장하기 전 처음에는 로그인을 해줘야 한다.

const puppeteer = require('puppeteer');
const dotenv = require('dotenv');

const db = require('./models');
dotenv.config(); 

const crawler = async ()=>{

    
    try{
        await db.sequelize.sync();
        //1. userDataDir에 폴더 경로 지정
        let browser = await puppeteer.launch({
            headless : false, 
            args:['--window-size=1920,1080', '--disable-notifications'],
            userDataDir : 'C:\Users\clnme\AppData\Local\Google\Chrome\User Data\Default',
        });
        let page = await browser.newPage();
        await page.setViewport({
            width : 1080,
            height : 1080
        });
        await page.goto('https://www.instagram.com/?hl=ko');

        if (await page.$('a[href="/zerohch0/"]')) {
            console.log('이미 로그인 되어 있습니다.');
        } else {
            //'facebook으로 로그인' 버튼을 클릭
            await page.waitForSelector('button.L3NKy');
            await page.click('button.L3NKy');
            //facebook 로그인 페이지로 리다이렉트되는 것을 기다린다.
            await page.waitForNavigation();
            //facebook에서 로그인
            await page.waitForSelector('#email');
            await page.type('#email', process.env.EMAIL);
            await page.type('#pass', process.env.PASSWORD);
            await page.waitForSelector('#loginbutton');
            await page.click('#loginbutton');
            //instagram 페이지로 리다이렉트되는 것을 기다린다.
            await page.waitForNavigation();
            console.log('로그인 완료');
        }

    
        await db.sequelize.close();
    }catch(e){
        console.error(e);
    }
};

crawler();