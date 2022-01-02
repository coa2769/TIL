//5-7 focus와 대문자 입력하기
//page.focus : input 또는 button 에 포커스를 주는 함수. 하지만 해당 함수가 적용되지 않는 페이지도 있다.

//page.keyboard.down : 매개변수로 입력된 키를 키보드에서 누르고 있는 상태로 변경한다.
//page.keyboard.press : 매개변수로 입력된 키를 키보드에서 한번 누른다.
//page.keyboard.up : 매개변수로 입력된 키가 down함수로 누르고 있는 상태라면 해제한다.


const puppeteer = require('puppeteer');
const dotenv = require('dotenv');
dotenv.config(); //.env파일에 작성한 환경변수를 불러와 process.env 에 구성한다.

const crawler = async ()=>{
    try{
        const browser = await puppeteer.launch({headless : false, args:['--window-size=1920,1080', '--disable-notifications']});
        const page = await browser.newPage();
        await page.setViewport({
            width : 1080,
            height : 1080
        });
        await page.goto('https://facebook.com');

        await page.focus('#email');
        //대문자 입력 방법
        await page.click('#email');
        await page.keyboard.down('ShiftLeft');
        await page.keyboard.press('KeyZ');
        await page.waitFor(1000);
        await page.keyboard.press('KeyE');
        await page.waitFor(1000);
        await page.keyboard.press('KeyR');
        await page.waitFor(1000);
        await page.keyboard.press('KeyO');
        await page.waitFor(1000);
        await page.keyboard.press('KeyC');
        await page.waitFor(1000);
        await page.keyboard.press('KeyH');
        await page.waitFor(1000);
        await page.keyboard.press('KeyO');
        await page.waitFor(1000);
        await page.keyboard.up('ShiftLeft');
        
    }catch(e){
        console.error(e);
    }
};

crawler();