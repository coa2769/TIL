//<< xlsx 파일 파싱 >>
const xlsx = require('xlsx');
const puppeteer = require('puppeteer');
const add_to_sheet = require('./add_to_sheet');

const workbook = xlsx.readFile('xlsx/data.xlsx');
const ws = workbook.Sheets.영화목록;
const records = xlsx.utils.sheet_to_json(ws);


const crawler = async ()=>{
    try{
        const browser = await puppeteer.launch({headless : process.env.NODE_ENV === 'production'}); 
        //한페이지에서 여러 url을 이동하는 것으로 사람 흉내를 낸다.
        const page = await browser.newPage();
        //navigator.userAgent에 담을 정보를 입력. 브라우저의 정보가 담긴다.
        await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36");
        add_to_sheet(ws, 'C1', 's', '평점');

        for(const [i, r] of records.entries()){
            await page.goto(r.링크);
            const text = await page.evaluate(()=>{
                const score = document.querySelector('.score.score_left .star_score');
                if(score){
                    return score.textContent;
                }
            });

            if(text){
                const newCell = 'C' + (i + 2);
                console.log(r.제목, '평점', text.trim());
                add_to_sheet(ws, newCell, 'n', text.trim());
            }

            await page.waitFor(1000);
        }

        await page.close();    
        await browser.close();
        xlsx.writeFile(workbook, 'xlsx/result.xlsx');
        
    } catch (e){
        console.error(e);
    }

};

crawler();