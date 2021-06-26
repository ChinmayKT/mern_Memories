require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express()
app.use(express.json())
app.use(cors())
const port = process.env.PORT


// import 
const userRoute = require('./routes/userRoute');
const memoryRoute = require('./routes/memoryRoute')

//Routes
app.use('/users', userRoute )
app.use('/api/memories',memoryRoute)

// connect to MongoDB 
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify : false,
    useNewUrlParser : true,
    useUnifiedTopology : true

}, err => {
    if(err){
        console.log("error in db connection", err)
    }else {
        console.log("Database connected")
    }
} )


// 
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}


app.listen(port , (req,res)=>{
    console.log('server is running at port ',port)
})



