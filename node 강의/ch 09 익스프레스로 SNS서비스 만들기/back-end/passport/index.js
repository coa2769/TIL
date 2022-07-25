const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports = ()=>{
  //로그인시 실행됨.
  passport.serializeUser((user, done)=>{
    //user : 사용자 정보.
    done(null, user.id);
  });

  //매 요청시 마다 실행됨.
  passport.deserializeUser((id, done)=>{
    //데이터 베이스에서 사용자 정보 조회
    User.findOne({ 
      where : { id }, //session 사용자 정의

      //팔로잉 목록과 팔로워 목록 같이 조회.
      include : [{
        model : User,
        attributes : ['id', 'nick'], //비밀번호가 조회되지 않게 하기 위해서
        as : 'Followers',
      }, {
        model : User,
        attributes : ['id', 'nick'],
        as : 'Followings',
      }],
    })
      //조회한 사용자 정보를 done함수로 넘겨 req.user에 저장되도록 한다.
      .then(user=> done(null, user))
      .catch(err=> done(err));
  });

  local();
  kakao();
};