const mongoose = require('mongoose')

const Db = process.env.MONGOURI


const connectDb = async()=>{
try{
    await mongoose.connect(Db).then(()=>{
        console.log('Databse connected')
    })
}catch(err){
    err:err.message
}
}

module.exports = connectDb