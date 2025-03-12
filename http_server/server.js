const http=require('http');
const fs=require('fs').promises;

const server=http.createServer(async (req,res)=>{
    try{
        res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
        const data=await fs.readFile('./server2.html');
        res.end(data);
    }catch(err){
        console.error(err);
        res.writeHead(200,{'content-type':'text/plain;charset=utf-8'});
        res.end(err.message);
    }
    
}).listen(8080);

server.on('listening',()=>{
    console.log('8080번 포트에서 서버 대기 중입니다');
})

server.on('error',(err)=>{
    console.error(err);
});

//서버 여러개 돌리기 가능
const server1=http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
    res.write('<h1>hello world2</h1>');
    res.write('<p>hello server</p>');
    res.end('<p>hello me</p>');
}).listen(8081);