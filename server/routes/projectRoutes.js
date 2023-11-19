const express = require('express');
const Project = require("../models/Project");
const router = express.Router();

const app = express()


// GET request to retrieve all projects
router.get("/projects", async (req, res) => {
    try {
        const projects = await Project.find({}) // Find all projects
        res.status(200).send(projects); // Send the array of projects as response
    } catch (error) {
        console.error(error); // Log the error
        res.status(500).send("Error retrieving projects")
    }
})

// POST a new project
router.post('/projects/add', async (req, res) => {
    try {
      // Assuming the request body contains necessary project information
      const { name, category, dev, imgSrc, favorite, ghub } = req.body;
  
      // Create a new project instance using the Project model
      const newProject = new Project({
        name,
        category,
        dev,
        imgSrc,
        favorite,
        ghub,
      });
  
      // Save the new project to the database
      const savedProject = await newProject.save();
  
      // Respond with the saved project data
      res.json(savedProject);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// // GET a single project
// router.get('/:id', (req, res) => {
//     res.json({ msg: 'GET a single project' })
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