//==================================================================================//
//1-2 csv-parse로 csv 파싱
// const parse = require('csv-parse/lib/sync');

// const fs = require('fs');

// const csv = fs.readFileSync('csv/data.csv');
// const records = parse(csv.toString('utf-8'));

// records.forEach((r,i) => {
//     console.log(i, r);
// });

//==================================================================================//

//1-3 xlsx 라이브러리로 xlsx파일 파싱
// const xlsx = require('xlsx');

// const workbook = xlsx.readFile('xlsx/data.xlsx');

// const ws = workbook.Sheets.영화목록;

// const records = xlsx.utils.sheet_to_json(ws);
// console.log(records);

// for(const [i, r] of records.entries()){
//     console.log(i, r.제목, r.링크);
// }

//==================================================================================//
//1-4 & 1-5 & 1-8  axios + cheerio 로 크롤링 만들기
// const xlsx = require('xlsx');
// const axios = require('axios'); //가장 많이 쓰이는 ajax 라이브러리
// const cheerio = require('cheerio'); //html 파싱
// const add_to_sheet = require('./add_to_sheet');

// const workbook = xlsx.readFile('xlsx/data.xlsx');

// const ws = workbook.Sheets.영화목록;

// const records = xlsx.utils.sheet_to_json(ws);
// console.log(records); //배열

// for(const [i, r] of records.entries()){
//     console.log(i, r.제목, r.링크);
// }

// const crawler = async ()=>{

//     //아래 Promise.all은 xlsx에 작성된 순서가 보장되지 않고 응답온 순서로 응답이 온다.

//     //콜백이기 때문에 모든 요청을 한번에 보내버린다. 
//     // await Promise.all(records.map(async(r)=>{
//     //     const response = await axios.get(r.링크);
//     //     if(response.status === 200){ //응답이 성공한 경우
//     //         const html = response.data;
//     //         const $ = cheerio.load(html);
//     //         const text = $('.score.score_left .star_score').text();
//     //         console.log(r.제목, '평점', text.trim());
//     //     }
//     // }));

//     add_to_sheet(ws, 'C1', 's', '평점'); //C1 셀에 문자열 '평점'추가

//     //보낸 요청에 응답이 올때 까지 기다린다.
//     for(const [i, r] of records.entries()){
//         const response = await axios.get(r.링크);
//         if(response.status === 200){ //응답이 성공한 경우

//             //html 가져옴
//             const html = response.data;
//             //html문서를 파싱해서 필요한 정보 가져옴
//             const $ = cheerio.load(html);
//             const text = $('.score.score_left .star_score').text();//textContent이기 때문에 tag는 무시하고 문자만 가져온다.
//             console.log(r.제목, '평점', text.trim());

//             //sheet에 평점 내용 추가
//             const newCell = 'C' + (i+2);
//             add_to_sheet(ws, newCell, 'n', parseFloat(text.trim()));
//         }
//     }

//     //수정한 workbook 저장
//     xlsx.writeFile(workbook, 'xlsx/result.xlsx')
// };

// crawler();
//간단한 페이지는 axios와 cheerio로 크롤링이 가능하다.
//==================================================================================//
//2-1, 2-2 puppetter 
//크롤링이 차단된 web server나 Rect, vue와 같은 서버사이드렌더링 기술을 사용하는 웹페이지를 크롤링 하기위해이용된다.
//많은 기능들이 있는 강력한 라이브러리이다.

// const puppeteer = require('puppeteer');

// const crawler = async ()=>{
//     //headless : 모니터에 브라우저 출력 유무 선택
//     //{ headless : process.env.NODE_ENV === 'production' } => 배포 환경에서는 브라우저를 출력하지 않는다.
//     const browser = await puppeteer.launch({headless : false}); 
//     const [page, page2, page3] = await Promise.all([
//         await browser.newPage(), //크롬의 페이지 생성, 여러개 생성 가능하다.
//         await browser.newPage(),
//         await browser.newPage(),
//     ]);

//     await Promise.all([
//         page.goto("https://zerocho.com"),
//         page2.goto("https://naver.com"),
//         page3.goto("https://google.com"),
//     ]);

//     await Promise.all([
//         page.waitFor(3000),
//         page2.waitFor(1000),
//         page3.waitFor(2000),
//     ]);


//     await page.close();
//     await page2.close();
//     await page3.close();

//     await browser.close();
// };

// crawler();

//==================================================================================//
//2-3 첫 puppeteer 크롤링
//csv에 작성된 웹페이지 크롤링

//puppeteer를 이용하여 개발된 기능들의 예시 URL : https://try-puppeteer.appspot.com/

// const parse = require('csv-parse/lib/sync');
// const stringify = require('csv-stringify/lib/sync');
// const fs = require('fs');
// const puppeteer = require('puppeteer');

// const csv = fs.readFileSync('csv/data.csv');
// const records = parse(csv.toString('utf-8'));

// const crawler = async ()=>{
//     try{
//         const result = [];
//         const browser = await puppeteer.launch({headless : process.env.NODE_ENV === 'production'}); 
//         await Promise.all(records.map(async(r, i)=>{
//             try{
//                 const page = await browser.newPage();
//                 await page.goto(r[1]);

