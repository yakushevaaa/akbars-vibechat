import { useContext } from "react";
import { ChatsContext } from "@/app/providers/ChatsProvider/ChatsContext";
import { Aside } from "@/features/Aside";
import { ChatWindow } from "@/features/ChatWindow";
import { Header } from "@/features/Header";
export const ChatLayout = () => {
  const { activeChat } = useContext(ChatsContext);

  return (
    <div className="layout">
      <Header />
      <Aside />
      {activeChat && <ChatWindow />}
    </div>
  );
};
