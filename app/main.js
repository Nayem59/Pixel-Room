import App from "./App.js";

export const socket = io("http://localhost:3000", { autoConnect: false }); // Connect to your server
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
  currentUsernames: [],
  currentRoom: null,
};
export const app = new App();

// Handle connection
socket.on("connect", () => {
  console.log(
    "Connected to the server with ID:",
    socket.id,
    socket.auth.username
  );
});

// Handle disconnection
socket.on("disconnect", () => {
  console.log("Disconnected from the server");
});

// catch all listener for debugging purposes
socket.onAny((event, ...args) => {
  console.log(event, args);
});
