const express = require('express');
const path = require('path');

const app = express();

//process.env에 PORT속성이 있다면 그 값을 사용하고 없다면 3000 포트 사용
//app.set(키, 값)을 사용해서 데이터를 저장할 수 있다.
app.set('port', process.env.PORT || 3000);

//app.get(주소, 라우터) : '주소'에 대한 GET 요청이 올 때 어떤 동작을 할지 callback에 적는다.
app.get('/', (req, res)=>{
    //res.send() : 응답 내용 전송
    // res.send('Hello, Express');
    res.sendFile(path.join(__dirname, '/index.html'));
});

//서버 시작
app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 대기 중');
});