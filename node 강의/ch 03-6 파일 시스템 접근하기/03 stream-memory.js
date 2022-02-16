const fs = require('fs');

//함수 호출 전 사용하는 메모리
console.log('befor: ', process.memoryUsage().rss);

const readStream = fs.createReadStream('./big.txt');
const writeSream = fs.createWriteStream('./big3.txt');
readStream.pipe(writeSream);

//함수 호출 후 사용하는 메모리
readStream.on('end', ()=>{
    console.log('stream', process.memoryUsage().rss);
});