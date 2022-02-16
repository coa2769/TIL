//big.txt를 big2.txt로 복사
//readFile과 writeFile을 이용한 복사
const fs = require('fs');
//함수 호출 전 사용하는 메모리
console.log('before : ', process.memoryUsage().rss);

const data1 = fs.readFileSync('./big.txt');
fs.writeFileSync('./big2.txt', data1);
//함수 호출 후 사용하는 메모리
console.log('buffer: ', process.memoryUsage().rss);
