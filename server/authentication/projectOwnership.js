const Project = require('../models/project');

module.exports = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // Assuming the user ID is stored in req.user.id after authentication
        if (project.owner.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Permission denied. You are not the owner of this project.' });
        }

        next(); // Move on to the next middleware/route handler if the user is the owner
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
