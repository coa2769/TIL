//10-2 아마존 크롤링
const puppeteer = require('puppeteer');

const crawler = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      args: ['--window-size=1920,1080', '--disable-notifications', '--no-sandbox'],
    });

    let result = [];

    //주소를 이용하여 페이지를 넘어간다.
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

        const r = await page.evaluate(() => {
            //1. 판매 되는 목록 가져오기
            const tags = document.querySelectorAll('.s-result-list > div');
            const result = [];
            tags.forEach((t) => {
                //2. 판매 되는 물건의 이름과 가격 가져오기
                result.push({
                    name: t && t.querySelector('h5') && t.querySelector('h5').textContent.trim(),
                    price: t && t.querySelector('.a-price') && t.querySelector('.a-price').textContent.trim(),
                });
            });
            return result;
        });
        //3. 이전 목록들 뒤에 이번 페이지의 목록들을 붙이기
        result = result.concat(r);

    }));
    
  } catch (e) {
    console.error(e);
  }
};

crawler();