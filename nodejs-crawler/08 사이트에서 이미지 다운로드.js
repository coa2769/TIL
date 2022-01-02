//3-1 이미지 다운로드 준비하기

const xlsx = require('xlsx');
const puppeteer = require('puppeteer');
const axios = require('axios');
const fs = require('fs');
const add_to_sheet = require('./add_to_sheet');

const workbook = xlsx.readFile('xlsx/data.xlsx');
const ws = workbook.Sheets.영화목록;
const records = xlsx.utils.sheet_to_json(ws);

//sync 메서드는 동기식 함수이므로 프로그램의 처음과 끝에만 사용해라.
fs.readdir('screenshot', (err)=>{
    if(err){
        console.error('screenshot폴더가 없어 screenshot폴더를 생성합니다.');
        fs.mkdirSync('screenshot');
    }
});

fs.readdir('poster', (err)=>{
    if(err){
        console.error('poster 폴더가 없어 poster 폴더를 생성합니다.');
        fs.mkdirSync('poster');
    }
});

const crawler = async ()=>{
    try{
        const browser = await puppeteer.launch({
            headless : process.env.NODE_ENV === 'production',
            //브라우저의 크기를 조절한다.
            args : ['--window-size=1920,1080']
        }); 
        //한페이지에서 여러 url을 이동하는 것으로 사람 흉내를 낸다.
        const page = await browser.newPage();
        //페이지의 크기를 조절한다.
        await page.setViewport({
            width : 1920,
            height : 1080
        });
        //navigator.userAgent에 담을 정보를 입력. 브라우저의 정보가 담긴다.
        await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36");
        add_to_sheet(ws, 'C1', 's', '평점');

        for(const [i, r] of records.entries()){
            await page.goto(r.링크);
            const result = await page.evaluate(()=>{
                const scoreEl = document.querySelector('.score.score_left .star_score');
                let score = '';
                if(scoreEl){
                    score = scoreEl.textContent;
                }

                const imgEl = document.querySelector('.poster img');
                let img = '';
                if(imgEl){
                    img = imgEl.src;
                }

                return { score, img };
            });

            if(result.score){
                console.log(r.제목, '평점', result.score.trim());
                const newCell = 'C' + (i + 2);
                add_to_sheet(ws, newCell, 'n', result.score.trim());
            }

            if(result.img){
                //- 페이지를 스크린샷을 찍어 저장하는 코드
                //fullPage : true <= 화면에 보이지 않는 페이지 전체를 스크린샷을 찍는다.
                //clip <= 특정 부분을 잘라서 이미지를 저장한다.
                await page.screenshot({
                    path : `screenshot/${r.제목}.jpg`, 
                    // fullPage : true,
                    clip : { 
                        x:100,
                        y:100,
                        width : 300,
                        height : 300
                    }
                });
                

                //- 페이지의 포스터를 저장하는 가져와서 저장하는 코드
                //buffer가 연속적으로 들어있는 자료구조가 arraybuffer이다.
                //replace(/\?.*$/, '') : 쿼리 스트링을 삭제하는 정규표현식(?부터 문자 끝까지 삭제)
                //해당 페이지에서는 쿼리 스트링을 삭제하니 큰 이미지를 서버에서 보내줬다. 이는 경험적인 것이다.
                const imgResult = await axios.get(result.img.replace(/\?.*$/, ''),{ 
                    responseType : 'arraybuffer'
                });
                fs.writeFileSync(`poster/${r.제목}.jpg`, imgResult.data)
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