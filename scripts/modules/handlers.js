import { login, register, logout } from "./auth.js";
import { state, root, updateState, updateChats, renderChats } from "./state.js";
import {
  showModal,
  hideModal,
  createUserItem,
  createGroupModal,
} from "./components/modals-component.js";
import {
  fetchUsers,
  createPrivateChat,
  fetchChats,
  createGroup,
} from "./chat.js";
import { initSocket } from "./socket.js";
import { getChatMessages, sendMessage } from "./message.js";
import { renderChatMessages } from "./state.js";
import { IMAGE_API_KEY } from "./constants.js";

export async function handleLogin() {
  const loginData = {
    email: document.querySelector("#loginEmail").value,
    password: document.querySelector("#loginPassword").value,
  };

  const user = await login(loginData);
  if (!user) return;
  const { chats } = await fetchChats();
  await initSocket();

  chats.forEach((chat) => {
    state.socket.emit("subscribe_to_chat", { chatId: chat.id });
  });

  updateState({ user, page: "chat", chats });
}

export async function handleRegister() {
  const registerData = {
    email: document.querySelector("#registerEmail").value,
    nickname: document.querySelector("#registerNick").value,
    password: document.querySelector("#registerPassword").value,
    full_name: document.querySelector("#registerName").value,
  };

  const registerResult = await register(registerData);

  if (registerResult) {
    const user = await login(registerData);
    if (user) {
      const { chats } = await fetchChats();
      await initSocket();

      if (state.socket && chats) {
        chats.forEach((chat) => {
          state.socket.emit("subscribe_to_chat", { chatId: chat.id });
        });
      }

      updateState({ user, page: "chat", chats });
    }
  }
}

export async function handleLogout() {
  await logout();
  if (state.socket) {
    state.socket.off("user_typing");
    state.socket.off("user_stopped_typing");
    state.socket.off("user_online");
    state.socket.off("user_offline");
    state.socket.off("new_message");
    state.socket.disconnect();
    state.socket = null;
  }
  localStorage.removeItem("token");
  localStorage.removeItem("state");

  updateState({
    user: null,
    page: "login",
    chats: [],
    activeChat: null,
    socket: null,
  });
}

export function handleCreateChatModal() {
  return async (e) => {
    e.preventDefault();

    showModal("createChat", () => hideModal(), [], true);

    const response = await fetchUsers();
    const users = response.users || [];

    const modal = root.querySelector(".modal-container");
    if (modal) {
      const usersList = modal.querySelector(".modal__users-list");
      if (usersList) {
        const loadingItem = usersList.querySelector(".modal__user-loading");
        if (loadingItem) usersList.removeChild(loadingItem);

        const userElements = users.map((user) =>
          createUserItem(user, false, (user) =>
            handleCreatePrivateChat(user.id)
          )
        );
        usersList.append(...userElements);
      }
    }
  };
}

export function handleCreateGroupModal() {
  return async (e) => {
    e.preventDefault();
    const selectedUsersIds = new Set();

    showModal("createGroup", () => hideModal(), [], true);

    const response = await fetchUsers();
    const users = response.users || [];

    const modalContent = createGroupModal(
      () => hideModal(),
      users,
      selectedUsersIds,
      false
    );
    const modalContainer = root.querySelector(".modal-container");
    if (modalContainer) {
      modalContainer.replaceChildren(modalContent);
    }
  };
}

export async function handleSearchUser(search = "") {
  const response = await fetchUsers(search);
  const users = response.users || [];

  const modal = root.querySelector(".modal-container");
  if (modal) {
    const usersList = modal.querySelector(".modal__users-list");

    if (usersList) {
      const loadingItem = usersList.querySelector(".modal__user-loading");
      if (loadingItem) usersList.removeChild(loadingItem);

      const userElements = users.map((user) =>
        createUserItem(user, false, (user) => handleCreatePrivateChat(user.id))
      );
      usersList.replaceChildren(...userElements);
    }
  }
}

export async function handleCreatePrivateChat(userId) {
  const response = await createPrivateChat(userId);

  if (!response || response.error) return;

  if (response.alreadyExists) {
    alert("Этот чат уже существует");
  }

  const newChatId = response.chat?.id;
  if (state.socket && newChatId) {
    state.socket.emit("subscribe_to_chat", { chatId: newChatId });
  }

  const { chats } = await fetchChats();
  updateChats(chats);
  hideModal();
}

export async function handleAddUserToGroup(userId, selectedUsersList) {
  if (selectedUsersList.has(userId)) {
    selectedUsersList.delete(userId);
  } else {
    selectedUsersList.add(userId);
  }
}

export async function handleCreateGroup(name, friedsId) {
  const response = await createGroup(name, friedsId);

  if (!response) return;

  const newChatId = response.chat?.id;
  if (state.socket && newChatId) {
    state.socket.emit("subscribe_to_chat", { chatId: newChatId });
  }

  const { chats } = await fetchChats();
  updateChats(chats);
  hideModal();
}

export async function handleSelectChat(chat) {
  const response = await getChatMessages(chat.id, 50, 0);

  const messages = response.messages ? response.messages : [];

  state.chats = state.chats.map((item) =>
    item.id === chat.id ? { ...item, unreadCount: 0 } : item
  );
  updateState({ activeChat: { ...chat, messages } });

  renderChatMessages(messages);
  renderChats();
}

export async function handleSendMessage() {
  const input = document.querySelector("#sendInput");
  const text = input.value.trim();

  if (!text || !state.activeChat) return;

  const response = await sendMessage(state.activeChat.id, text);
  if (response && !response.error) {
    input.value = "";
  }
}

export async function handleUploadImage(event) {
  const file = event.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${IMAGE_API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();

    if (data.success) {
      const imageUrl = data.data.url;
      await sendMessage(state.activeChat.id, `img:${imageUrl}`);
    } else {
      alert("Ошибка при загрузке изображения");
    }
  } catch (err) {
    console.error("Ошибка загрузки:", err);
    alert("Ошибка сети при загрузке изображения");
  }

  event.target.value = "";
}
