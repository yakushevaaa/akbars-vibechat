import { request } from "./api.js";

export async function fetchUsers(search = "") {
  return await request("api/chat/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ search: search }),
  });
}

export async function createPrivateChat(userId) {
  const response = await request("api/chat/create-private", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId }),
  });

  if (response?.error) {
    console.error("Ошибка при создании чата:", response);
    alert(response.message || "Не удалось создать чат");
    return response;
  }

  return response;
}

export async function fetchChats() {
  const response = await request("api/chat/my-chats", {
    method: "GET",
  });

  if (response?.error) {
    console.error("Ошибка при получении списка чатов:", response);
    alert(response.message || "Не удалось загрузить список чатов");
    return { chats: [] };
  }

  return response;
}

export async function createGroup(name, friendsId) {
  const data = {
    name: name,
    userIds: friendsId,
  };

  const response = await request("api/chat/create-group", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response?.error) {
    console.error("Ошибка при создании группы:", response);
    alert(response.message || "Не удалось создать группу");
    return response;
  }

  return response;
}
