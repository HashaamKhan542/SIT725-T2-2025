// routes/projects.js
const express = require("express");
const router = express.Router();

const { projectsController } = require("../controllers");

// GET /api/projects
router.get("/", projectsController.getAllProjects);

// POST /api/projects   (optional if you want to create from a form or Postman)
router.post("/", projectsController.addProject);

module.exports = router;
