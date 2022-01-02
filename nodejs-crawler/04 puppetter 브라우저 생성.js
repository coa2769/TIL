//2-1, 2-2 puppetter 
//크롤링이 차단된 web server나 Rect, vue와 같은 서버사이드렌더링 기술을 사용하는 웹페이지를 크롤링 하기위해이용된다.
//많은 기능들이 있는 강력한 라이브러리이다.

const puppeteer = require('puppeteer');

const crawler = async ()=>{
    //headless : 모니터에 브라우저 출력 유무 선택
    //{ headless : process.env.NODE_ENV === 'production' } => 배포 환경에서는 브라우저를 출력하지 않는다.
    const browser = await puppeteer.launch({headless : false}); 
    const [page, page2, page3] = await Promise.all([
        await browser.newPage(), //크롬의 페이지 생성, 여러개 생성 가능하다.
        await browser.newPage(),
        await browser.newPage(),
    ]);

    await Promise.all([
        page.goto("https://zerocho.com"),
        page2.goto("https://naver.com"),
        page3.goto("https://google.com"),
    ]);

    await Promise.all([
        page.waitFor(3000),
        page2.waitFor(1000),
        page3.waitFor(2000),
    ]);


    await page.close();
    await page2.close();
    await page3.close();

    await browser.close();
};

crawler();