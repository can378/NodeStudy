exports.renderProfile=(req,res,next)=>{
    res.render('profile',{title:'my info - NodeBird'});
};
exports.renderJoin=(req,res,next)=>{
    res.render('join',{title:'signup - NodeBird'});
};
exports.renderMain=(req,res,next)=>{
    res.render('main',{
        title:'NodeBird',
        twits:[],
    });
};

//router -> contoller -> service(요청,응답 모른다)