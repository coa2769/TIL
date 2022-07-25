const express = require('express');

const { isLoggedIn } = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

router.post('/:id/follow', isLoggedIn, async (req, res, next) => {
  try {
    //팔로우할 사용자 데이터베이스 조회
    const user = await User.findOne({ where : { id : req.user.id } });

    if(user){
      //현재 로그인한 사용자와의 관계 정의
      //url의 :id는 req.params.id로 접근 가능하다.
      await user.addFollowing(parseInt(req.params.id, 10));
      res.send('success');
    } else {
      res.status(404).send('no user');
    }

  } catch(error){
    console.error(error);
    next(error);
  }
});

module.exports = router;