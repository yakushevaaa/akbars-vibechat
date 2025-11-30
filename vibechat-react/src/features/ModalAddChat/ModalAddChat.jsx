import { useState } from "react";
import { ModalUsersList } from "../ModalUsersList";
import { ModalUserChatItem } from "../ModalUsersList/ModalUserChatItem";

export const ModalAddChat = () => {
  const [search, setSearch] = useState("");
  return (
    <>
      <div className="modal__header">
        <h1 className="modal__title">Новый чат</h1>
      </div>
      <p className="modal__text">Выберите участника для начала переписки</p>
      <input
        type="text"
        className="modal__input"
        onChange={(e) => setSearch(e.target.value)}
      />
      <ModalUsersList search={search} ItemComponent={ModalUserChatItem} />
    </>
  );
};
