import { request } from "../request";

export async function createChat(userId) {
  const response = await request("api/chat/create-private", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id: userId }),
  });

  return response;
}
