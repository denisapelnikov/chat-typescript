import { User } from "../models/user";

export async function getUser(): Promise<User> {
  const request = await fetch("https://randomuser.me/api/");
  const response = await request.json();
  const username = `${response.results[0].name.title} ${response.results[0].name.first} ${response.results[0].name.last}`;
  const avatar = response.results[0].picture.thumbnail;
  const user = new User(username, avatar);

  return user;
}
