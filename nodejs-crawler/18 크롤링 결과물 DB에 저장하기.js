//6-4 크롤링 결과물 데이터베이스에 저장하기
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

        //type이 HTTP인 프록시만 걸러낸다.
        const filtered = proxies.filter((v)=>v.type === 'HTTP').sort((p, c) => p.latency - c.latency);
        //1. DB에 프록시 목록을 저장한다.
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
        const fatestProxy = await db.Proxy.findOne({
            order : [['latency', 'ASC']],
        });
        
        console.log(fatestProxy.dataValues.ip);

        browser = await puppeteer.launch({
            headless : false, 
            args:['--window-size=1920,1080', '--disable-notifications', `--proxy-server=${fatestProxy.dataValues.ip}`],
        });
        page = await browser.newPage();
        await page.goto('https://www.naver.com/');
        await page.waitFor(10000);
        await page.close();
        await browser.close();
        await db.sequelize.close();
    }catch(e){
        console.error(e);
    }
};

crawler();