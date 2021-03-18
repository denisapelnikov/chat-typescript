import { Message } from "../models/message";
import { FormComponent } from "./FormComponent";

// Message Component
export class MessageComponent {
  private readonly messageTemplate: HTMLTemplateElement;
  private readonly messageDivEl: HTMLDivElement;
  private readonly container: HTMLDivElement;
  private readonly useravatar: HTMLImageElement;
  private readonly username: HTMLDivElement;
  private readonly usermessage: HTMLSpanElement;
  private message: Message;

  constructor(container: HTMLDivElement, message: Message) {
    this.container = container;
    this.message = message;

    this.messageTemplate = document.getElementById(
      "messages-list"
    ) as HTMLTemplateElement;

    const importedNode = document.importNode(
      this.messageTemplate.content,
      true
    );

    this.messageDivEl = importedNode.querySelector(
      ".message"
    ) as HTMLDivElement;
    this.useravatar = this.messageDivEl.querySelector(
      "img.user-avatar"
    ) as HTMLImageElement;
    this.username = this.messageDivEl.querySelector(
      "strong.user-name"
    ) as HTMLDivElement;
    this.usermessage = this.messageDivEl.querySelector(
      "span.user-message"
    ) as HTMLSpanElement;

    this.render();
  }

  private reply(event: Event) {
    const el = event.target as HTMLButtonElement;
    const form = FormComponent.getInstance();

    form.chatMessage.value = `@${el.previousElementSibling?.textContent} `;
  }

  private render() {
    console.log("RENDER MESSAGE");

    this.useravatar.src = this.message.author.avatar;
    this.username.textContent = this.message.author.name;
    this.usermessage.textContent = this.message.message;
    this.container.insertAdjacentElement("beforeend", this.messageDivEl);
    this.messageDivEl
      .querySelector("button.reply")!
      .addEventListener("click", this.reply);
  }
}
