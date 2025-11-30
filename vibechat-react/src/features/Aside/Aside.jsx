import { getMyChats } from "@/shared/api";
import { useState, useEffect } from "react";
import { EmptyChatList } from "../EmptyChatList";
import { UserChatsList } from "../UserChatsList";
import { useContext } from "react";
import { ChatsContext } from "@/app/providers/ChatsProvider/ChatsContext";

export const Aside = () => {
  // const [chats, setChats] = useState([]);
  const { chats = [], setChats } = useContext(ChatsContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchChats = async () => {
      const { chats } = await getMyChats();
      setChats(chats);
      setIsLoading(false);
    };

    fetchChats();
  }, []);

  return (
    <aside className="chat-list">
      {chats.length === 0 ? (
        <EmptyChatList />
      ) : (
        <>
          <header className="chat-list__header">
            <h2 className="chat-list__title">Чаты</h2>
            <button className="chat-list__add-button">
              <img src="/icons/add-chat.svg" alt="" />
            </button>
          </header>

          <UserChatsList chatsList={chats} />
        </>
      )}
    </aside>
  );
};
