const dotenv=require('dotenv');//최대한 위에 쓰기 dotenv
dotenv.config();


const { error } = require('console');
const express = require('express');
const path = require('path');

const app = express();


const morgan=require('morgan');
const cookieParser=require('cookie-parser');
const session=require('express-session');//개인의 저장공간생성
//dotenv=비밀키 관리. node조절, 값들 조절절

//port를 3000으로 설정(전역변수 같이)
app.set('port', process.env.PORT || 3000); 

app.use(morgan('dev'));//개발때 요청 이런게 찍히는용용
//app.use('/',express.static(__dirname,'public')); //midleware순서가 성능에도 영향을 준다.
app.use(morgan('combined'));//배포때때
//app.use(cookieParser('cookieKey'));//쿠키를 서명하는 비밀키(사인 같은것)
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave:false,
  saveUninitialized:false,
  secret:process.env.COOKIE_SECRET,//비밀키
  cookie:{
    httpOnly:true,
  },
}));


const multer=require('multer');//multer함술ㄹ 호출하면 4가지의 middleqare가 들어있다
//upload- snigle, storage, limits
const fs=require('fs');

//midleware 호ㅘㄱ장
app.use('/',(req,res,next)=>{
  if(req.session.id){
    express.static(__dirname,'./public')(req,res,next)
  }else{
    next();
  }
  
})
app.use(express.json());//json data를 body로 넣어줌줌
app.use(express.urlencoded({extended:true}));//form을 parsing해준다.

app.use((req,res,next)=>{
  req.data='cookiekey';
})

app.get('/',(req,res,next)=>{
  req.data;
  res.sendFile(path.join(__dirname,'index.html'));
})

//모든 요청에 실행할 공통적인 부분
app.use((req,res,next)=>{
  console.log('모든 요청에서 공통 실행할 코드');
  next();//다음 거로 넘어가게 해줌
},(req,res,next)=>{
  console.log('모든 요청에서 공통 실행할 코드2');
  next();
})






//get, post, listen등을 나눠서 처리 가능

//위에서 아래로 실행되기 때문에 next안해주면 하나만 중복되는 하나만 실행됨
app.get('/', (req, res,next) => {
  req.cookies;
  req.signedCookies;//cookieKEy로 서명
  res.cookie('name',encodeURIComponent(name),{
    expires:new Date(),
    httpOnly:true,
    path:'/',
  })
  res.clearCookie('name',encodeURIComponent(name),{
    httpOnly:true,
    path:'/',
  })
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/category/:name',(req,res)=>{
  res.send('hello wildcard');
});

app.get('/category/Javascript',(req,res)=>{
  res.send('hello javascript');
});




app.post('/',(req,res)=>{
  res.send('hello');
});


//404처리 midleware
app.use((req,res,next)=>{
  res.statusMessage(404).send('404');
  //해커들이 힌트얻는것을을 막기 위해서 404로 퉁치거나 200으로만 하기도함함
});

//error midleware.
//모든 error를 처리한다.
//err midleware는 4개여야한다.
app.use((err,req,res,next)=>{
  console.log(err);
})

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});


//+) router하나에서 send여러번하면 에러뜬다. re.sendFile, res.send, res.json등..
//요청하나에는 응답 하나만 보내라. 응답보내고 res.writeHead()하면 안된다.
//res.json한 다음에 console.log()찍으려면 실행이 안된다. json은 return하지 않는다.
//res.render()응답 보내는거
//try{}catch(error){next(error);}//바로 error 처리 middleware로 넘어간다.
//next('route')는 다음 실행이 아니라 그냥 너어간다.

