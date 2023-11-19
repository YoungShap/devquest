const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const app = express();


const projectSchema = new mongoose.Schema({
    name: String,
    techId:Number,
    imgSrc:String,
  });


// Create a mongoose model based on the schema
const Project = mongoose.model('Project', projectSchema);

// GET request to retrieve all projects
app.get("/projects", async (req, res) => {
    try {
      const projects = await Project.find({}); // Find all books
      res.status(200).send(projects); // Send the array of books as response
    } catch (error) {
      console.error(error); // Log the error
      res.status(500).send("Error retrieving projects");
    }
  });

// // GET a single project
// router.get('/:id', (req, res) => {
//     res.json({ msg: 'GET a single project' })
// })
// //POST a new project
// router.post('/', (req, res) => {
//     res.json({ msg: 'POST a new project' })
// })

// //DELETE a project
// router.delete('/:id', (req, res) => {
//     res.json({ msg: 'DELETE a project' })
// })

// //UPDATE/PUT projects
// router.put('/:id', (req, res) => {
//     res.json({ msg: 'UPDATE a project' })
// })

module.exports = router 