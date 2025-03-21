const Room=require('../schemas/room');
const Chat=require('../schemas/chat');

exports.renderMain= async(req,res,next)=>{
    try{
        const rooms=await Room.find({});
        res.render('main',{rooms,title:'GIF chatting'});
    }catch(error){
        console.error(error);
        next(error);
    }
};
exports.renderRoom=(req,res,next)=>{
    res.render('room',{title:'create GIF chatting room'})
};
exports.createRoom=async(req,res,next)=>{
    try{
       const newRoom=await Room.create({
        title:req.body.title,
        mex:req.body.max,
        owner:req.session.color,
        password:req.body.password,
       });
       const io=req.app.get('io');
       io.of('/room').emit('newRoom',newRoom);

       //enter room
       if(req.body.password){
        res.redirect(`/room/${newRoom._id}?password=${req.body.password}`);
       }else{
        res.redirect(`/room/${newRoom._id}`);
       }
    }catch(error){
        console.error(error);
        next(error);
    }
};
exports.enterRoom=async(req,res,next)=>{
    try{
        const room=await Room.findOne({_id:req.params.id});
        if(!room){
            return res.redirect('/?error=no room like that');
        }
        if(room.password && room.password!==req.query.password){
            return res.redirect('/?error=wrong password');
        }
        const io=req.app.get('io');
        const {rooms}=io.of('/chat').adapter;
        if(room.max<=rooms.get(req.params.id)?.size){
            return res.redirect(`/?error=허용 인원 초과`);
        }
        res.render('chat',{title:'enter room',chats:[],user:req.session.color});
    }catch(error){
        console.error(error);
        next(error);
    }
   
};
exports.removeRoom=async(req,res,next)=>{
    try{
        await Room.remove({_id:req.params.id});
        await Chat.remove({room:req.params.id});
        res.send('ok');
    }catch(error){
        console.error(error);
        next(error);
    }
};

