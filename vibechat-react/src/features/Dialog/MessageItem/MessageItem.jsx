import { formatTime } from "@/shared/lib";
import cn from "classnames";

export const MessageItem = ({ message, isMine }) => {
  return (
    <div className={cn("message", { "my-message": isMine })}>
      <p className="message__text">{message.content}</p>
      <p className="message__time">{formatTime(message.created_at)}</p>
    </div>
  );
};
