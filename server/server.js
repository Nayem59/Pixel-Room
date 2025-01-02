import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 3000;

// Serve static files
app.use(express.static("app"));

const userRooms = new Map(); // Map to store each socket's current room

// Handle Socket.IO connections
io.on("connection", (socket) => {
  console.log("A user connected: ", socket.id);
  socket.on("disconnect", () => {
    console.log("A user disconnected: ", socket.id);
    const currentRoom = userRooms.get(socket.id);
    if (currentRoom) {
      socket.leave(currentRoom); // Leave the previous room if any
      userRooms.delete(socket.id);
      socket
        .to(currentRoom)
        .emit("left-message", `${socket.id} has left the room: ${currentRoom}`);
    }
  });

  socket.on("join-room", (room) => {
    const currentRoom = userRooms.get(socket.id);

    if (currentRoom) {
      socket.leave(currentRoom); // Leave the previous room if any
    }

    socket.join(room);
    userRooms.set(socket.id, room);
    socket
      .to(room)
      .emit("joined-message", `${socket.id} has joined the room: ${room}`);
  });

  socket.on("leave-room", (room) => {
    userRooms.delete(socket.id);
    socket.leave(room);
    socket
      .to(room)
      .emit("left-message", `${socket.id} has left the room: ${room}`);
  });

  socket.on("message", (msg) => {
    const room = userRooms.get(socket.id);
    if (room) {
      socket.to(room).emit("room-message", { sender: socket.id, msg });
    } else {
      console.log(
        `Socket ${socket.id} tried to send a message (${msg}) but is not in a room.`
      );
    }
  });

  // catch all listener for debugging purposes
  socket.onAny((event, ...args) => {
    console.log(event, args);
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
