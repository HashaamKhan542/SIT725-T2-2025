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

const sampleProjects = [
  {
    title: "Kitten 1",
    image: "images/kitten.png",
    link: "About Kitten 1",
    description: "Demo description about kitten 1",
  },
  {
    title: "Kitten 2",
    image: "images/kitten-2.png",
    link: "About Kitten 2",
    description: "Demo description about kitten 2",
  },
  {
    title: "Kitten 3",
    image: "images/kitten-3.png",
    link: "About Kitten 3",
    description: "Demo description about kitten 3",
  },
];

// Remove all and insert new
Project.deleteMany({})
  .then(() => {
    console.log("🗑️ Old projects removed.");
    return Project.insertMany(sampleProjects);
  })
  .then(() => {
    console.log("✅ New kitten projects inserted!");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("❌ Error occurred:", err);
    mongoose.connection.close();
  });
