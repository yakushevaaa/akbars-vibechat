import { useState } from "react";
import { ModalContext } from "../ModalProvider";
import { ChatsContext } from "./ChatsContext";

export function ChatsProvider({ children }) {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [unreadCount, setUnreadCount] = useState({});

  const markAsRead = (chatId) => {
    setUnreadCount((prev) => ({ ...prev, [chatId]: 0 }));
  };

  const incrementUnread = (chatId) => {
    setUnreadCount((prev) => ({ ...prev, [chatId]: (prev[chatId] || 0) + 1 }));
  };

  return (
    <ChatsContext.Provider
      value={{
        chats,
        setChats,
        activeChat,
        setActiveChat,
        unreadCount,
        setUnreadCount,
        markAsRead,
        incrementUnread,
      }}
    >
      {children}
    </ChatsContext.Provider>
  );
}
