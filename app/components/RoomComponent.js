import { app, socket } from "../main.js";
import HomeComponent from "./HomeComponent.js";

class RoomComponent {
  constructor(roomName) {
    this.roomName = roomName;
    this.element = document.createElement("div");
    this.element.className = "room-component";
  }

  render() {
    this.element.innerHTML = `
      <button id="back-btn">⬅ Back</button>
      <div class="room-header">
        <h2>Room: ${this.roomName}</h2>
      </div>
      <div class="chat-container">
        <div class="messages" id="messages"></div>
        <form id="message-form">
          <input id="message-input" type="text" placeholder="Type a message..." />
          <button type="submit">Send</button>
        </form>
      </div>
    `;

    // Attach event listeners
    this.element.querySelector("#back-btn").addEventListener("click", () => {
      history.pushState({}, "", "/");
      app.setComponent(new HomeComponent());
    });

    const messageForm = this.element.querySelector("#message-form");
    const messageInput = this.element.querySelector("#message-input");

    messageForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const message = messageInput.value.trim();
      if (message) {
        socket.emit("message", { room: this.roomName, text: message });
        this.addMessage(`You: ${message}`);
        messageInput.value = "";
      }
    });

    socket.on("room-message", (msg) => {
      if (msg.room === this.roomName) {
        this.addMessage(`${msg.sender}: ${msg.text}`);
      }
    });

    return this.element;
  }

  addMessage(text) {
    const messagesDiv = this.element.querySelector("#messages");
    const messageDiv = document.createElement("div");
    messageDiv.textContent = text;
    messagesDiv.appendChild(messageDiv);
  }

  cleanup() {
    socket.off("room-message");
  }
}

export default RoomComponent;
