import App from "./App.js";
import HomeComponent from "./components/HomeComponent.js";
import RoomComponent from "./components/RoomComponent.js";

const socket = io("http://localhost:3000"); // Connect to your server

const newRoomForm = document.querySelector(".new-room-form");
const newRoomInput = document.querySelector(".new-room-input");
const roomContainer = document.querySelector(".room-container");

// Global app state
const state = {
  rooms: [],
  currentRoom: null,
};

const app = new App();
const home = new HomeComponent();
const room = new RoomComponent("testName");

let roomName = null;
let roomNames = [];

newRoomForm.addEventListener("submit", (event) => {
  event.preventDefault();

  roomName = newRoomInput.value.replace(/\s/g, "");
  if (!roomName) {
    console.log("name empty");
    roomName = null;
    return;
  }
  if (roomNames.includes(roomName)) {
    console.log("room name already exist");
    roomName = null;
    return;
  }

  roomNames.push(roomName);
  newRoomInput.value = "";
  const newDiv = document.createElement("div");
  newDiv.innerText = roomName;
  roomName = null;
  newDiv.className = "room";

  roomContainer.appendChild(newDiv);
});

roomContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("room")) {
    console.log(event.target.innerText);
  }
});

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
