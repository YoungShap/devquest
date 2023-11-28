const express = require('express');
const Project = require('../models/project');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const authGuard = require('../authentication/auth-guard');

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
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage });

router.post('/projects/add', upload.single('imgSrc'), authGuard, async (req, res) => {
    try {
        // authGuard middleware can now access req.body and req.file

        const { name, category, dev, favorite, ghub, ownerId } = req.body;
        const imgSrc = req.file.filename;
        
        const newProject = new Project({
            name,
            category,
            dev,
            favorite,
            ghub,
            imgSrc,
            ownerId,
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


//DELETE a project
router.delete('/projects/:id', authGuard, async (req, res) => {
    try {
        await Project.deleteOne({ _id: req.params.id });
        res.send();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// // GET a single project
// router.get('/:id', (req, res) => {
//     res.json({ msg: 'GET a single project' })
// }) 


// //UPDATE/PUT projects
// router.put('/:id', (req, res) => {
//     res.json({ msg: 'UPDATE a project' })
// })

module.exports = router 