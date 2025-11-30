import { useContext } from "react";
import { createPortal } from "react-dom";
import { ModalContext } from "@/app/providers/ModalProvider";

export const Modal = () => {
  const { isOpen, content, closeModal } = useContext(ModalContext);

  if (!isOpen) return null;

  return createPortal(
    <div className="modal-container">
      <div className="modal">
        <button className="modal__close-btn" onClick={closeModal}>
          <img src="/icons/close.svg" />
        </button>
        {content}
      </div>
    </div>,

    document.body
  );
};
