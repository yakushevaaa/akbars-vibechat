import { BASE_URL } from "./constants.js";

export async function request(endpoint, options = {}) {
  const FULL_API_URL = `${BASE_URL}/${endpoint}`;
  const token = localStorage.getItem("token");

  const headers = options.headers ? { ...options.headers } : {};

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(FULL_API_URL, { ...options, headers });

    if (response.ok) {
      console.log(`$ Запрос на ${FULL_API_URL} вернул ${response.status}`);
      return await response.json();
    }

    if (response.status === 500) {
      alert("Сервис временно недоступен, повторите попытку позже");
      return { error: "server_unavailable" };
    }

    let errorBody = null;
    try {
      errorBody = await response.json();
    } catch {
      errorBody = { error: `Ошибка ${response.status}`, details: [] };
    }

    return {
      error: true,
      status: response.status,
      message: errorBody.error || "Ошибка запроса",
      details: Array.isArray(errorBody.details) ? errorBody.details : [],
    };
  } catch (error) {
    console.error("Fetch:", error);
    return {
      error: true,
      message: "Ошибка сети",
    };
  }
}