//                 ////<< page.$(선택자)를 이용하여 tag를 찾는다. >>
//                 // const scoreEl = await page.$('.score.score_left .star_score');
//                 // if(scoreEl){
//                 //     const text = await page.evaluate(tag => tag.textContent, scoreEl);
//                 //     console.log(r[0], '평점', text.trim());
//                 //     result[i] = [r[0], r[1], text.trim()];
//                 // }

//                 //<< evaluate 함수 안에서 document로 tag를 찾는다. >>
//                 const text = await page.evaluate(()=>{
//                     const score = document.querySelector('.score.score_left .star_score');
//                     if(score){
//                         return score.textContent;
//                     }
//                 });

//                 if(text){
//                     console.log(r[0], '평점', text.trim());
//                     result[i] = [r[0], r[1], text.trim()];
//                 }

//                 await page.close();

//             }catch(e){
//                 console.error(e);
//             }

//         }));
    
//         await browser.close();
//         const str = stringify(result);
//         fs.writeFileSync('csv/result.csv', str);
//     } catch (e){
//         console.error(e);
//     }

// };

// crawler();

//==================================================================================//
//2-6 userAgent와 한 탭으로 크롤링
//봇을 검사하는 사이트를 피해가기 위해서는 사람을 흉내내는 게 좋다.

// << csv 파일 파싱 >>
// const parse = require('csv-parse/lib/sync');
// const stringify = require('csv-stringify/lib/sync');
// const fs = require('fs');
// const puppeteer = require('puppeteer');

// const csv = fs.readFileSync('csv/data.csv');
// const records = parse(csv.toString('utf-8'));

// const crawler = async ()=>{
//     try{
//         const result = [];
//         const browser = await puppeteer.launch({headless : process.env.NODE_ENV === 'production'}); 
//         //한페이지에서 여러 url을 이동하는 것으로 사람 흉내를 낸다.
//         const page = await browser.newPage();
//         //navigator.userAgent에 담을 정보를 입력. 브라우저의 정보가 담긴다.
//         await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36");

//         for(const [i, r] of records.entries()){
//             await page.goto(r[1]);
//             const text = await page.evaluate(()=>{
//                 const score = document.querySelector('.score.score_left .star_score');
//                 if(score){
//                     return score.textContent;
//                 }
//             });

//             if(text){
//                 console.log(r[0], '평점', text.trim());
//                 result[i] = [r[0], r[1], text.trim()];
//             }

//             await page.waitFor(3000);
//         }

//         await page.close();    
//         await browser.close();
//         const str = stringify(result);
//         fs.writeFileSync('csv/result.csv', str);
//     } catch (e){
//         console.error(e);
//     }

// };

// crawler();

// //<< xlsx 파일 파싱 >>
// const xlsx = require('xlsx');
// const puppeteer = require('puppeteer');
// const add_to_sheet = require('./add_to_sheet');

// const workbook = xlsx.readFile('xlsx/data.xlsx');
// const ws = workbook.Sheets.영화목록;
// const records = xlsx.utils.sheet_to_json(ws);


// const crawler = async ()=>{
//     try{
//         const browser = await puppeteer.launch({headless : process.env.NODE_ENV === 'production'}); 
//         //한페이지에서 여러 url을 이동하는 것으로 사람 흉내를 낸다.
//         const page = await browser.newPage();
//         //navigator.userAgent에 담을 정보를 입력. 브라우저의 정보가 담긴다.
//         await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36");
//         add_to_sheet(ws, 'C1', 's', '평점');

//         for(const [i, r] of records.entries()){
//             await page.goto(r.링크);
//             const text = await page.evaluate(()=>{
//                 const score = document.querySelector('.score.score_left .star_score');
//                 if(score){
//                     return score.textContent;
//                 }
//             });

//             if(text){
//                 const newCell = 'C' + (i + 2);
//                 console.log(r.제목, '평점', text.trim());
//                 add_to_sheet(ws, newCell, 'n', text.trim());
//             }

//             await page.waitFor(1000);
//         }

//         await page.close();    
//         await browser.close();
//         xlsx.writeFile(workbook, 'xlsx/result.xlsx');
        
//     } catch (e){
//         console.error(e);
//     }

// };

// crawler();

//==================================================================================//
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

/*
querySelector과 CSS선택자

document.querySelector( 선택자 )
- $()과 같은 뜻이다.(크롬 브라우저에서)
- 선택자에 해당하는 tag 중 가장 처음 찾은 tag를 가져온다.

document.querySelectorAll( 선택자 )
- $$()과 같은 뜻이다.(크롬 브라우저에서)
- 선택자에 해당하는 모든 tag를 가져온다.


# : 태그의 아이디
. : 태그의 클래스(여러개 가능)

선택자를 조합해서 특정 tag를 골라내도록 해야한다.

[부모tag] > [자식tag] : 부모와 자식 관계
ex) $$(div > a > img) 
img는 a의 자식이다.
a는 div의 자식이다.


- 선택자에 띄어쓰기가 없다면 그 클래스or아이디orTag가 공존하는 tag
ex) tag.child

<tag>[속성] : tag의 속성으로 찾는 선택자
ex) img[width=26]

*/