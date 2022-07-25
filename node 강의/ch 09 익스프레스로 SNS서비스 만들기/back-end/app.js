//사용하는 모듈 가져오기
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const passport = require('passport');

//dotenc 패키지로 .env에 작성된 환경변수 process.env에 넣는다.
dotenv.config();
//라우터들 추가
const pageRouter = require('./routes/page'); 
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
//여러 설정들 가져오기
const { sequelize } = require('./models');
const passportConfig = require('./passport');

const app = express(); //express 인스턴스 생성

passportConfig(); //패스포트 설정

app.set('port', process.env.PORT || 8001); //port 설정
app.set('view engine', 'html'); //(?)
nunjucks.configure('views', { //넌적스 사용....(?)
  express : app,
  watch : true,
});

//DB 연결
sequelize.sync({ force : false })
  .then(()=>{
    console.log('데이터베이스 연결 성공');
  })
  .catch((err)=>{
    console.error(err);
  });

//미들웨어 등록
app.use(morgan('dev')); //?
app.use(express.static(path.join(__dirname, 'public'))); //static 페이지 폴더 등록
app.use('/img', express.static(path.join(__dirname, 'uploads'))); //'/img'라우터 와 uploads폴더를 express.static으로 연결
app.use(express.json());
app.use(express.urlencoded({ extended : false })); //?
app.use(cookieParser(process.env.COOKIE_SECRET)); //cookie설정인듯 ?
app.use(session({
  resave : false,
  saveUninitialized : false,
  secret : process.env.COOKIE_SECRET,
  cookie : {
    httpOnly : true,
    secure : false,
  },
}));

//passport 초기화 후 연결
app.use(passport.initialize());
app.use(passport.session());

app.use('/', pageRouter); //페이지 라우터 미들웨어 추가
app.use('/auth', authRouter); //로그인 라우터 미들웨어 추가
app.use('/post', postRouter);//포스트 라우터 미들웨어 추가
app.use('/user', userRouter);//유저 라우터 미들웨어 추가
app.use((req, res, next)=>{
  const error = new Error(`${req.method} ${req.url}라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

//서버 구동
app.listen(app.get('port'), ()=>{
  console.log(app.get('port'), '번 포트에서 대기 중');
});