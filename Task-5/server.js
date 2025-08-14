// server.js
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

// ---------- Middleware ----------
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ---------- DB Connection ----------
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/myprojectDB";
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// ---------- Routes ----------
const projectsRoute = require("./routes/projects"); // (Routes → Controller → Service)
app.use("/api/projects", projectsRoute);

// ---------- Root ----------
app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// ---------- Error handler (optional) ----------
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ statusCode: 500, message: "Internal Server Error" });
});

// ---------- Start ----------
app.listen(port, () => {
  console.log(`🚀 App listening at http://localhost:${port}`);
});
