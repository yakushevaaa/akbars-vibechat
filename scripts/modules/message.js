import { request } from "./api.js";

export async function getChatMessages(chatId, limit = 50, offset = 0) {
  const response = await request(`api/chat/${chatId}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      limit: limit,
      offset: offset,
    }),
  });

  if (response?.error) {
    console.error("Ошибка при получении сообщений", response);
    return [];
  }

  return response;
}

export async function sendMessage(chatId, content) {
  const response = await request(`api/chat/${chatId}/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: content,
    }),
  });

  if (response?.error) {
    console.error("Ошибка при отправке сообщения:", response);
  }

  return response;
}
