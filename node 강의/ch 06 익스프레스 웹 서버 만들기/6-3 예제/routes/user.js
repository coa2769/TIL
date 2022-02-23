const express = require('express');

const router = express.Router();

//GET /user 라우터
router.get('/', (req, res)=>{
    res.send('Hello, User');
});

//주소는 같지만 다른 메서드를 사용하는 코드를 한 덩어리로
// router.get('/abc', (req, res)=>{
//     res.send("GET /abc");
// });

// router.post('/abc', (req, res)=>{
//     res.send('POST /abc');
// });

router.route('/abc')
.get((req, res)=>{
    res.send('GET /abc');
})
.post((req, res)=>{
    res.send('POST /abc');
});

//===================================================
router.get('/:id',function(req, res){
    console.log(req.params, req.query);
    console.log('얘만 실행됩니다.');
    res.send(`Hello, ${req.params.id} User`);
});

router.get('/like', function(req, res){
    console.log('전혀 실행되지 않습니다.');
    res.send(`My Like`);
});

module.exports  = router;