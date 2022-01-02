//2-3 첫 puppeteer 크롤링
//csv에 작성된 웹페이지 크롤링

//puppeteer를 이용하여 개발된 기능들의 예시 URL : https://try-puppeteer.appspot.com/

const parse = require('csv-parse/lib/sync');
const stringify = require('csv-stringify/lib/sync');
const fs = require('fs');
const puppeteer = require('puppeteer');

const csv = fs.readFileSync('csv/data.csv');
const records = parse(csv.toString('utf-8'));

const crawler = async ()=>{
    try{
        const result = [];
        const browser = await puppeteer.launch({headless : process.env.NODE_ENV === 'production'}); 
        await Promise.all(records.map(async(r, i)=>{
            try{
                const page = await browser.newPage();
                await page.goto(r[1]);

                ////<< page.$(선택자)를 이용하여 tag를 찾는다. >>
                // const scoreEl = await page.$('.score.score_left .star_score');
                // if(scoreEl){
                //     const text = await page.evaluate(tag => tag.textContent, scoreEl);
                //     console.log(r[0], '평점', text.trim());
                //     result[i] = [r[0], r[1], text.trim()];
                // }

                //<< evaluate 함수 안에서 document로 tag를 찾는다. >>
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

                await page.close();

            }catch(e){
                console.error(e);
            }

        }));
    
        await browser.close();
        const str = stringify(result);
        fs.writeFileSync('csv/result.csv', str);
    } catch (e){
        console.error(e);
    }

};

crawler();