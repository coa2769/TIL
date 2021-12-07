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

// const xlsx = require('xlsx');
// const puppeteer = require('puppeteer');
// const axios = require('axios');
// const fs = require('fs');
// const add_to_sheet = require('./add_to_sheet');

// const workbook = xlsx.readFile('xlsx/data.xlsx');
// const ws = workbook.Sheets.영화목록;
// const records = xlsx.utils.sheet_to_json(ws);

// //sync 메서드는 동기식 함수이므로 프로그램의 처음과 끝에만 사용해라.
// fs.readdir('screenshot', (err)=>{
//     if(err){
//         console.error('screenshot폴더가 없어 screenshot폴더를 생성합니다.');
//         fs.mkdirSync('screenshot');
//     }
// });

// fs.readdir('poster', (err)=>{
//     if(err){
//         console.error('poster 폴더가 없어 poster 폴더를 생성합니다.');
//         fs.mkdirSync('poster');
//     }
// });

// const crawler = async ()=>{
//     try{
//         const browser = await puppeteer.launch({
//             headless : process.env.NODE_ENV === 'production',
//             //브라우저의 크기를 조절한다.
//             args : ['--window-size=1920,1080']
//         }); 
//         //한페이지에서 여러 url을 이동하는 것으로 사람 흉내를 낸다.
//         const page = await browser.newPage();
//         //페이지의 크기를 조절한다.
//         await page.setViewport({
//             width : 1920,
//             height : 1080
//         });
//         //navigator.userAgent에 담을 정보를 입력. 브라우저의 정보가 담긴다.
//         await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36");
//         add_to_sheet(ws, 'C1', 's', '평점');

//         for(const [i, r] of records.entries()){
//             await page.goto(r.링크);
//             const result = await page.evaluate(()=>{
//                 const scoreEl = document.querySelector('.score.score_left .star_score');
//                 let score = '';
//                 if(scoreEl){
//                     score = scoreEl.textContent;
//                 }

//                 const imgEl = document.querySelector('.poster img');
//                 let img = '';
//                 if(imgEl){
//                     img = imgEl.src;
//                 }

//                 return { score, img };
//             });

//             if(result.score){
//                 console.log(r.제목, '평점', result.score.trim());
//                 const newCell = 'C' + (i + 2);
//                 add_to_sheet(ws, newCell, 'n', result.score.trim());
//             }

//             if(result.img){
//                 //- 페이지를 스크린샷을 찍어 저장하는 코드
//                 //fullPage : true <= 화면에 보이지 않는 페이지 전체를 스크린샷을 찍는다.
//                 //clip <= 특정 부분을 잘라서 이미지를 저장한다.
//                 await page.screenshot({
//                     path : `screenshot/${r.제목}.jpg`, 
//                     // fullPage : true,
//                     clip : { 
//                         x:100,
//                         y:100,
//                         width : 300,
//                         height : 300
//                     }
//                 });
                

//                 //- 페이지의 포스터를 저장하는 가져와서 저장하는 코드
//                 //buffer가 연속적으로 들어있는 자료구조가 arraybuffer이다.
//                 //replace(/\?.*$/, '') : 쿼리 스트링을 삭제하는 정규표현식(?부터 문자 끝까지 삭제)
//                 //해당 페이지에서는 쿼리 스트링을 삭제하니 큰 이미지를 서버에서 보내줬다. 이는 경험적인 것이다.
//                 const imgResult = await axios.get(result.img.replace(/\?.*$/, ''),{ 
//                     responseType : 'arraybuffer'
//                 });
//                 fs.writeFileSync(`poster/${r.제목}.jpg`, imgResult.data)
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

