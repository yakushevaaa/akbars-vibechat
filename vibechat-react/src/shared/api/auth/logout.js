import { request } from "../request";

export async function logout() {
  const response = await request("api/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response) {
    localStorage.removeItem("token");
  }

  return response;
}
