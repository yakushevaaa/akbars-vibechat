import { UserChatItem } from "./UserChatItem";
import { useContext } from "react";
import { ChatsContext } from "@/app/providers/ChatsProvider/ChatsContext";
import cn from "classnames";
export const UserChatsList = ({ chatsList }) => {
  //  TODO: сделать отображение непрочитанных сообщений
  const { activeChat, setActiveChat, markAsRead } = useContext(ChatsContext);

  function handleClick(chat) {
    setActiveChat(chat);
    markAsRead(chat.id);
  }

  return (
    <ul className="chats">
      {chatsList.map((chat) => (
        <li
          key={chat.id}
          className={cn("chat-item", {
            "chat-item--focused": activeChat && activeChat.id === chat.id,
          })}
          onClick={() => handleClick(chat)}
        >
          <UserChatItem chat={chat} />
        </li>
      ))}
    </ul>
  );
};