//==================================================================================//
//4-1 ~ 4-3
/*
# 인피니트 스크롤링
무한히 스크롤을 내릴 수 있으며 스크롤 끝에 도달했을 때 서버에서 데이터를 계속 로드해 오는 페이지

    [ 크롤링 할 때 어려운점 ]
    스크롤을 내려야만 다음 컨텐츠를 가져오기 때문에 어렵다.


# Postman
서버로 요청을 보내어 답정을 테스트할 때 쓰이는 테스트 도구.
이번 강의에서는 크롤링할 웹 페이지가 간단한지 판변할 때 쓰인다.
Postman의 Preview로 하면을 확인하면 크롤러가 보게되는 화면을 볼 수 있다.


[ 이번 간의에서 해결할 문제 ]
    unsplash.com
    => 브라우저로 요청했을 때는 문제없던 페이지가 Postman으로 요청하니 이미지와 컨텐츠를 전혀 가져오지 못한다.
    => SPA에서 자주 볼수 있는 문제이다.
    => Webpack으로 class 명들이 암호화 되어 있다. 이런 경우 class명이 자주 바뀌기도 하므로 체크해줘야 한다.

*/

// const puppeteer = require('puppeteer');
// const axios = require('axios');
// const fs = require('fs');

// fs.readdir('imgs', (err)=>{
//     if(err){
//         console.error('imgs 폴더가 없어 imgs 폴더를 생성합니다.');
//         fs.mkdirSync('imgs');
//     }
// });

// const crawler = async ()=>{
//     try{
//         const browser = await puppeteer.launch({headless : false});
//         const page = await browser.newPage();
//         await page.goto('https://unsplash.com');
//         let result = [];

//         while(result.length <= 30){
//             let srcs = await page.evaluate(()=>{
//                 //0. 스크롤을 맨 위로 올린다.
//                 //scrollBy : 상대 좌표
//                 //scrollTo : 절대 좌표
//                 window.scrollTo(0, 0);

//                 let imgs = [];
//                 const imgEls = document.querySelectorAll('._6IG7');
//                 if(imgEls.length){
//                     imgEls.forEach((v)=>{
//                         //1. 이미지 소스를 얻음
//                         let src = v.querySelector('img.oCCRx').src;
//                         if(src){
//                             imgs.push(src);
//                         }
//                         //2. 해당 tag를 삭제
//                         v.parentElement.removeChild(v);
//                     });
//                 }
    
//                 //3. 스크롤을 내리는 동작을 한다.
//                 //기존 로드한 tag는 삭제되었으므로 조금만 내려도 다음 컨텐츠를 가져오게 된다.
//                 window.scrollBy(0, 300);
//                 return imgs;
//             });

//             result = result.concat(srcs);

//             //waitForSelector : 선택자에 해당하는 태그가 로딩될 때 까지 기다림.
//             //만약 30간 기다린 후 선택자를 못 찾으면 timeout 에러가 된다.
//             await page.waitForSelector('._6IG7');
//             console.log('태그 로딩 완료!');

//         }

//         console.log(result.length);
//         result.forEach(async(src)=>{
//             const imgResult = await axios.get(src.replace(/\?.*$/, ''),{ 
//                 responseType : 'arraybuffer'
//             });

//             fs.writeFileSync(`imgs/${new Date().valueOf()}.jpeg`, imgResult.data);
//         });

//         //page, browser 닫기
//         await page.close();    
//         await browser.close();
//     }catch(e){
//         console.error(e);
//     }
// }

// crawler();

//==================================================================================//
//5-1 페이스북 로그인 태그 분석
//rechapter <- 사람인지 판단하는 서비스. 해당 서비스를 피하는 방법 강의에서 따로 다루지 않는다.
//2021.11.30 현재는 화면의 html이 바껴서 사용할 수 없는 구조이다.
//다만 해당 예제는 여태까지 배운 tag를 분석하는 방법으로 로그인 하는 방법임을 알아두자.

//해당 방법은 문제가 두가지 있다. 
//첫번째 문제) 메일과 비밀번호가 코드에 하드 코딩되어 있다.
//두번째 문제) html 구조가 변경되면 코드를 전면 수정해야 한다.

// const puppeteer = require('puppeteer');

// const crawler = async ()=>{
//     try{
//         const browser = await puppeteer.launch({headless : false, args:['--window-size=1920,1080']});
//         const page = await browser.newPage();
//         await page.setViewport({
//             width : 1080,
//             height : 1080
//         });
//         await page.goto('https://facebook.com');
//         await page.evaluate(()=>{
//             document.querySelector('#email').value = 'zerohch0@gmail.com';
//             document.querySelector('#pass').value = '12345678';
//             document.querySelector('#loginbutton').click();
//         })
//         // await page.close();
//         // await browser.close();
//     }catch(e){
//         console.error(e);
//     }
// };

