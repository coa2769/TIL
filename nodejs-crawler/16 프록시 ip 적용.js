//6-1, 6-2 프록시 설명과 태그 분석 / 프록시 ip 적용하기
//크롤러를 테스트 하다보면 해당 사이트에서 차단을 당할 수 있다. 
//이런 차단의 경우 ip기반으로 이루어진다.
//해당 강의 내용은 프록시를 이용하여 차단을 우회하는 방법이다.


//&& tag selector 정리하기

const puppeteer = require('puppeteer');
const dotenv = require('dotenv');
dotenv.config(); //.env파일에 작성한 환경변수를 불러와 process.env 에 구성한다.

const crawler = async ()=>{
    try{
        //1. 현재 실행되는 프록시 중 가장 빠른 것을 사용하기 위해 아래 URL에서 프록시 목록을 크롤러로 가져와 분석한다.
        //https://spys.one/free-proxy-list/KR/
        //- 프록시 목록 중 익명 항목이 NOA(노아)라면 익명성을 보장하지 않는다. 그러므로 사용하지 않는다.

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

        const filtered = proxies.filter((v)=>v.type.startsWith('HTTP')).sort((p, c) => p.latency - c.latency);
        console.log(filtered);

        await page.close();
        await browser.close();

        //2. 가장 빠른 프록시의 ip로 우회한다.
        //프록시를 통해 접속하려면 puppeteer.launch 함수의 args매개변수에 --proxy-server={ip} 를 추가해야한다.
        //실제로 해보니 HTTPS, HTTP (Squid)에서는 제대로 작동하지 않으므로 HTTP만 사용해야 한다.
        browser = await puppeteer.launch({
            headless : false, 
            args:['--window-size=1920,1080', '--disable-notifications', `--proxy-server=${filtered[3].ip}`],
        });
        page = await browser.newPage();
        await page.goto('https://www.naver.com/');

    }catch(e){
        console.error(e);
    }
};

crawler();