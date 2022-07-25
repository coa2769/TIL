const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');
module.exports = ()=>{

  passport.use(new LocalStrategy({
    //usernameField, passwordField는 로그인 라우터의 req.body에 든 속성명을 적는다.
    usernameField : 'email',
    passwordField : 'password',
  }, async (email, password, done)=>{

    //done함수는 passport.authenticate의 콜백 함수를 호출.
    //done함수에 대입하는 인수들이 passport.authenticate함수의 callback에서 사용된다.

    try{
      //email로 사용자 정보 찾기
      const exUser = await User.findOne({ where : { email } });

      //사용자 정보가 있다.
      if(exUser){
        //요청으로 온 비밀번호를 암호화하여 DB에 저장된 암호화된 비밀번호와 같은지 비교.
        const result = await bcrypt.compare(password, exUser.password);


        if(result){
          //사용자 정보를 넣는다.
          done(null, exUser);
        }else{
          //에러 이유는 적는다.
          done(null, false, { message : '비밀번호가 일치하지 않습니다.' });
        }
      }
      //사용자 정보가 없다.
      else {
        //에러 이유는 적는다.
        done(null, false, { message : '가입되지 않은 회원입니다.' });
      }

    }catch(error){
      console.error(error);
      done(error);
    }
  }));
}