require('dotenv').config()


const express = require('express')
const cors = require('cors')
const projectRoutes = require('./routes/projects')


//express app
const app = express()

app.use(cors({
    origin:true,
    credentials:true,
    methods:'GET,PUT,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
}))

//middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/projects', projectRoutes)

//listen for requests
app.listen(process.env.PORT, () => {
    console.log('listening on port 4000!')
})