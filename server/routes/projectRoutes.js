const express = require('express');
const Project = require('../models/project');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const authGuard = require('../authentication/auth-guard');
const adminGuard = require('../authentication/adminGuard');
const { ProjectSchema } = require('../config');

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

        const { name, category, dev, ghub, uploadBy } = req.body;
        const imgSrc = req.file ? req.file.filename : '../uploads/imgSrc-1702476581922.png';

        // if (!imgSrc) {
        //     return res.status(403).send('No image provided');
        // }
        const schema = ProjectSchema.validate(req.body, { allowUnknown: true });

        if (schema.error) {
            return res.status(403).send(schema.error.details[0].message);
        } 

        const newProject = new Project({
            name,
            category, 
            dev,
            homePage: false,
            ghub,
            imgSrc,
            uploadBy,
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

//EDIT a project
router.put('/projects/:id', upload.single('imgSrc'), authGuard, async (req, res) => {
    try {
        const { name, category, dev, ghub } = req.body;

        const imgSrc = req.file ? req.file.filename : undefined;

        const project = await Project.findOne({ _id: req.params.id });

        if (!project) {
            return res.status(404).send("Project not found!");
        }

        // Update project properties
        project.name = name;
        project.category = category;
        project.dev = dev;
        project.ghub = ghub;

        if (imgSrc) {
            project.imgSrc = imgSrc;
        }

        await project.save();

        res.json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/projects/:id', authGuard, async (req, res) => {
    res.send(await Project.findOne({ _id: req.params.id }));
});

router.put('/projects/toggleHome/:id', adminGuard, async (req, res) => {
    try {
        // Fetch the project by ID
        const project = await Project.findOne({ _id: req.params.id });

        // Toggle the homePage value
        project.homePage = !project.homePage;

        // Save the updated project
        await project.save();

        res.status(200).json({ success: true, message: 'Toggle successful', project });
    } catch (error) {
        console.error('Toggle failed:', error);
        res.status(500).json({ success: false, message: 'Toggle failed' });
    }
});

module.exports = router  