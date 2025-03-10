const fs=require('fs').promises;//fs가 promise를 지원한다.

fs.readFile('./readme.txt')
.then((data)=>{
    console.log(data);
    console.log(data.toString());
})
.catch((err)=>{
    throw err;
});