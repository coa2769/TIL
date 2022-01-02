//2-6 userAgent와 한 탭으로 크롤링
//봇을 검사하는 사이트를 피해가기 위해서는 사람을 흉내내는 게 좋다.

// << csv 파일 파싱 >>
const parse = require('csv-parse/lib/sync');
const stringify = require('csv-stringify/lib/sync');
const fs = require('fs');
const puppeteer = require('puppeteer');

const csv = fs.readFileSync('csv/data.csv');
const records = parse(csv.toString('utf-8'));

const crawler = async ()=>{
    try{
        const result = [];
        const browser = await puppeteer.launch({
          headless : process.env.NODE_ENV === 'production'
        }); 
        //한페이지에서 여러 url을 이동하는 것으로 사람 흉내를 낸다.
        const page = await browser.newPage();
        //navigator.userAgent에 담을 정보를 입력. 브라우저의 정보가 담긴다.
        await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36");

        for(const [i, r] of records.entries()){
            await page.goto(r[1]);
            const text = await page.evaluate(()=>{
                const score = document.querySelector('.score.score_left .star_score');
                if(score){
                    return score.textContent;
                }
            });

            if(text){
                console.log(r[0], '평점', text.trim());
                result[i] = [r[0], r[1], text.trim()];
            }

            await page.waitFor(3000);
        }

        await page.close();    
        await browser.close();
        const str = stringify(result);
        fs.writeFileSync('csv/result.csv', str);
    } catch (e){
        console.error(e);
    }

};

crawler();

