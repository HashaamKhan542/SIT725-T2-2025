// CommonJS version
const Project = require("../models/project");

async function list() {
  return Project.find({}).lean();   // now works
}

async function create(payload) {
  return Project.create(payload);
}

module.exports = { list, create };
