const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const { User } = require('../models');

module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, async (email, password, done) => {
    try {
      const exUser = await User.findOne({ where: { email } });//email기준으로 사용자 검색
      
      if (exUser) {
        //비번 일치 여부 확인
        const result = await bcrypt.compare(password, exUser.password);
        
        if (result) {
          done(null, exUser);
          //done = success,error,fail중에 하나 반환하고 next를 부름.
          //
        } else {
          done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
        }
      } else {
        done(null, false, { message: '가입되지 않은 회원입니다.' });
      }
    } catch (error) {
      console.error(error);
      done(error);
    }

  }));
};
