//fs 모듈
//파일 생성 & 삭제 & 읽기 & 쓰기 가 가능
//폴더 삭제 & 생성 가능

const fs = require('fs');

fs.readFile('./readme.txt', (err, data)=>{
    if(err){
        throw err;
    }
    console.log(data);
    console.log(data.toString());
});