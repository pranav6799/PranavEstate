const errorHandler = require('../utils/error')
const JWT = require('jsonwebtoken')

const veryifyToken = (req,resp,next)=>{
    const token = req.cookies.token
    console.log(token)

    if(!token){

    return next(errorHandler(401,'Unathorized'))
    }

    JWT.verify(token,process.env.SECRET_KEY,(err,user)=>{
        if(err){
            return next(errorHandler(404,'Forbidden'))
        }

        req.user = user
        next()
    }) 
}

module.exports = veryifyToken