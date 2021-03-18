import { db } from "../util/database";
import { Message } from "../models/message";
import { MessageComponent } from "./MessageComponent";

// MessagesList Component
export class MessagesListComponent {
  messagesList: HTMLDivElement;
  private room: string;

  constructor(room: string) {
    this.messagesList = document.getElementById("messages") as HTMLDivElement;
    this.room = room;
    this.render();
  }

  clear() {
    this.messagesList.textContent = "";
  }

  private render() {
    console.log("RENDER MESSAGES LIST");

    db.collection("messages")
      .where("room", "==", this.room)
      // .orderBy("createdAt")
      .onSnapshot((snapshot) =>
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const message = change.doc.data() as Message;
            new MessageComponent(this.messagesList, message);
          }
        })
      );
  }
}
