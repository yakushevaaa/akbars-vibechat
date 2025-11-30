import { ChatsContext } from "@/app/providers/ChatsProvider/ChatsContext";
import { ChatsProvider } from "@/app/providers/ChatsProvider/ChatsProvider";
import { ModalProvider } from "@/app/providers/ModalProvider/ModalProvider";
import { ChatLayout } from "@/features/ChatLayout";
import { Modal } from "@/shared/components/Modal";
import { useContext } from "react";

export const ChatPage = () => {
  const { activeChat } = useContext(ChatsContext);

  return (
    <ChatsProvider>
      <ModalProvider>
        <ChatLayout />
        <Modal />
      </ModalProvider>
    </ChatsProvider>
  );
};
