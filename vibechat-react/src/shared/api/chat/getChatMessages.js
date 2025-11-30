import { request } from "../request";

export async function getChatMessages(chatId) {
  const response = await request(`api/chat/${chatId}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
}
