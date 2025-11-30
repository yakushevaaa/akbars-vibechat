import { request } from "../request";

export async function getMyChats() {
  const response = await request("api/chat/my-chats", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
}
