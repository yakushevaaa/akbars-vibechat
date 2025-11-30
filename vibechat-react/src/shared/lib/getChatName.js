import { AuthContext } from "@/app/providers/AuthProvider";
import { useContext } from "react";

export const getChatName = (chat) => {
  const { user } = useContext(AuthContext);
  if (chat.type === "group") {
    return chat.name;
  }
  if (chat.type === "private") {
    if (!user) return "Пользователь";
    const friend = chat.members.find((item) => item.id !== user.id);
    return friend?.nickname || "Пользователь";
  }
};
