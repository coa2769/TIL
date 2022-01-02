//10-7 트위터 아이프레임 컴텐츠 가져오기
//frame은 page와 같은 api를 사용할 수 있다.

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

    //1. .js-stream-item가 없을 때 까지 반복
    while (await page.$('.js-stream-item')) {
        //2. 첫번째 item 가져오기
        const firstItem = await page.$('.js-stream-item:first-child');

        //트위터는 스크롤을 내려야 iframe을 로딩한다.
        //3. iframe이 들어갈 컨테이너가 있는지 확인
        if (await page.$('.js-stream-item:first-child .js-macaw-cards-iframe-container')) {
            //4. tweetId 가져오기
            const tweetId = await page.evaluate((item) => {
                //dataset-item-id 속성에 있음
                return item.dataset.itemId;
            }, firstItem);
            
            //5. 스크롤을 내려 iframe을 로드한다.
            await page.evaluate(() => {
              window.scrollBy(0, 10);
            });
            await page.waitForSelector('.js-stream-item:first-child iframe');

            //6. 페이지의 frame 중 url에 해당 tweetId가 들어간 것을 찾는다.
            const iframe = await page.frames().find((frame) => frame.url().includes(tweetId));
            if (iframe) {
                //7. iframe의 정보 가져오기
                //iframe도 별도의 웹페이지 이기 때문에 page의 함수들을 그대로 사용할 수 있다.
                const result = await iframe.evaluate(() => {
                    return {
                      title: document.querySelector('h2') && document.querySelector('h2').textContent,
                    }
                });
                console.log(result);
            }

            //8. firstitem은 삭제 
            await page.evaluate((item) => item.parentNode.removeChild(item), firstItem);
            await page.evaluate(() => {
              window.scrollBy(0, 10);
            });
            await page.waitForSelector('.js-stream-item')
            
        }
    }

    // await browser.close();
  } catch (e) {
    console.error(e);
  }
};

crawler();

