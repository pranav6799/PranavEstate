const express = require('express')
const dotenv = require('dotenv').config()
const app = express()
const connectDb = require('./connectDb')
const userRouter = require('./Routes/userRouter')
const cookieParser = require('cookie-parser')
const listingRouter = require('./Routes/listingRoute')
const path = require('path')
const cors = require('cors')
connectDb()

app.use(cors());
app.use(express.json())
app.use(cookieParser())
app.use('/api/user',userRouter)
app.use('/api/listing',listingRouter)

app.use(express.static(path.join(__dirname,'../client/dist')))
app.get('*',(req,resp)=>{
    resp.sendFile(path.join(__dirname,'../client/dist/index.html'))
})

app.listen(8080,()=>{
    console.log('server running on port 8080')
})



app.use((err,req,resp,next) =>{
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'
    resp.status(statusCode).json({
        status:false,
        statusCode,
        message
    })
})
