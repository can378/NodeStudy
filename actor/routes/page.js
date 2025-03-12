const express=require('express');
const router=express.Router();
const{renderJoin,renderMain,renderProfile}=require('../controllers/page');


router.use((req,res,next)=>{
    res.locals.user=null;
    res.locals.follwerCount=0;
    res.locals.followingCount=0;
    res.locals.followingIdList=[];
    next();
})

router.get('/profile',renderProfile);
router.get('/join',renderProfile);
router.get('/',renderMain);

module.exports=router;