import { login, register } from "@/shared/api";
import { CustomInput } from "@/shared/components/ui/CustomInput";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { handleAuthErrors } from "@/shared/lib/auth/authErrors";
import { FormError } from "@/shared/components/ui/FormError";
import { FormSuccess } from "@/shared/components/ui/FormSuccess";

export const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [nickName, setNickName] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [success, setSuccess] = useState(false);

  const [serverErrors, setServerErrors] = useState({
    email: "",
    nickName: "",
    full_name: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !email.trim() ||
      !nickName.trim() ||
      !fullName.trim() ||
      !password.trim()
    ) {
      setGeneralError("Все значения должны быть заполнены");
      return;
    }

    setGeneralError("");
    setServerErrors({});

    const response = await register({
      email: email,
      nickname: nickName,
      full_name: fullName,
      password: password,
    });

    if (response.error) {
      const inputErrors = handleAuthErrors(response);
      if (Object.keys(inputErrors).length > 0) {
        setServerErrors(inputErrors);
        return;
      }
    }

    if (response.user) {
      setSuccess(true);
      const loginUser = await login({ email: email, password: password });
      if (loginUser) {
        navigate("/chat");
      }
    }
  };

  return (
    <>
      <h1 className="form-container__title">Регистрация</h1>
      <form onSubmit={handleSubmit} className="form">
        <CustomInput
          id="registerEmail"
          onChange={(e) => setEmail(e.target.value)}
          className="form__input"
          type="email"
          placeholder="Введите электронную почту"
        />

        {serverErrors.email && <FormError>{serverErrors.email}</FormError>}

        <CustomInput
          id="registerNick"
          onChange={(e) => setNickName(e.target.value)}
          className="form__input"
          type="text"
          placeholder="Введите никнейм"
        />

        {serverErrors.nickName && (
          <FormError>{serverErrors.nickName}</FormError>
        )}

        <CustomInput
          id="registerName"
          onChange={(e) => setFullName(e.target.value)}
          className="form__input"
          type="text"
          placeholder="Введите ФИО"
        />

        {serverErrors.full_name && (
          <FormError>{serverErrors.full_name}</FormError>
        )}

        <CustomInput
          id="registerPassword"
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

        <button id="registerButton" className="form__button">
          Зарегистрироваться
        </button>
      </form>
      <Link className="redirect-link" to="/auth/login">
        Войти в аккаунт
      </Link>
    </>
  );
};
