import { Outlet } from "react-router";

export const AuthPage = () => {
  return (
    <div className="page auth-page">
      <div className="form-background">
        <main className="form-container">
          <img className="logo" src="/icons/logo.svg" alt="Логотип" />
          <Outlet />
        </main>
      </div>
    </div>
  );
};
