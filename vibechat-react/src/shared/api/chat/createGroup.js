import { request } from "../request";

export async function createGroup(name, friendsId) {
  const data = {
    name: name,
    userIds: friendsId,
  };

  const response = await request("api/chat/create-private", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response;
}
