const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    name: String,
    category: String,
    dev : String,
    imgSrc: String,
    favorite: Boolean,
    ghub: String,
});

// Create a mongoose model based on the schema
const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);


module.exports = Project;