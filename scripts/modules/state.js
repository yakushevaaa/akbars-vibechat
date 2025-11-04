import { handleLogin, handleRegister } from "./handlers.js";
import { loginPage, registerPage } from "./components/auth-components.js";
import {
  chatPage,
  createChatItem,
  createEmptyChats,
  createChatList,
  createMessageElement,
} from "./components/chat-components.js";

export const state = {
  user: null,
  socket: null,
  page: "login",
  chats: [],
  activeChat: null,
  onlineUsers: {},
};

export let root = null;

export const setRoot = (element) => {
  root = element;
};

export const loadState = () => {
  const savedState = localStorage.getItem("state");
  if (savedState) {
    Object.assign(state, JSON.parse(savedState));
  }
};

export const updateState = (newState = {}) => {
  Object.assign(state, newState);
  const stateToSave = { ...state };
  delete stateToSave.socket;
  localStorage.setItem("state", JSON.stringify(stateToSave));
  renderUI();
};

export const updateChats = async (newChats) => {
  state.chats = newChats.map((chat) => ({
    ...chat,
    unreadCount: chat.unreadCount || 0,
  }));
  const stateToSave = { ...state };
  delete stateToSave.socket;
  localStorage.setItem("state", JSON.stringify(stateToSave));

  renderChats();
};

export const renderUI = () => {
  while (root.firstChild) root.removeChild(root.firstChild);

  if (!state.user) {
    if (state.page === "register") renderRegisterPage();
    else renderLoginPage();
  } else {
    renderChatPage();
  }
};

function renderLoginPage() {
  const handlers = {
    onLogin: (e) => {
      e.preventDefault();
      handleLogin();
    },
    onGoToRegister: (e) => {
      e.preventDefault();
      updateState({ page: "register" });
    },
  };
  root.appendChild(loginPage(handlers));
}

function renderRegisterPage() {
  const handlers = {
    onRegister: (e) => {
      e.preventDefault();
      handleRegister();
    },
    onGoToLogin: (e) => {
      e.preventDefault();
      updateState({ page: "login" });
    },
  };
  root.appendChild(registerPage(handlers));
}

function renderChatPage() {
  const page = chatPage();
  root.appendChild(page);
}

export function renderChats() {
  const container = root.querySelector("#chatsContainer");
  const aside = root.querySelector(".chat-list");

  if (!container) {
    if (!aside) return;

    const newList =
      state.chats && state.chats.length > 0
        ? createChatList()
        : createEmptyChats();

    aside.replaceChildren(newList);
    return;
  }

  container.replaceChildren();

  if (!state.chats || state.chats.length === 0) {
    const empty = createEmptyChats();
    if (aside) aside.replaceChildren(empty);
    return;
  }

  state.chats.forEach((chat) => container.appendChild(createChatItem(chat)));
}

export function renderChatMessages(messages = []) {
  const dialog = root.querySelector("#dialog");
  if (!dialog) return;

  dialog.replaceChildren();

  messages.forEach((msg) => {
    const messageElement = createMessageElement(msg);
    dialog.appendChild(messageElement);
  });

  dialog.scrollTop = dialog.scrollHeight;
}
