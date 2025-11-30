import { request } from "../request";

export async function getUsers(search = "") {
  const response = await request("api/chat/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ search: search }),
  });

  return response;
}
