import { MessagesListComponent } from "./MessagesListComponent";

export class RoomComponent {
  private static instance: RoomComponent;
  private roomButtons: HTMLButtonElement[];
  public room: string = "";

  private constructor() {
    this.roomButtons = [
      ...document.querySelectorAll<HTMLButtonElement>(".chat-room"),
    ];
    this.roomButtons.map((roomButton: HTMLButtonElement) =>
      roomButton.addEventListener("click", this.selectRoomHandler.bind(this))
    );

    if (this.roomButtons[0].textContent) {
      this.room = this.roomButtons[0].textContent.toString();
    }

    this.render();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }

    this.instance = new RoomComponent();

    return this.instance;
  }

  selectRoomHandler(event: Event) {
    const roomButton = event.target as HTMLButtonElement;

    if (roomButton.textContent) {
      const room = roomButton.textContent.toString();
      if (room !== this.room) {
        this.room = room;
        this.render();
      }
    }
  }

  render() {
    console.log("ROOM RENDER");

    const messagesList = new MessagesListComponent(this.room);
    messagesList.clear();
  }
}
