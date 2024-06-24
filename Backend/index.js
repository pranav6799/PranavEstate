const express = require('express')
const dotenv = require('dotenv').config()
const app = express()
const connectDb = require('./connectDb')
const userRouter = require('./Routes/userRouter')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const listingRouter = require('./Routes/listingRoute')
const path = require('path')

connectDb()

const allowedOrigins = ['http://localhost:5173', 'https://pranavestate.onrender.com'];

// Middleware setup
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}))
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
