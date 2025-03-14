#!/usr/bin/env node
const readline=require('readline');

const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout,
});

console.clear();
const answerCallback=(answer)=>{
    if(answer==='y'){
        console.log('goodgood');
        rl.close();
    }else if(answer==='n'){
        console.log('힝..');
        rl.close();
    }else{
        console.log('y또는 n만 입력');
        rl.question('재밌냐 (y/n)',answerCallback);
    }
};
rl.question('재밌냐 (y/n)',answerCallback);