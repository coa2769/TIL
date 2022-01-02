// 5-1 페이스북 로그인 태그 분석
// rechapter <- 사람인지 판단하는 서비스. 해당 서비스를 피하는 방법 강의에서 따로 다루지 않는다.
// 2021.11.30 현재는 화면의 html이 바껴서 사용할 수 없는 구조이다.
// 다만 해당 예제는 여태까지 배운 tag를 분석하는 방법으로 로그인 하는 방법임을 알아두자.

// 해당 방법은 문제가 두가지 있다. 
// 첫번째 문제) 메일과 비밀번호가 코드에 하드 코딩되어 있다.
// 두번째 문제) html 구조가 변경되면 코드를 전면 수정해야 한다.

const puppeteer = require('puppeteer');

const crawler = async ()=>{
    try{
        const browser = await puppeteer.launch({headless : false, args:['--window-size=1920,1080']});
        const page = await browser.newPage();
        await page.setViewport({
            width : 1080,
            height : 1080
        });
        await page.goto('https://facebook.com');
        await page.evaluate(()=>{
            document.querySelector('#email').value = 'zerohch0@gmail.com';
            document.querySelector('#pass').value = '12345678';
            document.querySelector('#loginbutton').click();
        })
        await page.close();
        await browser.close();
    }catch(e){
        console.error(e);
    }
};

crawler();