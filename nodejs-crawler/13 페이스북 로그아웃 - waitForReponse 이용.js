//5-5 waitForResponse
//page.waitFor 함수를 통해 특정 시간을 기다리는 것이 아니라 
//더 정확하게 내가 원하는 페이지가 열렸을 때 다음 동작을 실행하도록 하기위해 waitForResponse함수를 사용한다.

// - waitForRequest : 요청 대기
// - waitForResponse : 응답 대기

// @  puppeteer.launch의 args에 '--disable-notifications'를 배열에 추가하면 화면에 뜨는 경고 알람을 멈출 수 있다.

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
        
        //1. 이메일과 페스워드 입력
        await page.type('#email', process.env.EMAIL);
        await page.type('#pass', process.env.PASSWORD);
        //2. 로그인 버튼 클릭
        //로그인 버튼 tag의 id가 페이지에 들어갈 때 마다 바뀌므로 class로 해당 tag를 구분했다.
        //hover 없이 바로 click이 가능하다.
        await page.hover('._42ft._4jy0._6lth._4jy6._4jy1.selected._51sy');
        await page.waitFor(3000);
        await page.click('._42ft._4jy0._6lth._4jy6._4jy1.selected._51sy');
        //3. 응답 url에 login_attemp가 있는지 판별 
        await page.waitForResponse((response)=>{
            console.log(response, response.url());
            
            return response.url().includes('login_attempt');
        });
       
        //4. 왼쪽 상단 버튼을 눌러 user navigation을 연다.
        await page.click('#userNavigationLabel');
        //5. user navigation에 있는 로그아웃 버튼을 누른다.
        await page.waitForSelector('li.navSubmenu:last-child');
        await page.click('li.navSubmenu:last-child');
        
        await page.close();
        await browser.close();
    }catch(e){
        console.error(e);
    }
};

crawler();