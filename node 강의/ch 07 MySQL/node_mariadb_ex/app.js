import express from "express";
import dotenv from 'dotenv';
import morgan from "morgan";
import { Container } from 'typedi';
// import ejs from 'ejs';

// import path from "path";
// const __dirname = path.resolve();

//service
import commentService from "./services/commentService.js";
import userService from "./services/userServices.js";

//라우터
// import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import commentsRouter from './routes/comments.js';

//.env를 읽어 설정 객체를 만든다.
dotenv.config();

//express 생성 후 포트 설정
const app = express();
app.set('port', process.env.PORT || 3000);

//body 정보를 가져오기 위해 등록
app.use(express.json());

//morgan으로 요청과 응답에 대한 log 출력
app.use((req, res, next)=>{
    if(process.env.NODE_ENV === 'production'){
        morgan('combined')(req, res, next);
    }else{
        morgan('dev')(req, res, next);
    }
});

//static 모듈 사용
// const __dirname = path.resolve();
// app.use('/', express.static(path.join(__dirname, 'public')));

//== 이게 빌드된 vue frotend를 배포해준다. ==
//서버가 읽을 수 있도록 HTML의 위치를 정의
// app.set('views', __dirname + 'public');

//서버가 HTML 랜더링할 때 EJS엔진을 사용하도록 설정
// app.set('view engine', 'ejs');
// app.engine('html', ejs.renderFile);

app.use(express.static('public'));
//==========================================================

//injection (typedi를 사용하기 위한 사전 준비)
Container.set("commentService", new commentService);
Container.set("userService", new userService);

//라우터 등록
// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/comments', commentsRouter);

//에러처리
app.use((req, res, next)=>{
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 대기 중');
});