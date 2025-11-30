import { useContext } from "react";
import { AuthContext } from "@/app/providers/AuthProvider";
import { formatTime } from "@/shared/lib";
import { ChatsContext } from "@/app/providers/ChatsProvider/ChatsContext";
import { getChatName } from "@/shared/lib/getChatName";

export const UserChatItem = ({ chat }) => {
  const { user } = useContext(AuthContext);

  const lastMessageContent = chat.lastMessage?.content || "Чат пуст";
  const lastMessageTime = chat.lastMessage?.content
    ? formatTime(chat.lastMessage?.created_at)
    : "";

  return (
    <>
      <p className="chat-item__category">
        {chat.type === "group" ? "групповой чат" : "приватный чат"}
      </p>
      <div className="chat-item__info">
        <h3 className="chat-item__username">{getChatName(chat)}</h3>

{/* remove  */}
        {/* <span className="chat-item__new-message-count">2</span> */}
      </div>
      <div className="chat-item__message">
        <p className="chat-item__message-text">{lastMessageContent}</p>
        {lastMessageTime && (
          <p className="chat-item__time">{lastMessageTime}</p>
        )}
      </div>
    </>
  );
};
