const cors = require("cors");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
app.use(cors());
// Handle socket connection
io.on("connection", (socket) => {
  console.log("A user connected");
  // Handle switch-to-game event from client
  socket.on("switch-to-game", () => {
    // Emit switch-to-game event to all clients
    socket.broadcast.emit("switch-to-it");
  });
  // Handle left event from client
  socket.on("left", () => {
    console.log("left");
    // Emit left event to all clients
    socket.broadcast.emit("go-left");
  });
  // Handle right event from client

  socket.on("right", () => {
    // Emit right event to all clients
    socket.broadcast.emit("go-right");
  });
  // Handle up event from client
  socket.on("up", () => {
    // Emit up event to all clients
    console.log("up");
    socket.broadcast.emit("go-up");
    console.log("up");
  });

  socket.on("gameover", () => {
    console.log("gameover");
    socket.broadcast.emit("game-over");
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Start the server
server.listen(5050, () =>
  console.log("server is running http://localhost:5050")
);
