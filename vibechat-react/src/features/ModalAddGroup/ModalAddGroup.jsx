import { useState } from "react";
import { ModalUsersList } from "../ModalUsersList";
import { ModalUserGroupItem } from "../ModalUsersList/ModalUserGroupItem";

export const ModalAddGroup = () => {
  const [search, setSearch] = useState("");
  return (
    <>
      <div className="modal__header">
        <h1 className="modal__title">Новая группа</h1>
      </div>

      <input
        type="text"
        placeholder="Название группы"
        className="modal__input"
      />
      <h2 className="modal__subtitle">Выберите участников группы</h2>
      <input
        type="text"
        className="modal__input"
        onChange={(e) => setSearch(e.target.value)}
      />

      <ModalUsersList search={search} ItemComponent={ModalUserGroupItem} />

      <div className="modal__buttons-container">
        <button className="modal__button">Отмена</button>
        <button className="modal__button modal__button--accent">
          Создать группу
        </button>
      </div>
    </>
  );
};
