//8-1 waitForNavigation
//waitForNavigation : 페이지가 바뀌는 것을 기다린다. (리다이렉트 될때 사용됨.)

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
        await page.goto('https://www.instagram.com/?hl=ko');
        //1. 'facebook으로 로그인' 버튼을 클릭
        await page.waitForSelector('button.L3NKy');
        await page.click('button.L3NKy');
        //2. facebook 로그인 페이지로 리다이렉트되는 것을 기다린다.
        await page.waitForNavigation();
        //3. facebook에서 로그인
        await page.waitForSelector('#email');
        await page.type('#email', process.env.EMAIL);
        await page.type('#pass', process.env.PASSWORD);
        await page.waitForSelector('#loginbutton');
        await page.click('#loginbutton');
        //4. instagram 페이지로 리다이렉트되는 것을 기다린다.
        await page.waitForNavigation();

    
        await db.sequelize.close();
    }catch(e){
        console.error(e);
    }
};

crawler();