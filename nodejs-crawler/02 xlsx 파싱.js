//1-3 xlsx 라이브러리로 xlsx파일 파싱
const xlsx = require('xlsx');

const workbook = xlsx.readFile('xlsx/data.xlsx');

const ws = workbook.Sheets.영화목록;

const records = xlsx.utils.sheet_to_json(ws);
console.log(records);

for(const [i, r] of records.entries()){
    console.log(i, r.제목, r.링크);
}