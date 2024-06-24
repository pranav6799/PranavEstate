const User = require("../Models/userModel");
const errorHandler = require("../utils/error");

exports.updateUser = async(req,resp,next)=>{
    if(req.user.id !==  req.params.id){return next(errorHandler(400,'You can only update your own account'))}
    try {
        const user = await User.findByIdAndUpdate(req.params.id,{
            $set:{
                username:req.body.username,
                password:req.body.password,
                email:req.body.email,
                avatar:req.body.avatar
            }
        },{new:true})
         const {password,...rest} = user._doc

        resp.status(200).json({
            user
        })
        
    } catch (err) {
        next(err)
    }  
}   

exports.deleteUser = async(req,resp,next)=>{
    if(req.user.id !== req.params.id) {return next(errorHandler('You can only delete your own account'))}
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        resp.clearCookie('token')
        resp.status(200).json('User Deleted successfully')
    } catch (err) {
        next(err)
    }
}


exports.signOut = async(req,resp,next)=>{
    try {
        resp.clearCookie('token')
        resp.status(200).json('User SignOut successfully')
    } catch (err) {
        next(err)
    }
}

exports.getUser = async(req,resp,next)=>{
    try{
        const user = await User.findById(req.params.id)
        if(!user){
            return next(errorHandler(404,'User not foound'))
        }
        resp.status(200).json({
            user
        })

    }catch(err){
    next(err)
    }
}