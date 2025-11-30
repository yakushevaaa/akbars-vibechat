import { debounce } from "./api.js";
import { sendTypingStart, sendTypingStop } from "./socket.js";
import { state, root } from "./state.js";
import { updateState, renderChatMessages, renderChats } from "./state.js";

let typingTimeout;

export function handleServerTyping({ userId, nickname, chatId }) {
  if (!state.activeChat || state.activeChat.id !== chatId) return;
  const typingElem = root.querySelector("#typingStatus");
  if (typingElem) typingElem.textContent = `печатает...`;
}

export function handleServerStoppedTyping({ userId, chatId }) {
  if (!state.activeChat || state.activeChat.id !== chatId) return;
  const typingElem = root.querySelector("#typingStatus");
  if (typingElem) typingElem.textContent = "";
}

export function handleServerUserOnline({ userId }) {
  state.onlineUsers[userId] = 1;

  if (state.activeChat?.type === "private" && isUserInActiveChat(userId)) {
    updateChatHeaderStatus(true);
  }
}

export function handleServerUserOffline({ userId }) {
  state.onlineUsers[userId] = 0;

  if (state.activeChat?.type === "private" && isUserInActiveChat(userId)) {
    updateChatHeaderStatus(false);
  }
}

export function handleServerNewMessage(message) {
  const chatId = message.chat_id;
  if (!chatId || !message) return;

  const isActiveChat = state.activeChat && state.activeChat.id === chatId;

  const updatedChats = (state.chats || []).map((chat) => {
    if (chat.id !== chatId) return chat;
    const unreadCount = isActiveChat ? 0 : (chat.unreadCount || 0) + 1;
    return { ...chat, lastMessage: message, unreadCount };
  });

  if (isActiveChat) {
    const updatedActiveChat = {
      ...state.activeChat,
      messages: [...(state.activeChat.messages || []), message],
    };
    updateState({ chats: updatedChats, activeChat: updatedActiveChat });
    renderChatMessages(updatedActiveChat.messages);
  } else {
    updateState({ chats: updatedChats });
  }

  renderChats();
}

export const handleUserTyping = debounce(() => {
  if (!state.activeChat) return;
  sendTypingStart(state.activeChat.id);

  clearTimeout(typingTimeout);
  typingTimeout = setTimeout(() => {
    sendTypingStop(state.activeChat.id);
  }, 1500);
}, 500);

function isUserInActiveChat(userId) {
  if (!state.activeChat) return false;
  return state.activeChat.members.some((m) => m.id === userId);
}

function updateChatHeaderStatus(isOnline) {
  const elem = root.querySelector("#onlineStatus");
  if (elem) elem.textContent = isOnline ? "онлайн" : "оффлайн";
}
