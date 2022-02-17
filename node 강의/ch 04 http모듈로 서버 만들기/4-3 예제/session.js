const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

//(cookie = '') : 매개변수의 default 값을 주는 건가?
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

const session = {};

http.createServer(async (req, res)=>{

    const cookies = parseCookies(req.headers.cookie);

    if(req.url.startsWith('/login')){
        const { query } = url.parse(req.url);
        const { name } = qs.parse(query);
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 5);
        const uniqueInt = Date.now();
        //현재 시간으로 구분하여 정보를 session객체에 저장
        session[uniqueInt] = {
            name,
            expires,
        };
        //섹션을 구분할 수 있는 현재 시간 값을 응답으로 보낸다.
        res.writeHead(302, {
            Location:'/',
            'Set-Cookie' : `session=${uniqueInt}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
        });
        res.end();
    }
    //세션 쿠키가 존재하고, 만료 기간이 지나지 않았다면
    else if(cookies.session && session[cookies.session].expires > new Date()){
        res.writeHead(200, {'Content-Type' : 'text/plain; charset=utf-8'});
        res.end(`${session[cookies.session].name}님 안녕하세요`);
    }else {
        try{
            const data = await fs.readFile('./cookie2.html');
            res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
            res.end(data);
        }catch(err){
            res.writeHead(500, {'Content-Type' : 'text/plain; charset=utf-8'});
            res.end(err.message);
        }
    }

})
.listen(8085, ()=>{
    console.log('8085번 포트에서 서버 대기 중입니다!');
})