//5-3 5-4 type, hover. click, keyboard / 페이스북 로그아웃
//evaluate 이외의 puppeteer에서 지원해주는 함수들
// - type : 매개변수를 선택자를 입력하면 해당 tag에 키보드 입력을 한다.
// - hover : 매개변수를 선택자를 입력하면 해당 tag에 마우스를 올려놓는다.
// - click : 매개변수를 선택자를 입력하면 해당 tag에 마우스 클릭을 한다.
//           해당 함수가 잘 적용되지 않는다면 evaluate함수에서 tag의 click이벤트를 처리하면 된다.
// - keyboard.press : 매개변수에 입력한 키를 누른다.
//아래 URL은 puppeteer에서 지원하는 키보드 키의 이름이다.
//https://github.com/puppeteer/puppeteer/blob/v1.12.2/lib/USKeyboardLayout.js

//사람이 해당 페이지에서 어떻게 행동하는지 생각하며 크롤러를 구현하면된다.

const puppeteer = require('puppeteer');
const dotenv = require('dotenv');
dotenv.config(); //.env파일에 작성한 환경변수를 불러와 process.env 에 구성한다.

const crawler = async ()=>{
    try{
        const browser = await puppeteer.launch({headless : false, args:['--window-size=1920,1080']});
        const page = await browser.newPage();
        await page.setViewport({
            width : 1080,
            height : 1080
        });
        await page.goto('https://facebook.com');
        
        //1. 이메일과 페스워드 입력
        await page.type('#email', process.env.EMAIL);
        await page.type('#pass', process.env.PASSWORD);
        //2. 로그인 버튼 클릭
        //로그인 버튼 tag의 id가 페이지에 들어갈 때 마다 바뀌므로 class로 해당 tag를 구분했다.
        //hover 없이 바로 click이 가능하다.
        await page.hover('._42ft._4jy0._6lth._4jy6._4jy1.selected._51sy');
        await page.waitFor(3000);
        await page.click('._42ft._4jy0._6lth._4jy6._4jy1.selected._51sy');
        await page.waitFor(1000);
        //3. ESC 키를 눌러 권한요구 요청 창을 닫는다.
        await page.keyboard.press('Escape');
        //4. 왼쪽 상단 버튼을 눌러 user navigation을 연다.
        await page.click('#userNavigationLabel');
        //5. user navigation에 있는 로그아웃 버튼을 누른다.
        await page.waitForSelector('li.navSubmenu:last-child');
        await page.click('li.navSubmenu:last-child');
        
        // await page.close();
        // await browser.close();
    }catch(e){
        console.error(e);
    }
};

crawler();