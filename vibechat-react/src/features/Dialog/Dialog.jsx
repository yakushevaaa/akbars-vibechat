import { useContext, useEffect } from "react";
import { MessageItem } from "./MessageItem/MessageItem"; //! @
import { AuthContext } from "@/app/providers/AuthProvider";

export const Dialog = ({ messages }) => {
  const { user } = useContext(AuthContext);
  
  // const checkIsMine = ()
  function checkIsMine(senderId) {
    return senderId === user.id;
  }

  return (
    <div className="dialog">
      {messages.map((item) => {
        return (
          <div key={item.id} className="dialog__message-parent">
            <MessageItem message={item} isMine={checkIsMine(item.user_id)} />
          </div>
        );
      })}
    </div>
  );
};
