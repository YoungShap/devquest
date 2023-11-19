const express = require('express')
const path = require('path');
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const projectRoutes = require('./routes/projectRoutes')


//express app
const app = express()

app.use(cors({
    origin: true,
    credentials: true,
    methods: 'GET,PUT,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
}))

//Mongo connection 
mongoose.connect(
    'mongodb://127.0.0.1:27017/devquest'
)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.error("MongoDB connection error:", err))

//middleware
app.use(express.json())


//routes
app.use('/', projectRoutes)
app.use('/serverAssets', express.static(path.join(__dirname, 'public/serverAssets')))

//listen for requests
app.listen(process.env.PORT, () => {
    console.log('listening on port 4000!')
})