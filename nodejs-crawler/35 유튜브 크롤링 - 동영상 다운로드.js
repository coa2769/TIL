//9-5 구글 로그인 유지하기
//ytdl-core : 유튜브를 다운로드 해주는 패키지 이다.
//https://www.npmjs.com/package/ytdl-core

//@ node의 createWriteStream에 대해 알아보자
//  - stream으로 파일 쓰기를 하면 주기적으로 몇 m씩 다운로드 되면 주기 중간 마다 다른 일을 처리 할 수 있다.
//  - 대용량 데이터를 처리할 때 중요하다.

const puppeteer = require('puppeteer');
const dotenv = require('dotenv');
const fs = require('fs');
const ytdl = require('ytdl-core');

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

        //로그인이 되어 있는지 판별
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

        //1. 인기 동영상으로 이동
        await page.goto('https://www.youtube.com/feed/trending');
        //2. 맨 위의 인기 동영상으로 이동
        await page.waitForSelector('ytd-video-renderer');  
        await page.click('ytd-video-renderer');

        //3. 현재 주소가져오기
        const url = await page.url();

        //4. url로 해당 동영상의 정보 알아오기
        const info = await ytdl.getInfo(url);
        //5. 동영상 다운로드 하여 저장하기
        //- '\'가 파일 이름에 들어가면 안되므로 정규표현식으로 제거한다.
        ytdl(url).pipe(fs.createWriteStream(`${info.title.replace(/\u20A9/g, '')}.mp4`));
    
        // await db.sequelize.close();
    }catch(e){
        console.error(e);
    }
};

crawler();

//9-6 보너스 Q&A
// - node에서 데이터를 처리하는 라이브러리들은 웬만해서는 stream을 이용한다.
// - node-scheldule는 잘 사용되지 않는다.
// -구글의 클라우드 펑션? 람다 스케줄러? 이런데서 크롤러를 돌리는 것을 추천한다고 한다.
