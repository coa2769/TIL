const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/user');

const router = express.Router();
//회원가입 라우터
router.post('/join', isNotLoggedIn, async (req, res, next)=>{
  const { email, nick, password } = req.body;

  try {
    //해당 이메일로 기존에 회원가입 한 적이 있는가?
    const exUser = await User.findOne({where : {email}});

    //있다면 Error
    if(exUser){
      //에러를 쿼리스트링으로 표시
      return res.redirect('/join?error=exist');
    }

    //회원가입 하지 않았다면
    //전달된 이메일 암호화
    const hash = await bcrypt.hash(password, 12);
    //DB에 사용자 생성
    await User.create({
      email,
      nick,
      password : hash,
    });
    //'/'라우터로 리다이렉트
    return res.redirect('/');

  } catch(error) {
    console.error(error);
    return next(error);
  }
});

//로그인 라우터
router.post('/login', isNotLoggedIn, (req, res, next)=>{
  //해당 미들웨어가 로컬 로그인 전략을 수행한다.
  //로그인 전략 실행 후 등록된 callback 호출
  passport.authenticate('local', (authError, user, info)=>{

    //authError에 값이 있다면 로그인 실패
    if(authError){
      console.error(authError);
      return next(authError);
    }

    //user값이 없다면 로그인 실패
    if(!user){
      return res.redirect(`/?loginError=${info.message}`);
    }

    //user값이 있으면 로그인 성공
    //passport가 추가한  login함수 호출
    //req.login은 passport.serializeUser를 호출한다.
    return req.login(user, (loginError)=>{
      if(loginError){
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect('/');
    });

  })(req, res, next); //미들웨어 내의 미들웨어에는 (req, res, next)를 붙은다.
});

//로그아웃 라우터
router.get('/logout', isLoggedIn, (req, res)=>{
  //req.logout메서드로 req.user 객체 제거
  //0.6.0버전 이후 req.logout함수는 비동기가 되었다.
  req.logout((err)=>{
    //req.session.destroy메서드로 seq.session 객체의 내용 제거
    req.session.destroy();
    //이후 메인 페이지로 되돌아간다.
    res.redirect('/');
  });

});

//카카오 로그인 과정 시작.
router.get('/kakao', passport.authenticate('kakao'));

//로그인 성공 여부 판별
router.get('/kakao/callback', passport.authenticate('kakao', {
  failureRedirect : '/', //실패시 어디로 이동할지
}), (req, res)=>{ //성공 시 다음 실행될 미들웨어
  res.redirect('/');
});

module.exports = router;