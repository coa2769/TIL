const http2 = require('https');
const fs = require('fs');
//SSL암오화 + http/2를 사용
//http/2는 기존보다 개선된 요청을 보내어 속도 개선이 된다.
http2.createSecureServer({
    cert: fs.readFileSync('도메인 인증서 경로'),
    key : fs.readFileSync('도메인 비밀키 경로'),
    ca : [
        fs.readFileSync('상위 인증서 경로'),
        fs.readFileSync('상위 인증서 경로'),
    ],
}, (req, res)=>{
    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server!</p>');
})
.listen(443, ()=>{
    console.log('443번 포트에서 서버 대기 중 입니다!');
});