const fs = require('fs');

fs.watch('./target.txt', (eventType, filename)=>{
    console.log(eventType, filename);
});
//target.txt의 내용물을 수정, 또는 파일명 변경, 파일 삭제를 하면 반응이 온다.