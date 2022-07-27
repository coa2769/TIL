const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Post, User, Hashtag } = require("../models");


const router = express.Router();

//라우터용 미들웨어를 생성
router.use((req, res, next)=>{
  //템플릿 엔진에서 사용할 변수 등록.
  res.locals.user = req.user;
  res.locals.followerCount = req.user ? req.user.Followers.length : 0;
  // res.locals.followerIdList = req.user ? req.user.Followers.map(f => f.id) : [];
  res.locals.followingCount = req.user ? req.user.Followings.length : 0;
  res.locals.followingIdList = req.user ? req.user.Followings.map(f => f.id) : [];
  next();
});

// url이 '/profile' 일때
router.get('/profile', isLoggedIn, (req, res)=>{
  res.render('profile', { title : '내 정보 - NodeBird' });
});

// url이 '/join' 일때
router.get('/join', isNotLoggedIn, (req, res)=>{
  res.render('join', { title : '회원가입 - NodeBird'});
});

// url이 '/' 일때
router.get('/', async (req, res, next)=>{

  try{
    const posts = await Post.findAll({
      include : {
        model : User,
        attributes : ['id', 'nick'],
      },
      order : [['createdAt', 'DESC']],
    });

    res.render('main', {
      title : 'NodeBird',
      twits : posts,
    });
  }catch(err){
    console.error(err);
    next(err);
  }
});

//해시태그 조회
router.get('/hashtag', async (req, res, next)=>{
  //querystring으로 해시태그 이름을 받는다.
  const query = req.query.hashtag;
  //없다면 '/'페이지로 이동
  if(!query){
    return res.redirect('/');
  }

  try{
    //해당 hashtag 정보를 데이터베이스에서 가져오기
    const hashtag = await Hashtag.findOne({ where : { title : query } });
    //hashtag로 post 검색
    let posts = [];
    if(hashtag){
      posts = await hashtag.getPosts({ include : [{model : User}] });
    }

    //조회돈 post만 출력
    return res.render('main', {
      title : `${query} | NodeBird`,
      twits : posts,
    });

  }catch(error){
    console.error(error);
    return next(error);
  }
});

module.exports = router;