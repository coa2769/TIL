const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Post, Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');
const router = express.Router();

try{
  fs.readdirSync('uploads');
}catch(error){
  console.error('uploads폴더가 없어 uploads폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage : multer.diskStorage({
    destination(req, file, cb){
      cb(null, 'uploads/');
    },
    filename(req, file, cb){
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits : { fileSize : 5 * 1024 * 1024 },
});

//라우터는 이미지 하나를 업로드받은 뒤 이미지의 저장 경로를 클라이언트로 응답.
router.post('/img', isLoggedIn, upload.single('img'), (req, res)=>{
  console.log(req.file);
  res.json({ url : `/img/${req.file.filename}` });
});

const upload2 = multer();
//게시글 업로드를 처리하는 라우터
router.post('/', isLoggedIn, upload2.none(), async (req, res, next)=>{
  try{
    const post = await Post.create({
      content : req.body.content,
      img : req.body.url, //
      UserId : req.user.id,
    });
    //게시글 내용에서 해시캐그 추출
    const hashtags = req.body.content.match(/#[^\s#]+/g);

    //추출한 해시캐그 데이터베이스 저장
    if(hashtags){
      const result = await Promise.all(
        hashtags.map(tag => {
          //DB의 Hashtag 테이블에 저장(findOrCreate : 존재하면 가져오고 없으면 생성함)
          return Hashtag.findOrCreate({
            //'#'를 해시태그에서 제거
            where : { title : tag.slice(1).toLowerCase() },
          })
        }), 
      );

      //해시캐그와 게시글을 연결.
      //결과 값이 [모델, 생성 여부]이므로 r[0]으로 모델만 추출
      await post.addHashtags(result.map( r => r[0]));
    }

    res.redirect('/');

  } catch(error){
    console.error(error);
    next(error);
  }
});

module.exports = router;