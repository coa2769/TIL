//const express = require('express');
import express from "express";
//const path = require('path');
import path from "path";

const app = express();

app.set('port', process.env.PORT || 3000);

//morgan으로 요청과 응답에 대한 log 출력
import morgan from "morgan";
app.use((req, res, next)=>{
    if(process.env.NODE_ENV === 'production'){
        morgan('combined')(req, res, next);
    }else{
        morgan('dev')(req, res, next);
    }
});

//static 모듈 사용
app.use('/', express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 대기 중');
});