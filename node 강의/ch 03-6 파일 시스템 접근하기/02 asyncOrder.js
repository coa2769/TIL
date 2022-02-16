const fs = require('fs');

//비동기 방식으로 하되 순서를 유지하고 싶을 때 이렇게 한다.
console.log('시작');
fs.readFile('./02 readme2.txt', (err, data)=>{
    if(err){
        throw err;
    }
    console.log('1번', data.toString());

    fs.readFile('./02 readme2.txt', (err, data)=>{
        if(err){
            throw err;
        }
        console.log('2번', data.toString());

        fs.readFile('./02 readme2.txt', (err, data)=>{
            if(err){
                throw err;
            }
            console.log('3번', data.toString());
            console.log('끝');
        });
    });
});
//콜백 지옥이 펼쳐진다.
//이런 콜백 지옥은 Promise나 async/await으로 어느 정도 해결할 수 있다.