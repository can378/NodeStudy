const {odd,even} =require('./var.js');
const checkOddOrEven=require('./func.js');

function checkString(str){
    if(str.length%2){
        return odd;
    }else{
        return even;
    }
}

console.log(checkOddOrEven(10));
console.log(checkString('hello'));