//10-5 트위터 로그인하기

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

    // await browser.close();
  } catch (e) {
    console.error(e);
  }
};

crawler();
