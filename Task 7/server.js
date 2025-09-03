// server.js
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const port = process.env.PORT || 3000;

// ---------- Middleware ----------
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ---------- DB Connection ----------
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/myprojectDB";

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
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

// ---------- Error handler ----------
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({
    statusCode: 500,
    message: "Internal Server Error",
  });
});

// ---------- HTTP + Socket.IO ----------
const server = http.createServer(app);
const io = new Server(server);

// Socket.IO events
io.on("connection", (socket) => {
  console.log(`✅ User connected: ${socket.id}`);

  // Example: emit random number every second
  const timer = setInterval(() => {
    socket.emit("number", Math.floor(Math.random() * 10));
  }, 1000);

  socket.on("disconnect", () => {
    console.log(`❌ User disconnected: ${socket.id}`);
    clearInterval(timer);
  });
});

// ---------- Start ----------
server.listen(port, () => {
  console.log(`🚀 App listening at http://localhost:${port}`);
  console.log(`👉 Socket demo available at /socket.html if you add one`);
});
