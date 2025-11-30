import { AuthContext } from "@/app/providers/AuthProvider";
import { handleAuthErrors } from "@/shared/lib";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { login } from "@/shared/api";
import { FormError } from "@/shared/components/ui/FormError";
import { CustomInput } from "@/shared/components/ui/CustomInput";
import { FormSuccess } from "@/shared/components/ui/FormSuccess";

// ./constants.ts
export const errors = {
    email: "",
    password: "",
  }

// formik + zod
// react-hook-form + Y??? 
// TODO HW
// HW TS

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [success, setSuccess] = useState(false);
  const [serverErrors, setServerErrors] = useState(errors);

  const {email: emailError, password: passwordError } = serverErrors

  const { setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!email.trim() || !password.trim()) {
      setGeneralError("Все значения должны быть заполнены");
      return;
    }

    setGeneralError("");
    setServerErrors({});

    const {message, user, error} = await login({ email, password });

    // helper
    if (error) {
      setGeneralError(message);
      
      const inputErrors = handleAuthErrors(response);

      const isErrors =  Object.keys(inputErrors).length > 0
      
      if(isErrors) {
        setServerErrors(inputErrors);
        return;
      }
    }

    setSuccess(true);
    setUser(user);

    navigate("/chat");
  };

  return (
    <>
      <h1 className="form-container__title">Войти в учетную запись</h1>
      <form onSubmit={handleSubmit} className="form">
        <CustomInput
          id="loginEmail"
          onChange={(event) => setEmail(event.target.value)}
          className="form__input"
          type="email"
          placeholder="Введите электронную почту"
        />

        {emailError && <FormError>{emailError}</FormError>}

        <CustomInput
          id="loginPassword"
          onChange={(event) => setPassword(event.target.value)}
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
