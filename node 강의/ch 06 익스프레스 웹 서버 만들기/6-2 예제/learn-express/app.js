const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

//.env를 읽어 설정 객체를 만든다.
dotenv.config();

const app = express();

app.set('port', process.env.PORT || 3000);

//(req, res, next)=>{}가 패키지의 내부에 있으므로 선언하지 않아도 된다.
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave : false,
    saveUninitialized : false,
    secret : process.env.COOKIE_SECRET,
    cookie : {
        httpOnly : true,
        secure : false,
    },
    name : 'sesstion-cookie',
}));

//morgan 추가
app.use(morgan('dev'));

app.use((req, res, next)=>{
    console.log('모든 요청에 다 실행됩니다.');
    next();
});

//expres 내부의 static 추가
app.use('/', express.static(path.join(__dirname, 'public')));

//body-parser 추가
app.use(express.json());
app.use(express.urlencoded({ extended : false }));

//raw와 text를 다루기 위해서는 body-parser 설치가 필요하다.
const bodyParser = require('body-parser');
app.use(bodyParser.raw());
app.use(bodyParser.text());

//cookie-parser 추가
// app.use(cookieParser(비밀키))



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

