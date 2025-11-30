import { ChatsContext } from "@/app/providers/ChatsProvider/ChatsContext";
import { getChatMessages } from "@/shared/api/chat/getChatMessages";
import { useContext, useState, useEffect } from "react";
import { Dialog } from "../Dialog"; // alias!
import { getChatName } from "@/shared/lib/getChatName";
import { useKeyPress } from "@/shared/lib/hooks/useKeyPress";

// react-query
// 

export const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const { activeChat, setActiveChat } = useContext(ChatsContext);

  useEffect(() => {
    if (!activeChat) return;
    
    const fetchMessages = async () => {
      const { messages } = await getChatMessages(activeChat.id);
      setMessages(messages);
    };

    fetchMessages();
  });

  useKeyPress("Escape", () => {
    setActiveChat(null);
  });

  return (
    <main className="chat">
      <header className="chat__header">
        <h2 className="chat__header-title">{getChatName(activeChat)}</h2>
      </header>
      <Dialog messages={messages} />
      <footer className="chat__footer">
        <div className="chat__send-container">
          <textarea
            id="sendInput"
            className="chat__send-input"
            placeholder="Написать сообщение"
          ></textarea>
          <button id="sendBtn" className="chat__send-button">
            <img className="chat__send-icon" src="/icons/send.svg" />
            Отправить
          </button>
        </div>
      </footer>
    </main>
  );
};
