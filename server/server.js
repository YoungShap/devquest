const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const projectRoutes = require('./routes/projects')


//express app
const app = express()

app.use(cors({
    origin:true,
    credentials:true,
    methods:'GET,PUT,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
}))

//Mongo connection 
mongoose.connect(
    'mongodb://127.0.0.1:27017/devquest'
  )
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err))


  const projectSchema = new mongoose.Schema({
    name: String,
    techId:Number,
    imgSrc:String,
  });


// Create a mongoose model based on the schema
const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);


// GET request to retrieve all projects
app.get("/projects", async (req, res) => {
    try {
      const projects = await Project.find({}) // Find all books
      res.status(200).send(projects); // Send the array of books as response
    } catch (error) {
      console.error(error); // Log the error
      res.status(500).send("Error retrieving projects")
    }
  })

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