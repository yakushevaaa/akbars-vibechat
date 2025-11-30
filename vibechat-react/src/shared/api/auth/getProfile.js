import { request } from "../request";

export async function getProfile() {
  const response = await request("api/auth/profile", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
}
