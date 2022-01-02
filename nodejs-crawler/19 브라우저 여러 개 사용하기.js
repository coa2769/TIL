//6-5 브라우저 여러 개 사용하기

const puppeteer = require('puppeteer');
const dotenv = require('dotenv');

const db = require('./models');
dotenv.config(); 

const crawler = async ()=>{

    //7. DB 연결
    await db.sequelize.sync();

    try{
        let browser = await puppeteer.launch({headless : false, args:['--window-size=1920,1080', '--disable-notifications']});
        let page = await browser.newPage();
        await page.setViewport({
            width : 1080,
            height : 1080
        });
        await page.goto('https://spys.one/free-proxy-list/KR/');
        const proxies = await page.evaluate(()=>{
            const ips = Array.from(document.querySelectorAll('tr > td:first-of-type > .spy14')).map((v)=>v.textContent.replace(/document\.write\(.+\)/, ''));
            const types = Array.from(document.querySelectorAll('tr > td:nth-of-type(2)')).slice(5).map((v)=>v.textContent);
            const latencies = Array.from(document.querySelectorAll('tr > td:nth-of-type(6) .spy1')).map((v)=>v.textContent);

            return ips.map((v, i)=>{
                return {
                    ip:v,
                    type : types[i],
                    latency : latencies[i]
                }
            });
        });

        const filtered = proxies.filter((v)=>v.type === 'HTTP').sort((p, c) => p.latency - c.latency);

        await Promise.all(filtered.map((v)=>{
            return db.Proxy.upsert({
                ip : v.ip,
                type : v.type,
                latency : v.latency
            });
        }));

        await page.close();
        await browser.close();

        //
        const fatestProxy = await db.Proxy.findAll({
            order : [['latency', 'ASC']],
        });
        
        console.log(fatestProxy[0].dataValues.ip);
        console.log(fatestProxy[1].dataValues.ip);
        console.log(fatestProxy[2].dataValues.ip);

        browser = await puppeteer.launch({
            headless : false, 
            args:['--window-size=1920,1080', '--disable-notifications', `--proxy-server=${fatestProxy[0].dataValues.ip}`],
        });

        browser2 = await puppeteer.launch({
            headless : false, 
            args:['--window-size=1920,1080', '--disable-notifications', `--proxy-server=${fatestProxy[1].dataValues.ip}`],
        });

        browser3 = await puppeteer.launch({
            headless : false, 
            args:['--window-size=1920,1080', '--disable-notifications', `--proxy-server=${fatestProxy[2].dataValues.ip}`],
        });

        const page1 = await browser.newPage();
        const page2 = await browser2.newPage();
        const page3 = await browser3.newPage();

        await page1.goto('https://www.naver.com/');
        await page2.goto('https://www.naver.com/');
        await page3.goto('https://www.naver.com/');


        //<<각각의 새로운 페이지를 만드는 방법>>
        //크롬의 시크릿 브라우저를 만들어서 띄우는 방법
        // const context = await browser.createIncognitoBrowserContext();
        // const context2 = await browser.createIncognitoBrowserContext();
        // const context3 = await browser.createIncognitoBrowserContext();

        // console.log(await browser.browserContexts());

        // const page1 = await context.newPage();
        // const page2 = await context2.newPage();
        // const page3 = await context3.newPage();

        // await page1.goto('https://www.naver.com/');
        // await page2.goto('https://www.naver.com/');
        // await page3.goto('https://www.naver.com/');


        await db.sequelize.close();
    }catch(e){
        console.error(e);
    }
};

crawler();