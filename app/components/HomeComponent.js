import { app, socket, state } from "../main.js";
import RoomComponent from "./RoomComponent.js";

class HomeComponent {
  constructor() {
    this.element = document.createElement("div");
    this.element.className = "home-component";
  }

  render() {
    this.element.innerHTML = `
      <form class="new-room-form">
        <div class="input-container">
          <label for="new-room">Create a new Room:</label>
          <input id="new-room" class="new-room-input" type="text" placeholder="Room name ..." />
        </div>
        <button type="submit">Create</button>
      </form>
      <div class="room-container">
        <h2>Current active Rooms</h2>
        <div class="rooms">
        ${state.rooms.map((room) => `<div class="room">${room}</div>`).join("")}
        </div>
      </div>
    `;

    // Attach event listeners
    this.element
      .querySelector(".new-room-form")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        const roomInput = this.element.querySelector(".new-room-input");
        const roomName = roomInput.value.trim().replace(/\s/g, "");

        if (!roomName || state.rooms.includes(roomName)) {
          console.log("Invalid or duplicate room name");
          return;
        }

        state.rooms.push(roomName);
        roomInput.value = "";
        history.pushState({}, "", `/room/${roomName}`);
        app.setComponent(new RoomComponent(roomName));
        socket.emit("join-room", roomName);
      });

    // Attach click event to room items
    this.element
      .querySelector(".room-container")
      .addEventListener("click", (event) => {
        if (event.target.classList.contains("room")) {
          const roomName = event.target.innerText;
          history.pushState({}, "", `/room/${roomName}`);
          app.setComponent(new RoomComponent(roomName));
          socket.emit("join-room", roomName);
        }
      });

    return this.element;
  }

  cleanup() {}
}

export default HomeComponent;
