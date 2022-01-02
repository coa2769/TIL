// 5-2 dotenv로 비밀번호 관리하기
// 5-1의 첫번째 문제를 해결하는 방법이다.

// dotenv 패키지는 외부 환경변수 파일(.env)에 작성한 내용을 node.js에서 환경변수로 사용할 때 쓰인다.
// https://hudi.kr/node-js-dotenv-%ED%99%98%EA%B2%BD-%EB%B3%80%EC%88%98-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0/
// https://www.npmjs.com/package/dotenv

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
        const id = process.env.EMAIL;
        const password = process.env.PASSWORD;
        //evaluate내부는 JS 스코프를 따르지 않아서 인자로 넘겨야 한다.
        await page.evaluate((id, password)=>{
            document.querySelector('#email').value = id;
            document.querySelector('#pass').value = password;
            document.querySelector('#loginbutton').click();
        }, id, password);
        await page.close();
        await browser.close();
    }catch(e){
        console.error(e);
    }
};

crawler();