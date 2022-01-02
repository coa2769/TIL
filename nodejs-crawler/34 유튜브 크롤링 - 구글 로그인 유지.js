//9-4 구글 로그인 유지하기

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
            userDataDir : 'C:\Users\clnme\AppData\Local\Google\Chrome\User Data\Default',
        });
        let page = await browser.newPage();
        await page.setViewport({
            width : 1080,
            height : 1080
        });

        //1. 로그인이 되어 있는지 판별
        if (!await page.$('#avatar-btn')) {
            //페이지가 넘어갈 때 네트워크 요청이 더이상 없을 때 까지 기다린다.
            await page.goto('https://www.youtube.com/',{
                waitUntil : 'networkidle0' 
            });

            //로그인 버튼 누르기
            await page.waitForSelector('#buttons ytd-button-renderer:last-child a')
            await page.click('#buttons ytd-button-renderer:last-child a');
            await page.waitForNavigation({
                waitUntil: 'networkidle0',
            });

            //아이디 입력
            await page.waitForSelector('#identifierId');
            await page.type('#identifierId', process.env.EMAIL);
            await page.waitForSelector('#identifierNext');
            await page.click('#identifierNext');
            await page.waitForNavigation({
                waitUntil: 'networkidle2',
            });

            //비밀번호 입력
            await page.waitForSelector('input[aria-label="비밀번호 입력"]');
            await page.evaluate((password) => {
                document.querySelector('input[aria-label="비밀번호 입력"]').value = password;
            }, process.env.PASSWORD);
            await page.waitFor(3000);
            await page.waitForSelector('#passwordNext');
            await page.click('#passwordNext');
            await page.waitForNavigation({
                waitUntil: 'networkidle2',
            });
        }




        // await db.sequelize.close();
    }catch(e){
        console.error(e);
    }
};

crawler();