// crawler();

//==================================================================================//
//5-2 dotenv로 비밀번호 관리하기
//5-1의 첫번째 문제를 해결하는 방법이다.

//dotenv 패키지는 외부 환경변수 파일(.env)에 작성한 내용을 node.js에서 환경변수로 사용할 때 쓰인다.
//https://hudi.kr/node-js-dotenv-%ED%99%98%EA%B2%BD-%EB%B3%80%EC%88%98-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0/
//https://www.npmjs.com/package/dotenv

// const puppeteer = require('puppeteer');
// const dotenv = require('dotenv');
// dotenv.config(); //.env파일에 작성한 환경변수를 불러와 process.env 에 구성한다.

// const crawler = async ()=>{
//     try{
//         const browser = await puppeteer.launch({headless : false, args:['--window-size=1920,1080']});
//         const page = await browser.newPage();
//         await page.setViewport({
//             width : 1080,
//             height : 1080
//         });
//         await page.goto('https://facebook.com');
//         const id = process.env.EMAIL;
//         const password = process.env.PASSWORD;
//         //evaluate내부는 JS 스코프를 따르지 않아서 인자로 넘겨야 한다.
//         await page.evaluate((id, password)=>{
//             document.querySelector('#email').value = id;
//             document.querySelector('#pass').value = password;
//             document.querySelector('#loginbutton').click();
//         }, id, password);
//         // await page.close();
//         // await browser.close();
//     }catch(e){
//         console.error(e);
//     }
// };

// crawler();
//==================================================================================//
//5-3 5-4 type, hover. click, keyboard / 페이스북 로그아웃
//evaluate 이외의 puppeteer에서 지원해주는 함수들
// - type : 매개변수를 선택자를 입력하면 해당 tag에 키보드 입력을 한다.
// - hover : 매개변수를 선택자를 입력하면 해당 tag에 마우스를 올려놓는다.
// - click : 매개변수를 선택자를 입력하면 해당 tag에 마우스 클릭을 한다.
//           해당 함수가 잘 적용되지 않는다면 evaluate함수에서 tag의 click이벤트를 처리하면 된다.
// - keyboard.press : 매개변수에 입력한 키를 누른다.
//아래 URL은 puppeteer에서 지원하는 키보드 키의 이름이다.
//https://github.com/puppeteer/puppeteer/blob/v1.12.2/lib/USKeyboardLayout.js

//사람이 해당 페이지에서 어떻게 행동하는지 생각하며 크롤러를 구현하면된다.

// const puppeteer = require('puppeteer');
// const dotenv = require('dotenv');
// dotenv.config(); //.env파일에 작성한 환경변수를 불러와 process.env 에 구성한다.

// const crawler = async ()=>{
//     try{
//         const browser = await puppeteer.launch({headless : false, args:['--window-size=1920,1080']});
//         const page = await browser.newPage();
//         await page.setViewport({
//             width : 1080,
//             height : 1080
//         });
//         await page.goto('https://facebook.com');
        
//         //1. 이메일과 페스워드 입력
//         await page.type('#email', process.env.EMAIL);
//         await page.type('#pass', process.env.PASSWORD);
//         //2. 로그인 버튼 클릭
//         //로그인 버튼 tag의 id가 페이지에 들어갈 때 마다 바뀌므로 class로 해당 tag를 구분했다.
//         //hover 없이 바로 click이 가능하다.
//         await page.hover('._42ft._4jy0._6lth._4jy6._4jy1.selected._51sy');
//         await page.waitFor(3000);
//         await page.click('._42ft._4jy0._6lth._4jy6._4jy1.selected._51sy');
//         await page.waitFor(1000);
//         //3. ESC 키를 눌러 권한요구 요청 창을 닫는다.
//         await page.keyboard.press('Escape');
//         //4. 왼쪽 상단 버튼을 눌러 user navigation을 연다.
//         await page.click('#userNavigationLabel');
//         //5. user navigation에 있는 로그아웃 버튼을 누른다.
//         await page.waitForSelector('li.navSubmenu:last-child');
//         await page.click('li.navSubmenu:last-child');
        
