const fs=require('fs');
console.log('before: ',process.memoryUsage().rss);

const readStream=fs.createReadStream('./big.txt');
const writeStream=fs.createWriteStream('./big3.txt');
readStream.pipe(writeStream);
readStream.on('end',()=>{
    console.log('stream: ',process.memoryUsage().rss);
})


// fs.writeFileSync('./big2.txt',data1);
// console.log('buffer',process.memoryUsage().rss);