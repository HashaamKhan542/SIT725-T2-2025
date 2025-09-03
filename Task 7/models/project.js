// CommonJS version
const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: String,
  link: String,
  description: String,
}, { timestamps: true });

// Create the model
const Project = mongoose.model("Project", ProjectSchema);

// Export the model itself (NOT an object with { Project })
module.exports = Project;