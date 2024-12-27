import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 3000;

// Serve static files
app.use(express.static("app"));

// Handle Socket.IO connections
io.on("connection", (socket) => {
  console.log("A user connected: ", socket.id);
  socket.on("disconnect", () => {
    console.log("A user disconnected: ", socket.id);
  });
  socket.on("message", (msg) => {
    socket.broadcast.emit("room-message", msg);
  });
  socket.emit("message", "Hello, a message from the server");
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
