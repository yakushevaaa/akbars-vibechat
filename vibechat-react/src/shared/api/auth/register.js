import { request } from "@shared/api/request";

export async function register(registerData) {
  const response = await request("api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerData),
  });

  return response;
}
