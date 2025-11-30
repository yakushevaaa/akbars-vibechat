import { createContext } from "react";

export const ChatsContext = createContext({
  chats: [],
  setChats: () => {},
  activeChat: null,
  setActiveChat: () => {},
  unreadCount: {},
  markAsRead: () => {},
  incrementUnread: () => {},
});
