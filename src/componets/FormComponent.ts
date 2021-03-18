import { db } from "../util/database";
import { User } from "../models/user";
import { Message } from "../models/message";
import { getUser } from "../util/getUser";
import { RoomComponent } from "../componets/RoomComponent";

export class FormComponent {
  private static instance: FormComponent;
  private readonly chatForm: HTMLFormElement;
  chatMessage: HTMLInputElement;
  private message: Message;
  private author: Promise<User>;
  private room: RoomComponent;

  private constructor() {
    this.chatForm = document.querySelector("#chatForm") as HTMLFormElement;
    this.chatForm.addEventListener("submit", this.formSubmitHandler.bind(this));
    this.chatMessage = document.querySelector(
      "#chatMessage"
    ) as HTMLInputElement;
    this.room = RoomComponent.getInstance();
    this.author = getUser();
    this.message = <Message>{};
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }

    this.instance = new FormComponent();

    return this.instance;
  }

  async formSubmitHandler(event: Event) {
    event.preventDefault();

    console.log("SEND MESSAGE");

    const user = await this.author;
    const message = this.chatMessage.value;

    if (!message) {
      alert("Please enter message");
      return;
    }

    this.message = {
      author: { ...user },
      room: this.room.room,
      message,
      createdAt: Date.now(),
    };

    await db.collection("messages").add(this.message);

    this.chatMessage.value = "";
  }
}
