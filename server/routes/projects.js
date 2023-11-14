const express = require('express');

const router = express.Router();

// GET all projects
router.get('/', (req, res) => {
    res.json({ msg: 'GET all projects' })
})

// GET all projects
// router.get('/tech/:id', (req, res) => {
//     res.json({ msg: 'GET all projects' })
// })

// GET a single project
router.get('/:id', (req, res) => {
    res.json({ msg: 'GET a single project' })
})
//POST a new project
router.post('/', (req, res) => {
    res.json({ msg: 'POST a new project' })
})

//DELETE a project
router.delete('/:id', (req, res) => {
    res.json({ msg: 'DELETE a project' })
})

//UPDATE/PUT projects
router.put('/:id', (req, res) => {
    res.json({ msg: 'UPDATE a project' })
})

module.exports = router 