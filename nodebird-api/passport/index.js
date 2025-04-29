const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const { User } = require('../models');

//login, session 관리 middleware

module.exports = () => {

  //session에 user id 저장
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  //session에서 user복원
  passport.deserializeUser((id, done) => {
    User.findOne({
      where: { id },
      include: [{//follwer 정보 가져오기 (id,nickname만)
        model: User,
        attributes: ['id', 'nick'],
        as: 'Followers',
      }, {//following 정보 가져오기
        model: User,
        attributes: ['id', 'nick'],
        as: 'Followings',
      }],
    })
      .then(user => done(null, user))
      .catch(err => done(err));
  });

  //비번 확인
  local();
  //카카오 로그인
  kakao();
};
