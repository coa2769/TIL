//7-6 보너스 페이스북 게시글 작성하기

const puppeteer = require('puppeteer');
const dotenv = require('dotenv');

const db = require('./models');
dotenv.config(); 

const crawler = async ()=>{

    
    try{
        await db.sequelize.sync();
        let browser = await puppeteer.launch({headless : false, args:['--window-size=1920,1080', '--disable-notifications']});
        let page = await browser.newPage();
        await page.setViewport({
            width : 1080,
            height : 1080
        });
        await page.goto('https://facebook.com');
        //페이스 북 로그인
        await page.type('#email', process.env.EMAIL);
        await page.type('#pass', process.env.PASSWORD);
        await page.click('._42ft._4jy0._6lth._4jy6._4jy1.selected._51sy');
        await page.waitForResponse((response)=>{            
            return response.url().includes('login_attempt');
        });
        await page.keyboard.press('Escape');
        
        //1. 포스트 작성하는 곳 클릭
        await page.waitForSelector('textarea');
        //1.1. textarea를 클릭
        await page.click('textarea');
        //1.2. 숨겨 있던 또 다른 tag 클릭 (이후에 글 작성이 가능하도록 되어 있다.)
        await page.waitForSelector('._5rpb > div');
        await page.click('._5rpb > div');

        //2. 글 작성
        await page.keyboard.type('인간지능 제로초봇 동작중...');

        //3. '공유하기' 버튼 클릭
        await page.waitForSelector('._6c0o button');
        await page.waitFor(5000);
        await page.click('._6c0o button');
    
        await db.sequelize.close();
    }catch(e){
        console.error(e);
    }
};

crawler();