import { SOCKET_URL } from "./constants.js";
import { state } from "./state.js";
import {
  handleServerTyping,
  handleServerStoppedTyping,
  handleServerUserOffline,
  handleServerUserOnline,
  handleServerNewMessage,
} from "./handlers-socket.js";

export async function initSocket() {
  if (state.socket) return state.socket;
  const token = localStorage.getItem("token");
  if (!token) return null;

  const socket = io(SOCKET_URL, { auth: { token } });

  socket.on("connect", () => console.log("Сокет подключен"));
  socket.on("disconnect", (reason) => console.log("Сокет отключен:", reason));

  socket.on("user_typing", handleServerTyping);
  socket.on("user_stopped_typing", handleServerStoppedTyping);
  socket.on("user_online", handleServerUserOnline);
  socket.on("user_offline", handleServerUserOffline);
  socket.on("new_message", handleServerNewMessage);

  await new Promise((resolve) => {
    if (socket.connected) resolve();
    else socket.once("connect", resolve);
  });

  state.socket = socket;
  return socket;
}

export async function getSocket() {
  if (state.user && !state.socket) {
    await initSocket();

    if (state.socket && state.chats) {
      state.chats.forEach((chat) => {
        state.socket.emit("subscribe_to_chat", { chatId: chat.id });
      });
    }
  }
}
export function sendTypingStart(chatId) {
  if (!state.socket) return;
  state.socket.emit("typing_start", { chatId });
}

export function sendTypingStop(chatId) {
  if (!state.socket) return;
  state.socket.emit("typing_stop", { chatId });
}
