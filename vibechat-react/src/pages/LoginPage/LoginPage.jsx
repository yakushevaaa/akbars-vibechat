import { AuthContext } from "@/app/providers/AuthProvider";
import { handleAuthErrors } from "@/shared/lib";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { login } from "@/shared/api";
import { FormError } from "@/shared/components/ui/FormError";
import { CustomInput } from "@/shared/components/ui/CustomInput";
import { FormSuccess } from "@/shared/components/ui/FormSuccess";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [success, setSuccess] = useState(false);

  const [serverErrors, setServerErrors] = useState({
    email: "",
    password: "",
  });

  const { user, setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setGeneralError("Все значения должны быть заполнены");
      return;
    }

    setGeneralError("");
    setServerErrors({});

    const response = await login({ email: email, password: password });

    if (response.error) {
      setGeneralError(response.message);
      const inputErrors = handleAuthErrors(response);
      if (Object.keys(inputErrors).length > 0) {
        setServerErrors(inputErrors);
        return;
      }
    }

    setSuccess(true);
    setUser(response.user);

    navigate("/chat");
  };

  return (
    <>
      <h1 className="form-container__title">Войти в учетную запись</h1>
      <form onSubmit={handleSubmit} className="form">
        <CustomInput
          id="loginEmail"
          onChange={(e) => setEmail(e.target.value)}
          className="form__input"
          type="email"
          placeholder="Введите электронную почту"
        />

        {serverErrors.email && <FormError>{serverErrors.email}</FormError>}

        <CustomInput
          id="loginPassword"
          onChange={(e) => setPassword(e.target.value)}
          className="form__input"
          type="password"
          placeholder="Введите пароль"
        />

        {serverErrors.password && (
          <FormError>{serverErrors.password}</FormError>
        )}

        {generalError && <FormError>{generalError}</FormError>}
        {success && <FormSuccess>Успешно</FormSuccess>}

        <button id="loginButton" className="form__button">
          Войти
        </button>
      </form>
      <Link className="redirect-link" to="/auth/register">
        Зарегистрироваться
      </Link>
    </>
  );
};