//         // await page.close();
//         // await browser.close();
//     }catch(e){
//         console.error(e);
//     }
// };

// crawler();
//==================================================================================//
//5-5 waitForResponse
//page.waitFor 함수를 통해 특정 시간을 기다리는 것이 아니라 
//더 정확하게 내가 원하는 페이지가 열렸을 때 다음 동작을 실행하도록 하기위해 waitForResponse함수를 사용한다.

// - waitForRequest : 요청 대기
// - waitForResponse : 응답 대기

// @  puppeteer.launch의 args에 '--disable-notifications'를 배열에 추가하면 화면에 뜨는 경고 알람을 멈출 수 있다.

// const puppeteer = require('puppeteer');
// const dotenv = require('dotenv');
// dotenv.config(); //.env파일에 작성한 환경변수를 불러와 process.env 에 구성한다.

// const crawler = async ()=>{
//     try{
//         const browser = await puppeteer.launch({headless : false, args:['--window-size=1920,1080', '--disable-notifications']});
//         const page = await browser.newPage();
//         await page.setViewport({
//             width : 1080,
//             height : 1080
//         });
//         await page.goto('https://facebook.com');
        
//         //1. 이메일과 페스워드 입력
//         await page.type('#email', process.env.EMAIL);
//         await page.type('#pass', process.env.PASSWORD);
//         //2. 로그인 버튼 클릭
//         //로그인 버튼 tag의 id가 페이지에 들어갈 때 마다 바뀌므로 class로 해당 tag를 구분했다.
//         //hover 없이 바로 click이 가능하다.
//         await page.hover('._42ft._4jy0._6lth._4jy6._4jy1.selected._51sy');
//         await page.waitFor(3000);
//         await page.click('._42ft._4jy0._6lth._4jy6._4jy1.selected._51sy');
//         //3. 응답 url에 login_attemp가 있는지 판별 
//         await page.waitForResponse((response)=>{
//             console.log(response, response.url());
            
//             return response.url().includes('login_attempt');
//         });
       
//         //4. 왼쪽 상단 버튼을 눌러 user navigation을 연다.
//         await page.click('#userNavigationLabel');
//         //5. user navigation에 있는 로그아웃 버튼을 누른다.
//         await page.waitForSelector('li.navSubmenu:last-child');
//         await page.click('li.navSubmenu:last-child');
        
//         // await page.close();
//         // await browser.close();
//     }catch(e){
//         console.error(e);
//     }
// };

// crawler();

//==================================================================================//
//5-6 마우스 조작하기
//puppeteer로 연 브라우저에서 움직이는 가상 마우스는 사용자에게 잘 보이지 않는다.
//아래의 url 코드로 가상 마우스의 움직임을 볼 수 있다.
//https://github.com/ZeroCho/nodejs-crawler/blob/master/8.facebook-login-logout/index.js

//page.mouse : 브라우저에서 마우스를 조작하는 함수를 지원한다.
//page.mouse.move : 브라우저의 해당 위치로 마우스가 움직인다.
//page.mouse.down : 브라우저 안에서 마우스를 누른 상태로 변경해준다. (드레그에 쓰인다.)
//page.mouse.click : 브라우저의 해당 위치에 마우스 클릭을 할 수 있다.

// const puppeteer = require('puppeteer');
// const dotenv = require('dotenv');
// dotenv.config(); //.env파일에 작성한 환경변수를 불러와 process.env 에 구성한다.

// const crawler = async ()=>{
//     try{
//         const browser = await puppeteer.launch({headless : false, args:['--window-size=1920,1080', '--disable-notifications']});
//         const page = await browser.newPage();
//         await page.setViewport({
//             width : 1080,
//             height : 1080
//         });
        
