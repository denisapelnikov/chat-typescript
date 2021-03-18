// Chat message
export class Message {
  constructor(
    public room: string,
    public author: {
      avatar: string;
      name: string;
    },
    public message: string,
    public createdAt: number
  ) {}
}
