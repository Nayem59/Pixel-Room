class RoomComponent {
  constructor(roomName) {
    this.roomName = roomName;
    this.element = document.createElement("div");
    console.log("room", this.roomName);
  }
}

export default RoomComponent;
