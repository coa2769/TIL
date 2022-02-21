const express = require('express');
const path = require('path');

const app = express();

app.set('port', process.env.PORT || 3000);
//(req, res, next)=>{}를 매개변수로 입력 받는다.
app.use((req, res, next)=>{
    console.log('모든 요청에 다 실행됩니다.');
    next(); //이게 호출되어야 다음 미들웨어로 넘어간다.
});

app.get('/', (req, res, next)=>{
    console.log('GET / 요청에서만 실행됩니다.');
    next(); //이게 호출되어야 다음 미들웨어로 넘어간다.
},(req, res)=>{
    throw new Error('에러는 에러 처리 미들웨어로 갑니다.');
});

//에러 처리 미들웨어
app.use((err, req, res, next)=>{
    console.error(err);
    res.status(500).send(err.message);
});

app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 대기 중');
});
