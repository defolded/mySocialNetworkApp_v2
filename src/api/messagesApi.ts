import { GetUserMessages, GetUsersItems, instance } from "./api";

export const messagesAPI = {
  getUsers() {
    return instance
      .get<GetUsersItems>(
        `users?friend=true`)
      .then((res) => res.data.items);
  },
  getMessages(userId: number) {
    return instance.get<GetUserMessages>(`dialogs/${userId}/messages`).then((res) => res.data.items)
  },
  sendMessage(userId: number, body: string) {
    return instance.post(`dialogs/${userId}/messages`, { body }).then((res) => res.data)
  },
};