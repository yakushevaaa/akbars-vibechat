import { AuthContext } from "@/app/providers/AuthProvider";
import { useContext } from "react";

export const UserGreet = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <p className="header__user-name">Привет...</p>;
  }

  return (
    <p className="header__user-name">
      Привет,
      {user?.nickname ? (
        <span> {user.nickname}</span>
      ) : (
        <span>Пользователь</span>
      )}
    </p>
  );
};
