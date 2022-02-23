const express = require('express');
const path = require('path');

//.env를 읽어 설정 객체를 만든다.
const dotenv = require('dotenv');
dotenv.config();

//express 생성
const app = express();
app.set('port', process.env.PORT || 3000);

//router 
const indexRouter = require('./routes');
const userRouter = require('./routes/user');

app.use('/', indexRouter);
app.use('/user', userRouter);

//에러 처리
app.use((req, res, next)=>{
    res.status(404).send('Not Found');
});

app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 대기 중');
});