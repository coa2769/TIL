const fs = require('fs').promises;

console.log('시작');
fs.readFile('./02 readme2.txt')
.then((data)=>{
    console.log('1번', data.toString());
    return fs.readFile('./02 readme2.txt');
})
.then((data)=>{
    console.log('2번', data.toString());
    return fs.readFile('./02 readme2.txt');
})
.then((data)=>{
    console.log('3번', data.toString());
    return fs.readFile('끝');
})
.catch((err)=>{
    console.error(err);
});
//asyncOrder.js에 promise를 적용한 예제