import { TransparentButton } from "@/shared/components/ui/TransparentButton";
import { ModalContext } from "@/app/providers/ModalProvider";
import { ModalAddChat } from "../ModalAddChat";
import { ModalAddGroup } from "../ModalAddGroup";
import { useContext } from "react";
export const EmptyChatList = () => {
  const { openModal } = useContext(ModalContext);
  return (
    <div className="empty-list">
      <img src="/icons/empty-state.svg" alt="" />
      <h1 className="empty-list__text">
        У вас еще нет
        <br />
        активных чатов
      </h1>
      <div className="empty-list__buttons-container">
        <TransparentButton onClick={() => openModal(<ModalAddChat />)}>
          Создать чат
        </TransparentButton>
        <TransparentButton onClick={() => openModal(<ModalAddGroup />)}>
          Создать группу
        </TransparentButton>
      </div>
    </div>
  );
};
