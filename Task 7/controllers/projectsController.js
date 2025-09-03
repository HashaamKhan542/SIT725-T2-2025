// controllers/projectsController.js
const projectService = require("../services/projectService");

async function getAllProjects(req, res, next) {
  try {
    const projects = await projectService.list();
    res.json({ statusCode: 200, data: projects, message: "Success" });
  } catch (err) {
    next(err);
  }
}

async function addProject(req, res, next) {
  try {
    const { title, image, link, description } = req.body;
    if (!title) return res.status(400).json({ statusCode: 400, message: "title is required" });

    const created = await projectService.create({ title, image, link, description });
    res.status(201).json({ statusCode: 201, data: created, message: "Created" });
  } catch (err) {
    next(err);
  }
}

module.exports = { getAllProjects, addProject };
