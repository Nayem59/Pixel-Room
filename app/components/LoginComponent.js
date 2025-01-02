import { app, socket, state } from "../main.js";
import HomeComponent from "./HomeComponent.js";

class LoginComponet {
  constructor() {
    this.element = document.createElement("div");
    this.element.className = "login-component";
  }

  render() {
    this.element.innerHTML = `
          <form class="login-form" autocomplete="off">
            <div class="input-container">
              <label for="username">What is your Username:</label>
              <input id="username" class="username-input" type="text" placeholder="Your username ..." />
            </div>
            <button type="submit">Join</button>
          </form>
        `;

    // Attach event listeners
    this.element
      .querySelector(".login-form")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        const usernameInput = this.element.querySelector(".username-input");
        const username = usernameInput.value.trim().replace(/\s/g, "");

        if (!username || state.currentUsernames.includes(username)) {
          console.log("Invalid or duplicate username");
          return;
        }

        state.currentUsernames.push(username);
        usernameInput.value = "";
        history.pushState({}, "", `/home`);
        app.setComponent(new HomeComponent());
        socket.auth = { username };
        socket.connect();
      });

    return this.element;
  }
}

export default LoginComponet;
