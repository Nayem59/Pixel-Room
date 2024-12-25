import App from "./App.js";

export const socket = io("http://localhost:3000"); // Connect to your server
// Global app state
export const state = {
  rooms: [
    "test",
    "hello",
    "one",
    "two",
    "three",
    "four",
    "fox",
    "hello1",
    "one1",
    "two1",
    "three1",
    "four1",
    "fox1",
  ],
  currentRoom: null,
};
export const app = new App();

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
