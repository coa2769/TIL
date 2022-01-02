//10-3 깃허브 크롤링

const puppeteer = require('puppeteer');

const crawler = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      args: ['--window-size=1920,1080', '--disable-notifications', '--no-sandbox'],
    });
    const page = await browser.newPage();
    await page.setViewport({
      width: 1080,
      height: 1080,
    });
    const keyword = 'crawler';
    await page.goto(`https://github.com/search?q=${keyword}`, {
      waitUntil: 'networkidle0',
    });

    let result = [];
    let pageNum = 1;
    //5페이지 넘어감
    while (pageNum <= 5) {
        //1. 원하는 정보 가져오기
        const r = await page.evaluate(() => {
            const tags = document.querySelectorAll('.repo-list-item');
            const result = [];
            tags.forEach((t) => {
              result.push({
                name: t && t.querySelector('h3') && t.querySelector('h3').textContent.trim(),
                star: t && t.querySelector('.muted-link') && t.querySelector('.muted-link').textContent.trim(),
                lang: t && t.querySelector('.text-gray.flex-auto') && t.querySelector('.text-gray.flex-auto').textContent.trim(),
              })
            });
            return result;
        });
        result = result.concat(r);
        //2. next 버튼을 눌러 다음 페이지로 넘어가기
        await page.waitForSelector('.next_page');
        await page.click('.next_page');

        pageNum++;
    }

  } catch (e) {
    console.error(e);
  }
};

crawler();