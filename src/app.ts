import { FormComponent } from "./componets/FormComponent";

// Chat
export class Chat {
  constructor() {
    FormComponent.getInstance();
  }
}

new Chat();
