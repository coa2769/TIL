const multer = require('multer');
const fs = require('fs');
const express = require('express');
const path = require('path');

//.env를 읽어 설정 객체를 만든다.
const dotenv = require('dotenv');
dotenv.config();

//express 생성
const app = express();
app.set('port', process.env.PORT || 3000);

try{
    fs.readdirSync('uploads');
}catch(err){
    console.error('uploads폴더가 없어 uploads폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}

const upload = multer({
    storage : multer.diskStorage({
        destination(req, file, done){
            done(null, 'uploads/');
        },
        filename(req, file, done){
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits : {fileSize : 5 * 1024 * 1024},
});

app.use('/multipart', express.static(path.join(__dirname, 'public/multipart.html')));

//파일을 하나만 업로드 하는 경우 single 미들웨어를 이용한다.
//single함수에는 input tag의 name이 입력된다.
app.post('/upload', upload.single('image'), (req, res)=>{
    console.log(req.file, req.body);
    res.send('ok');
});
//여러 파일을 업로드하는 경우
app.post('/upload2', upload.array('many'), (req, res)=>{
    console.log(req.files, req.body);
    res.send('ok');
});
//파일을 여러개 업로드 하지만 input tag나 form데이터의 키가 다른 경우
app.post('/upload3', upload.fields([{name : 'image1'}, {name : 'image2'}]), (req, res)=>{
    console.log(req.files, req.body);
    res.send('ok');
},);
//파일을 업로드하지 않고도 멀티파트 형식으로 업로드하는 경우
app.post('/upload4', upload.none(), (req, res)=>{
    console.log(req.body);
    res.send('ok');
});

app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 대기 중');
});