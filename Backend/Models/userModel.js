const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
     email:{
        type:String,
        required:true,
        unique:true
    },
     password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s'
    }

},{timeStamps:true})


userSchema.pre('save', async function(){
    this.password = await bcrypt.hash(this.password,12)
})

userSchema.methods.comparePassword = async function(candidatePassword,userPassword){
    return await bcrypt.compare(userPassword,candidatePassword)
}


const User = mongoose.model('User',userSchema)

module.exports = User

