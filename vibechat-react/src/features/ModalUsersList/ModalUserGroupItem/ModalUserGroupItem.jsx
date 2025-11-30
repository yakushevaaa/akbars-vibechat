import { formatDate } from "@/shared/lib";
export const ModalUserGroupItem = ({ user }) => {
  return (
    <>
      <div className="modal__user-info-container">
        <h3 className="modal__user-nickname">{user.nickname}</h3>
        <p className="modal__user-info">{user.email}</p>
        <p className="modal__user-info">{user.full_name}</p>
        <p className="modal__user-info">{`Зарегистрирован ${formatDate(
          user.created_at
        )}`}</p>
      </div>
      <input className="modal__user-checkbox" type="checkbox" />
    </>
  );
};
