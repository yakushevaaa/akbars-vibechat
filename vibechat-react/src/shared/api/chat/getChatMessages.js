import { request } from "../request";

export async function getChatMessages(chatid) {
  const response = await request(`api/chat/${chatid}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
}
