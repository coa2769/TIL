//10-6 트위터 태그 분석하기
//frame, iframe은 다른 웹사이트의 컨텐츠를 보여주는 테그 이므로 보통의 테그들과 정보를 가져오는 방법이 다르다.

const puppeteer = require('puppeteer');
const dotenv = require('dotenv');

dotenv.config();

const crawler = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      args: ['--window-size=1920,1080', '--disable-notifications', '--no-sandbox'],
    });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36');
    await page.setViewport({
      width: 1080,
      height: 1080,
    });
    await page.goto(`https://twitter.com`, {
      waitUntil: 'networkidle0',
    });
    await page.type('.LoginForm-username input', process.env.EMAIL)
    await page.type('.LoginForm-password input', process.env.PASSWORD)
    await page.waitForSelector('input[type=submit]');
    await page.click('input[type=submit]');
    await page.waitForNavigation();

    while (await page.$('.js-stream-item')) {
        const firstItem = await page.$('.js-stream-item:first-child');

        //트위터는 스크롤을 내려야 iframe을 로딩한다.
        //1. iframe이 들어갈 컨테이너가 있는지 확인
        if (await page.$('.js-stream-item:first-child .js-macaw-cards-iframe-container')) {
            //2. 스크롤을 내려 iframe을 로드한다.
            await page.evaluate(() => {
              window.scrollBy(0, 10);
            });
            console.log('iframe 발견');
        }else{
            console.log('iframe 없음');
            //3. 확인한 포스트 삭제
            await page.evaluate((item)=> item.parentNode.removeChild(item), firstItem);
        }
    }

    // await browser.close();
  } catch (e) {
    console.error(e);
  }
};

crawler();