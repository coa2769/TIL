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
const xlsx = require('xlsx');
const axios = require('axios'); //가장 많이 쓰이는 ajax 라이브러리
const cheerio = require('cheerio'); //html 파싱
const add_to_sheet = require('./add_to_sheet');

const workbook = xlsx.readFile('xlsx/data.xlsx');

const ws = workbook.Sheets.영화목록;

const records = xlsx.utils.sheet_to_json(ws);
console.log(records); //배열

for(const [i, r] of records.entries()){
    console.log(i, r.제목, r.링크);
}

const crawler = async ()=>{

    //아래 Promise.all은 xlsx에 작성된 순서가 보장되지 않고 응답온 순서로 응답이 온다.

    //콜백이기 때문에 모든 요청을 한번에 보내버린다. 
    // await Promise.all(records.map(async(r)=>{
    //     const response = await axios.get(r.링크);
    //     if(response.status === 200){ //응답이 성공한 경우
    //         const html = response.data;
    //         const $ = cheerio.load(html);
    //         const text = $('.score.score_left .star_score').text();
    //         console.log(r.제목, '평점', text.trim());
    //     }
    // }));

    add_to_sheet(ws, 'C1', 's', '평점'); //C1 셀에 문자열 '평점'추가

    //보낸 요청에 응답이 올때 까지 기다린다.
    for(const [i, r] of records.entries()){
        const response = await axios.get(r.링크);
        if(response.status === 200){ //응답이 성공한 경우

            //html 가져옴
            const html = response.data;
            //html문서를 파싱해서 필요한 정보 가져옴
            const $ = cheerio.load(html);
            const text = $('.score.score_left .star_score').text();//textContent이기 때문에 tag는 무시하고 문자만 가져온다.
            console.log(r.제목, '평점', text.trim());

            //sheet에 평점 내용 추가
            const newCell = 'C' + (i+2);
            add_to_sheet(ws, newCell, 'n', parseFloat(text.trim()));
        }
    }

    //수정한 workbook 저장
    xlsx.writeFile(workbook, 'xlsx/result.xlsx')
};

crawler();
//간단한 페이지는 axios와 cheerio로 크롤링이 가능하다.
//==================================================================================//
