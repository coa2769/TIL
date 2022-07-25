const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

const User = require('../models/user');

module.exports = ()=>{

  passport.use(new KakaoStrategy({
    //clientID : 카카오에 해당 애플리케이션을 등록하고 발급 받는 아이디.
    //callbackURL : 카카오로 부터 인증 결과를 받을 라우터 주소.
    clientID : process.env.KAKAO_ID,
    callbackURL : '/auth/kakao/callback',
  }, async (accessToken, refreshToken, profile, done)=>{

    console.log('kakao profile', profile);

    try{
      //기존에 카카오를 통해 회원가입한 사용자 인지 조회.
      const exUser = await User.findOne({
        where : {snsId : profile.id, provider : 'kakao'},
      });

      //기존에 회원가입한 적이 있음
      if(exUser){
        //전략 종료
        done(null, exUser);
      } 
      //기존에 회원가입한 적이 없음.
      else {
        //카카오 인증 후 받은 profile의 데이터로 유저 생성
        const newUser = await User.create({
          email : profile._json && profile._json.kakao_account_email,
          nick : profile.displayName,
          snsId : profile.id,
          provider : 'kakao',
        });
        done(null, newUser);
      }
    }catch(error){
      console.error(error);
      done(error);
    }
  }));
};