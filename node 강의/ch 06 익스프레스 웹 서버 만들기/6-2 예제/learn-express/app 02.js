const express = require('express');
const path = require('path');

//.env를 읽어 설정 객체를 만든다.
const dotenv = require('dotenv');
dotenv.config();

//express 생성 후 포트 설정
const app = express();
app.set('port', process.env.PORT || 3000);

//(req, res, next)=>{}가 패키지의 내부에 있으므로 선언하지 않아도 된다.
//morgan 추가
const morgan = require('morgan');
// app.use(morgan('dev'));
app.use((req, res, next)=>{
    if(process.env.NODE_ENV === 'production'){
        morgan('combined')(req, res, next);
    }else{
        morgan('dev')(req, res, next);
    }
});

//body-parser 추가
app.use(express.json());
app.use(express.urlencoded({ extended : false }));

//raw와 text를 다루기 위해서는 body-parser 설치가 필요하다.
const bodyParser = require('body-parser');
app.use(bodyParser.raw());
app.use(bodyParser.text());

//cookie-parser 추가
//비밀키를 추가 하고 싶다면 app.use(cookieParser(비밀키)) 이렇게
const cookieParser = require('cookie-parser');
// app.use(cookieParser());
app.use(cookieParser(process.env.COOKIE_SECRET));

//express-session 추가
const session = require('express-session');
app.use(session({
    resave : false,
    saveUninitialized : false,
    secret : process.env.COOKIE_SECRET,
    cookie : {
        httpOnly : true,
        secure : false,
    },
    name : 'sesstion-cookie-pys',
}));

//expres 내부의 static 추가
// app.use('/', express.static(path.join(__dirname, 'public')));

//한번에 선언도 가능하다.

// app.use(
//     morgan('dev'),
//     express.static('/', path.join(__dirname, 'public')),
//     express.json(),
//     express.urlencoded({extended : false}),
//     cookieParser(process.env.COOKIE_SECRET),
// );

//======================================================================================//
//직접 만든 미들웨어 (req, res, next)=>{}
app.use((req, res, next)=>{
    console.log('모든 요청에 다 실행됩니다.');
    req.data = '받은 데이터'; //데이터 넣기
    next();
});

app.get('/', (req, res, next)=>{
    console.log('GET / 요청에서만 실행됩니다.');
    
    console.log(req.data); //데이터 받기

    //쿠키 추가
    res.cookie('name', 'pys', {
        expires : new Date(Date.now() + 900000),
        httpOnly : true,
        // secure : true,
        secure : false,
    });

    //섹션 추가
    req.session.name = 'secedddd'; //섹션 쿠키의 값을 변경한다.
    console.log('섹션 아이디 : ', req.sessionID);

    next(); //이게 호출되어야 다음 미들웨어로 넘어간다.
},(req, res)=>{

    throw new Error('에러는 에러 처리 미들웨어로 갑니다.');
});

//에러 처리 미들웨어
app.use((err, req, res, next)=>{
    console.error(err);
    //쿠키 삭제
    // res.clearCookie('name', 'pys', {httpOnly : true, secure : false });

    //섹션 전체 삭제
    // req.session.destroy();

    res.status(500).send(err.message);
});

app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 대기 중');
});

