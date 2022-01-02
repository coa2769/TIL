//9-1 유튜브 크롤링 준비와 browserFetcher
//유튜브는 API를 제공해 준다. 그러므로 굳이 크롤링을 할 필요는 없다.
//다만 연습 삼아서 해보는 예제이다.

//- 유튜브는 웹 컴포넌트 기술을 이용한다. (이후 rect, vue 등을 대체할 기술로 받아들여지고 있다.)
//  - 웹 컴포넌트 크롤링은 까다롭다.
//  - 최신 기술이기 때문에 낮은 버전의 크로미엄에서는 제대로 출력되지 않을 수 있다.(puppeteer를 최신 버전으로 유지하자)
//  - 또는 크롬 버전을 변경해주는 방법이 있다.
//- check_availability.js는 구글에서 작성된 어떤 OS에 어떤 버전의 크로미엄이 호환되는지 알려주는 프로그램이다.
//  - 이를 이용하여 호환되는 프로그램을 찾자.

//아래 URL에서 크롬의 버전들을 모두 확인할 수 있다.
//https://commondatastorage.googleapis.com/chromium-browser-snapshots/index.html?prefix=Win/

const puppeteer = require('puppeteer');
const dotenv = require('dotenv');

// const db = require('./models');
dotenv.config(); 

const crawler = async ()=>{
    
    try{
        // await db.sequelize.sync();
        //1. 크롬의 브라우저 버전을 선택(유튜브라 잘 열린다면 굳이 다운로드 할 필요 없다.)
        const browserFetcher = puppeteer.createBrowserFetcher();
        const revisionInfo = await browserFetcher.download('639850');

        //2. executablePath에 사용할 버전의 크로미엄 정보를 넣어준다.
        let browser = await puppeteer.launch({
            headless : false, 
            executablePath : revisionInfo.executablePath,
            args:['--window-size=1920,1080', '--disable-notifications'],
            // userDataDir : 'C:\Users\clnme\AppData\Local\Google\Chrome\User Data\Default',
        });
        let page = await browser.newPage();
        await page.setViewport({
            width : 1080,
            height : 1080
        });
        await page.goto('https://www.youtube.com/');

        // await db.sequelize.close();
    }catch(e){
        console.error(e);
    }
};

crawler();