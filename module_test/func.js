//둘 다 가져오기
const value=require('./var');
console.log(value);

//각각 저장하기
const {odd,checkOddOrEven}=require('./var');

function checkOddOrEven(number){
    if(number%2){
        return odd;
    }else{
        return even;
    }
}

module.exports= checkOddOrEven;
