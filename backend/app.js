const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const usersPath = require('./routes/userRoute')
const servicesPath = require('./routes/servicesRoute');
const messagePath = require('./routes/messageRoute');
const cors = require('cors')
const cookieParser = require('cookie-parser')
// const uploadPath = require('./routes/uploadRoute')
const path = require("path")
const uploadRoute = require('../backend/routes/uploadRoute')


dotenv.config()





app.use(express.json())
app.use('/Images', express.static(path.join(__dirname, 'Images')));
app.use(express.urlencoded({extended: false}))
app.set('view engine','ejs')
app.use(
    cors({
        origin:"http://localhost:3000",
        credentials: true
    })
)
app.use(cookieParser())



mongoose.
        connect(process.env.MONGO_URL)
        .then(()=> {
            console.log('connection successful');
})


app.use('/api/users', usersPath);
app.use('/api/services', servicesPath);
app.use('/api/messages', messagePath);
// app.use('/api/upload', uploadPath);
app.use('/api/upload', uploadRoute);


app.use("/Images", express.static(path.join(__dirname ,"Images" )))

app.listen(process.env.PORT, ()=> {
    console.log(`server is running at ${process.env.PORT}`)
})