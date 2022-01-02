//10-1 페이지 네이션 크롤링 준비
//- 주소로 내가 원하는 페이지에 들어갈 수 있다면 주소를 통해 들어가자.(굳이 동작을 구현할 필요 없다)
//- 다음 페이지로 넘어갔을 때 네트워크 통신이 초기화되면 싱글 페이지 애플리케이션이 아니다.
//- 다음 페이지로 넘어갔을 때 네트워크 통신이 초기화되지 않는다면 싱글 페이지 애플리케이션으로 구현된 것이다.
const puppeteer = require('puppeteer');

const crawler = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      args: ['--window-size=1920,1080', '--disable-notifications', '--no-sandbox'],
    });

    //1. 주소를 이용하여 페이지를 넘어간다.
    //싱글페이지 애플리케이션이 아니기 때문에 가능하다.
    await Promise.all([1,2,3,4,5,6,7,8,9,10].map(async (v) => {
        const page = await browser.newPage();
        await page.setViewport({
          width: 1080,
          height: 1080,
        });
    
        const keyword = 'mouse';
        await page.goto(`https://www.amazon.com/s?k=${keyword}&page=${v}`, {
          waitUntil: 'networkidle0',
        });
    }));
    
  } catch (e) {
    console.error(e);
  }
};

crawler();