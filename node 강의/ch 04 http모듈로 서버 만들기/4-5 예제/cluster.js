const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

//마스터 프로세스 일때
if(cluster.isMaster){
    console.log(`마스터 프로세스 아이디 : ${process.pid}`);
    //CPU 개수만큼 워커 프로세스를 생산
    for(let i=0; i < numCPUs; i+=1){
        cluster.fork(); 
    }
    //워커가 종료되었을 때
    cluster.on('exit', (worker, code, signal)=>{
        console.log(`${worker.process.pid}번 워커가 종료되었습니다.`);
        console.log('code', code, 'signal', signal);
        //워커 프로세스가 종료되었을 때 새로 생성
        cluster.fork();
    });
} 
//워커 프로세스 일 때
else {
    //워커들이 포트에서 대기
    http.createServer((req, res)=>{
        res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
        res.write('<h1>Hello Node!</h1>');
        res.end('<p>Hello Cluster!</p>');

        //요청이 들어올 때 마다 1초 후에 서버가 종료되도록 함.
        setTimeout(()=>{
            process.exit(1);
        }, 1000);

    }).listen(8086);

    console.log(`${process.pid}번 워커  실행`);
}

//실무에서는 pm2 등의 모듈로 cluster 기능을 사용한다.