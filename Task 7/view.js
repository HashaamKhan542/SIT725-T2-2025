const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/myprojectDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const ProjectSchema = new mongoose.Schema({
  title: String,
  image: String,
  link: String,
  description: String,
});

const Project = mongoose.model("Project", ProjectSchema);

Project.find({})
  .then((projects) => {
    console.log("📦 Projects in database:");
    console.log(projects);
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("❌ Error fetching projects:", err);
    mongoose.connection.close();
  });
