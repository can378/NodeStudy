const express=require('express');

const router=express.Router();

router.get('/',(req,res)=>{ //GET/user/
    res.send('Hello, Express');
});

module.exports=router;
