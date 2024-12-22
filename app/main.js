const socket = io("http://localhost:3000"); // Connect to your server

// Handle connection
socket.on("connect", () => {
  console.log("Connected to the server with ID:", socket.id);
});

// Handle messages from the server
socket.on("message", (msg) => {
  console.log("Message from server:", msg);
});

// Handle disconnection
socket.on("disconnect", () => {
  console.log("Disconnected from the server");
});

// Emit a message to the server
socket.emit("message", "Hello, a message from the client");