//         await page.goto('https://facebook.com');
//         const id = process.env.EMAIL;
//         const password = process.env.PASSWORD;
//         await page.evaluate(() => {
//           (() => {
//             const box = document.createElement('div');
//             box.classList.add('mouse-helper');
//             const styleElement = document.createElement('style');
//             styleElement.innerHTML = `
//               .mouse-helper {
//                 pointer-events: none;
//                 position: absolute;
//                 z-index: 100000;
//                 top: 0;
//                 left: 0;
//                 width: 20px;
//                 height: 20px;
//                 background: rgba(0,0,0,.4);
//                 border: 1px solid white;
//                 border-radius: 10px;
//                 margin-left: -10px;
//                 margin-top: -10px;
//                 transition: background .2s, border-radius .2s, border-color .2s;
//               }
//               .mouse-helper.button-1 {
//                 transition: none;
//                 background: rgba(0,0,0,0.9);
//               }
//               .mouse-helper.button-2 {
//                 transition: none;
//                 border-color: rgba(0,0,255,0.9);
//               }
//               .mouse-helper.button-3 {
//                 transition: none;
//                 border-radius: 4px;
//               }
//               .mouse-helper.button-4 {
//                 transition: none;
//                 border-color: rgba(255,0,0,0.9);
//               }
//               .mouse-helper.button-5 {
//                 transition: none;
//                 border-color: rgba(0,255,0,0.9);
//               }
//               `;
//             document.head.appendChild(styleElement);
//             document.body.appendChild(box);
//             document.addEventListener('mousemove', event => {
//               box.style.left = event.pageX + 'px';
//               box.style.top = event.pageY + 'px';
//               updateButtons(event.buttons);
//             }, true);
//             document.addEventListener('mousedown', event => {
//               updateButtons(event.buttons);
//               box.classList.add('button-' + event.which);
//             }, true);
//             document.addEventListener('mouseup', event => {
//               updateButtons(event.buttons);
//               box.classList.remove('button-' + event.which);
//             }, true);
//             function updateButtons(buttons) {
//               for (let i = 0; i < 5; i++)
//                 box.classList.toggle('button-' + i, !!(buttons & (1 << i)));
//             }
//           })();
//         });
//         await page.type('#email', process.env.EMAIL);
//         await page.type('#pass', process.env.PASSWORD);
//         await page.hover('._42ft._4jy0._6lth._4jy6._4jy1.selected._51sy');
//         await page.mouse.move(800, 300);
//         await page.waitFor(1000);
//         await page.mouse.click(800, 300);
        
//     }catch(e){
//         console.error(e);
//     }
// };

// crawler();

//==================================================================================//
//5-7 focus와 대문자 입력하기
//page.focus : input 또는 button 에 포커스를 주는 함수. 하지만 해당 함수가 적용되지 않는 페이지도 있다.

//page.keyboard.down : 매개변수로 입력된 키를 키보드에서 누르고 있는 상태로 변경한다.
//page.keyboard.press : 매개변수로 입력된 키를 키보드에서 한번 누른다.
//page.keyboard.up : 매개변수로 입력된 키가 down함수로 누르고 있는 상태라면 해제한다.


// const puppeteer = require('puppeteer');
// const dotenv = require('dotenv');
// dotenv.config(); //.env파일에 작성한 환경변수를 불러와 process.env 에 구성한다.

// const crawler = async ()=>{
//     try{
//         const browser = await puppeteer.launch({headless : false, args:['--window-size=1920,1080', '--disable-notifications']});
//         const page = await browser.newPage();
//         await page.setViewport({
//             width : 1080,
//             height : 1080
//         });
//         await page.goto('https://facebook.com');

//         await page.focus('#email');
//         //대문자 입력 방법
//         await page.click('#email');
//         await page.keyboard.down('ShiftLeft');
//         await page.keyboard.press('KeyZ');
//         await page.waitFor(1000);
//         await page.keyboard.press('KeyE');
//         await page.waitFor(1000);
//         await page.keyboard.press('KeyR');
//         await page.waitFor(1000);
//         await page.keyboard.press('KeyO');
//         await page.waitFor(1000);
//         await page.keyboard.press('KeyC');
//         await page.waitFor(1000);
//         await page.keyboard.press('KeyH');
//         await page.waitFor(1000);
//         await page.keyboard.press('KeyO');
//         await page.waitFor(1000);
//         await page.keyboard.up('ShiftLeft');
        
//     }catch(e){
//         console.error(e);
//     }
// };

// crawler();

//==================================================================================//
//6-1, 6-2 프록시 설명과 태그 분석 / 프록시 ip 적용하기
//크롤러를 테스트 하다보면 해당 사이트에서 차단을 당할 수 있다. 
//이런 차단의 경우 ip기반으로 이루어진다.
//해당 강의 내용은 프록시를 이용하여 차단을 우회하는 방법이다.


