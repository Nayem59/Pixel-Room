// const socket = io("http://localhost:3000"); // Connect to your server

const newRoomForm = document.querySelector(".new-room-form");
const newRoomInput = document.querySelector(".new-room-input");
const roomContainer = document.querySelector(".room-container");

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

  newDiv.addEventListener("click", (event) => {
    const roomName = event.target.innerText;
    console.log(`You clicked on Room ${roomName}`);
  });

  roomContainer.appendChild(newDiv);
});

// // Handle connection
// socket.on("connect", () => {
//   console.log("Connected to the server with ID:", socket.id);
// });

// // Handle messages from the server
// socket.on("message", (msg) => {
//   console.log("Message from server:", msg);
// });

// // Handle disconnection
// socket.on("disconnect", () => {
//   console.log("Disconnected from the server");
// });

// // Emit a message to the server
// socket.emit("message", "Hello, a message from the client");
