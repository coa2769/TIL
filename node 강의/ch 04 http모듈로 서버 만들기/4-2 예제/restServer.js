const http = require('http');
const fs = require('fs').promises;

const users = {}; //데이터 저장용

http.createServer(async(req, res)=>{
    try{
        if(req.method === 'GET'){
            if(req.url === '/'){
                const data = await fs.readFile('./restFront.html');
                res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
                return res.end(data);
            }else if(req.url === '/about'){
                const data = await fs.readFile('./about.html');
                res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
                return res.end(data);
            }else if(req.url === '/users'){
                res.writeHead(200, {'Content-Type' : 'application/json; charset=utf-8'});
                return res.end(JSON.stringify(users));
            }
            // /도 / about도 /users도 아니면
            try{
                const data = await fs.readFile(`./${req.url}`);
                return res.end(data);
            }catch(err){
                //주소에 해당하는 라우트를 못 찾았다는 404 Not Found error 발생
            }
        }else if(req.method === 'POST'){
            if(req.url === '/user'){
                //post의 body를 파일이라고 생각했을 때 해당 파일을 읽는 것을 백그라운드에 위임한다.
                //data -> 조금씩 조금씩 읽어온 파일을 처리할 때 callback호출
                //end -> 파일 읽기가 끝났을 때 callback호출
                //이 이벤트들은 지정한 파일을 다 읽어 올 때 까지 유효하다.
                let body = '';
                //!!goekd 'data', 'end'이벤트는 stream과 연관 있으므로 3장의 파일시스템 내용을 보면 된다.
                //요청의 body를 stream 형식으로 받음(요청에 data가 있을 경우 처리를 위한 )
                req.on('data', (data)=>{
                    console.log('data++');
                    body += data;
                });
                //요청의 body를 다 받은 후 실행됨
                return req.on('end', ()=>{
                    console.log('POST 본문(Body) : ', body);
                    const { name } = JSON.parse(body);
                    const id = Date.now();
                    users[id] = name;
                    res.writeHead(201, { 'Content-Type' : 'text/plain; charset=utf-8'});
                    res.end('ok');
                });
            }
        }else if( req.method === 'PUT'){
            if(req.url.startsWith('/user/')){
                const key = req.url.split('/')[2];
                let body = '';
                req.on('data', (data)=>{
                    body += data;
                });
                
                return req.on('end', ()=>{
                    console.log('PUT 본문(Body) : ', body);
                    users[key] = JSON.parse(body).name;
                    res.writeHead(200, { 'Content-Type' : 'text/plain; charset=utf-8'});
                    return res.end('ok');
                });
            }
        }else if(req.method === 'DELETE'){
            if(req.url.startsWith('/user/')){
                const key = req.url.split('/')[2];
                delete users[key];
                res.writeHead(200, {'Content-Type' : 'text/plain; charset=utf-8'});
                return res.end('ok');
            }
        }
        res.writeHead(404);
        return res.end('NOT FOUND');

    }catch(err){
        console.error(err);
        res.writeHead(500, {'Content-Type' : 'text/plain; charset=utf-8' });
        res.end(err.message);
    }
})
.listen(8080, ()=>{
    console.log('8080번 포트에서 서버 대기 중입니다.');
});