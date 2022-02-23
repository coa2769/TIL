const express = require('express');

const router = express.Router();

//라우터에 연결된 미들웨어
router.get('/', function(req, res, next){
    next('route');
    // next();
}, function(req, res, next){
    console.log('실행되지 않습니다.');
    next();
}, function(req, res, next){
    console.log('실행되지 않습니다.');
    next();
});

//GET / 라우터
router.get('/', (req, res)=>{
    console.log('실행됩니다.');
    res.send('Hello, Express');
});


module.exports = router;