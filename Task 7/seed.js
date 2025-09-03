// seed.js
const mongoose = require("mongoose");
const Project = require("./models/project");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/myprojectDB";

async function run() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  const sampleProjects = [
    {
      title: "Kitten 1",
      image: "images/kitten-1.png",
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

  try {
    await Project.deleteMany({});
    console.log("🗑️ Old projects removed.");
    await Project.insertMany(sampleProjects);
    console.log("✅ New kitten projects inserted!");
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await mongoose.connection.close();
  }
}

run();
