const express=require('express');
const cookieParser=require('cookie-parser');
const morgan=require('morgan');
//const path=require('morgan');
const path=require('path');
const session=require('express-session');
const nunjucks=require('nunjucks');
const dotenv=require('dotenv');
const passport=require('./passport');
const {sequelize}=require('./models');

dotenv.config();//process.enve안에 값이 들어갈것

const pageRouter=require('./routes/page');
const passportConfig=require('./passport');
const { watch } = require('fs');
const { nextTick } = require('process');

const app=express();
passportConfig();
app.set('port',process.env.PORT||8001);
app.set('view engine','html');
nunjucks.configure('views',{
    express:app,
    watch:true,
});

sequelize.sync({forcr:false})//개발시에만 사용
    .then(()=>{
        console.log('데이터베이스 연결 성공')
    })
    .catch((err)=>{
        console.error(err);
    })


app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave:false,
    saveUninitalize:false,
    secret:process.env.COOKIE_SECRET,
    cookie:{
        httpOnly:true,
        secure:false,
    }
}));
app.use(passport.initialize());//passport midleware
app.use(passport.session());

app.use('/',pageRouter);
app.use((req,res,next)=>{
    const error=new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status=404;
    next(error);
});

app.use((err,req,res,next)=>{
    res.locals.message=err.message;
    res.locals.error-process.env.NODE_ENV !== 'production'? err:{};
    res.status(err.status||500);
    res.render('error');
})


app.listen(app.get('port'),()=>{
    console.log(app.get('port'),'번 포트에서 대기 중');
});

