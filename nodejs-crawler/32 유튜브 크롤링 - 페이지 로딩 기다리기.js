//9-2 waitUntil로 로딩 기다리기
//** 페이지가 로딩될 때 어느 시점까지 기다리고 다음 작업을 넘어가는지 지정할 때 waitUntil을 이용한다.
//  - load(기본) : html만 로드되었을 때
//  - domcontentloaded : html, css, js 모두 로드 되었을 때
//  - networkidle0 : 더이상 네트워크 통신이 없을 때(유튜브 같은 스트리밍 서비스에서는 사용하면 안된다.)
//  - newtworkidle2 : 2개 정도의 요청이 남았을 때
//** page.goto나 page.waitForNavigation 등에서 사용된다.

const puppeteer = require('puppeteer');
const dotenv = require('dotenv');

// const db = require('./models');
dotenv.config(); 

const crawler = async ()=>{
    
    try{
        // await db.sequelize.sync();
        //크롬의 브라우저 버전을 선택(유튜브라 잘 열린다면 굳이 다운로드 할 필요 없다.)
        // const browserFetcher = puppeteer.createBrowserFetcher();
        // const revisionInfo = await browserFetcher.download('639850');

        //executablePath에 사용할 버전의 크로미엄 정보를 넣어준다.
        let browser = await puppeteer.launch({
            headless : false, 
            // executablePath : revisionInfo.executablePath,
            args:['--window-size=1920,1080', '--disable-notifications'],
            // userDataDir : 'C:\Users\clnme\AppData\Local\Google\Chrome\User Data\Default',
        });
        let page = await browser.newPage();
        await page.setViewport({
            width : 1080,
            height : 1080
        });

        //1. 페이지가 넘어갈 때 네트워크 요청이 더이상 없을 때 까지 기다린다.
        await page.goto('https://www.youtube.com/',{
            waitUntil : 'networkidle0' 
        });

        //2. 로그인 버튼 누르기
        await page.waitForSelector('#buttons ytd-button-renderer:last-child a')
        await page.click('#buttons ytd-button-renderer:last-child a');
        await page.waitForNavigation({
            waitUntil: 'networkidle0',
        });

        // await db.sequelize.close();
    }catch(e){
        console.error(e);
    }
};

crawler();