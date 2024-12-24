import HomeComponent from "./components/HomeComponent.js";
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
      } else {
        this.setComponent(new HomeComponent());
      }
    });

    // Render the initial component
    this.setComponent(new HomeComponent());
  }

  setComponent(component) {
    this.currentComponent = component;
    this.container.innerHTML = "";
    this.container.appendChild(component.render());
  }
}

export default App;
