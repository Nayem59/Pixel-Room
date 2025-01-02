import HomeComponent from "./components/HomeComponent.js";
import LoginComponet from "./components/LoginComponent.js";
import RoomComponent from "./components/RoomComponent.js";

class App {
  constructor() {
    this.container = document.getElementById("app-content");
    this.currentComponent = null;
    this.init();
  }
  init() {
    // Set up routing
    window.addEventListener("popstate", () => {
      const path = window.location.pathname;
      if (path.startsWith("/room/")) {
        const roomName = path.split("/room/")[1];
        this.setComponent(new RoomComponent(roomName));
      } else if (path.startsWith("/home")) {
        this.setComponent(new HomeComponent());
      } else {
        this.setComponent(new LoginComponet());
      }
    });

    // Render the initial component
    this.setComponent(new LoginComponet());
  }

  setComponent(component) {
    this.currentComponent = component;
    this.container.innerHTML = "";
    this.container.appendChild(component.render());
  }
}

export default App;