//&& tag selector 정리하기

// const puppeteer = require('puppeteer');
// const dotenv = require('dotenv');
// dotenv.config(); //.env파일에 작성한 환경변수를 불러와 process.env 에 구성한다.

// const crawler = async ()=>{
//     try{
//         //1. 현재 실행되는 프록시 중 가장 빠른 것을 사용하기 위해 아래 URL에서 프록시 목록을 크롤러로 가져와 분석한다.
//         //https://spys.one/free-proxy-list/KR/
//         //- 프록시 목록 중 익명 항목이 NOA(노아)라면 익명성을 보장하지 않는다. 그러므로 사용하지 않는다.

//         let browser = await puppeteer.launch({headless : false, args:['--window-size=1920,1080', '--disable-notifications']});
//         let page = await browser.newPage();
//         await page.setViewport({
//             width : 1080,
//             height : 1080
//         });
//         await page.goto('https://spys.one/free-proxy-list/KR/');
//         const proxies = await page.evaluate(()=>{
//             const ips = Array.from(document.querySelectorAll('tr > td:first-of-type > .spy14')).map((v)=>v.textContent.replace(/document\.write\(.+\)/, ''));
//             const types = Array.from(document.querySelectorAll('tr > td:nth-of-type(2)')).slice(5).map((v)=>v.textContent);
//             const latencies = Array.from(document.querySelectorAll('tr > td:nth-of-type(6) .spy1')).map((v)=>v.textContent);

//             return ips.map((v, i)=>{
//                 return {
//                     ip:v,
//                     type : types[i],
//                     latency : latencies[i]
//                 }
//             });
//         });

//         const filtered = proxies.filter((v)=>v.type.startsWith('HTTP')).sort((p, c) => p.latency - c.latency);
//         console.log(filtered);

//         await page.close();
//         await browser.close();

//         //2. 가장 빠른 프록시의 ip로 우회한다.
//         //프록시를 통해 접속하려면 puppeteer.launch 함수의 args매개변수에 --proxy-server={ip} 를 추가해야한다.
//         //실제로 해보니 HTTPS, HTTP (Squid)에서는 제대로 작동하지 않으므로 HTTP만 사용해야 한다.
//         browser = await puppeteer.launch({
//             headless : false, 
//             args:['--window-size=1920,1080', '--disable-notifications', `--proxy-server=${filtered[3].ip}`],
//         });
//         page = await browser.newPage();
//         await page.goto('https://www.naver.com/');

//     }catch(e){
//         console.error(e);
//     }
// };

// crawler();

//==================================================================================//
//6-3 데이터베이스 연동하기
//해당 강의에서는 사용할 수 있는 무료 프록시 목록을 데이터베이스에 저장하기위해 쓰인다.
//1. sequlize, sequelize-cli 모듈 설치
// - node.js에서 DB를 연동하기 위해 사용하는 모듈이다. (많이 사용된다.)
// - sequelize-cli는 global로 설치되어야 한다. (npm i -g sequelize-cli)
//2. MySQL에서 table을 생성한다. (create new schema... 메뉴 선택)
//3. 프로젝트 폴더에서 sequeilze init 명령어를 실행한다.
// - config, migrations, models, seeders 폴더가 프로젝트에 생성된다.
//4. config/config.json의 모든 database과 password를 수정한다.
/*
    "password": 12345,
    "database": "node-crawler",
*/
//5. models/index.js 파일 내용을 간단하게 변경한다.
// - 해당 파일이 DB를 연결하는 부분이다.
//6. models/proxy.js 파일을 생성하여 table을 만드는 코드를 작성한다.

//!! 해당 예제를 실행할 때 config에 비밀번호를 입력해야 한다.

const puppeteer = require('puppeteer');
const dotenv = require('dotenv');

const db = require('./models');
dotenv.config(); //.env파일에 작성한 환경변수를 불러와 process.env 에 구성한다.

const crawler = async ()=>{

    //7. DB 연결
    await db.sequelize.sync();

    try{

    }catch(e){
        console.error(e);
    }
};

crawler();
//==================================================================================//
