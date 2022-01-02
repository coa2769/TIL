//10-4 깃허브 페이지네이션

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
        //원하는 정보 가져오기
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
        //next 버튼을 눌러 다음 페이지로 넘어가기
        await page.waitForSelector('.next_page');
        await page.click('.next_page');
        
        //pjax로 테그를 받아와서 페이지를 대체 하므로 해당 응답이 돌아와야 페이지가 제대로 넘어간 것이다.
        await page.waitForResponse((response) => {
            //해당 문자열로 시작하는 url의 응답이 200일 때 까지 기다린다.
            return response.url().startsWith(`https://github.com/search/count?p=${pageNum}`) && response.status() === 200;
        });

        pageNum++;
    }

  } catch (e) {
    console.error(e);
  }
};

crawler();