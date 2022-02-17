const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

//01====================================================================
const parseCookies = (cookie = '')=>
    cookie
    .split(';') //';'를 기준으로 분해
    .map(v => v.split('=')) //'-'를 기준으로 분해
    .reduce((acc, [k, v])=>{
        //acc : 콜백의 반환값이 누적된다.
        //[k, v] : 처리할 현재 요소.(배열 구조 분해 할당)
        acc[k.trim()] = decodeURIComponent(v);
        return acc;
    }, {});//acc가 객체임을 나타낸다.

    //reduce() => 배열의 각 요소에 대해 주어진 리듀스(매개변수로 주어진 callback함수)를 실행한다.
    //https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
//======================================================================

http.createServer(async (req, res)=>{
    const cookies = parseCookies(req.headers.cookie);
    //02====================================================================
    //주소가 /login으로 시작하는 경우
    if(req.url.startsWith('/login')){
        const { query } = url.parse(req.url); //url중 query를 추출
        const { name } = qs.parse(query); //query 중 name을 추출
        const expires = new Date();
        //쿠키 유효 시간을 현재 시간 + 5분으로 설정
        expires.setMinutes(expires.getMinutes() + 5);
        res.writeHead(302, {
            Location:'/',
            //쿠키에는 한글이 들어가면 안되므로 encodeURIComponent()로 변환하야 한다.
            //줄바꿈도 포함되어 있으면 안된다.
            'Set-Cookie' : `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
        });
        res.end();
    }
    //======================================================================
    //03====================================================================
    //name이라는 쿠키가 있는 경우(리다이렉트된 후 부터 출력되는 화면)
    else if(cookies.name){
        res.writeHead(200, {'Content-Type' : 'text/plain; charset=utf-8'});
        res.end(`${cookies.name}님 안녕하세요`);
    }else{
        try{
            const data = await fs.readFile('./cookie2.html');
            res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
            res.end(data);
        }catch(err){
            res.writeHead(500, {'Content-Type' : 'text/plain; charset=utf-8'});
            res.end(err.message);
        }
    }

    //======================================================================
})
.listen(8084, ()=>{
    console.log('8084번 포트에서 서버 대기 중입니다!');
});