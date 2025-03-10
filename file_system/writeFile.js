const fs=require('fs').promises;//fs가 promise를 지원한다.

fs.writeFile('./writeme.txt','얌마')
.then(()=>{
    return fs.readFile('./writeme.txt');
})
.then((data)=>{
    console.log(data.toString());
})
.catch((err)=>{
    throw err;
});