import { AuthContext } from "@/app/providers/AuthProvider";
import { logout } from "@/shared/api/auth/logout";
import { UserGreet } from "@features/UserGreet";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
export const Header = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  async function handleLogout() {
    await logout();
    setUser(null);
    navigate("/auth/login");
  }
  return (
    <header className="header">
      <img className="logo" src="/icons/logo.svg" alt="Логотип" />
      <div className="header__greet">
        <UserGreet />
        <button
          id="leaveButton"
          className="header__leave-button"
          onClick={handleLogout}
        >
          <img src="/icons/leave.svg" alt="Выход" />
        </button>
      </div>
    </header>
  );
};
