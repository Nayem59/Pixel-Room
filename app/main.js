import App from "./App.js";
const socket = io("http://localhost:3000"); // Connect to your server

export const app = new App();

// Global app state
export const state = {
  rooms: [],
  currentRoom: null,
};

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
