import { request } from "../request";

export async function login(loginData) {
  const response = await request("api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  if (response.token) {
    localStorage.setItem("token", response.token);
  }
  return response;
}
