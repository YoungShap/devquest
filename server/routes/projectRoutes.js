const express = require('express');
const Project = require("../models/Project");
const router = express.Router();

const app = express()


// GET request to retrieve all projects
router.get("/projects", async (req, res) => {
    try {
        const projects = await Project.find({}) // Find all books
        res.status(200).send(projects); // Send the array of books as response
    } catch (error) {
        console.error(error); // Log the error
        res.status(500).send("Error retrieving projects")
    }
})

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