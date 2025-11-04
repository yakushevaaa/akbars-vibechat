import { createElement } from "../utils.js";

export const loginPage = (handlers) => {
  return createElement("div", {
    id: "login",
    className: "page active",
    children: [
      createElement("div", {
        className: "form-background",
        children: createElement("main", {
          className: "form-container",
          children: [
            createElement("div", {
              className: "form-container__head",
              children: [
                createElement("img", {
                  className: "logo",
                  attrs: { src: "assets/icons/logo.svg", alt: "Логотип" },
                }),
                createElement("h1", {
                  className: "form-container__title",
                  text: "Войти в учетную запись",
                }),
              ],
            }),
            createElement("form", {
              className: "form",
              attrs: { name: "loginForm" },
              children: [
                createElement("input", {
                  id: "loginEmail",
                  className: "form__input",
                  attrs: {
                    type: "email",
                    placeholder: "Введите электронную почту",
                    required: true,
                    name: "email",
                  },
                }),
                createElement("p", {
                  id: "loginEmailError",
                  className: "form__error",
                }),
                createElement("input", {
                  id: "loginPassword",
                  className: "form__input",
                  attrs: {
                    type: "password",
                    placeholder: "Введите пароль",
                    required: true,
                    name: "password",
                  },
                }),
                createElement("p", {
                  id: "loginPasswordError",
                  className: "form__error",
                }),
                createElement("p", {
                  id: "loginError",
                  className: "form__error",
                }),
                createElement("button", {
                  id: "loginButton",
                  className: "form__button",
                  text: "Войти",
                  onClick: handlers.onLogin,
                }),
              ],
            }),
            createElement("a", {
              className: "redirect-link",
              attrs: { href: "#register" },
              text: "Зарегистрироваться",
              onClick: handlers.onGoToRegister,
            }),
          ],
        }),
      }),
    ],
  });
};

export const registerPage = (handlers) => {
  return createElement("div", {
    id: "register",
    className: "page active",
    children: [
      createElement("div", {
        className: "form-background",
        children: createElement("main", {
          className: "form-container",
          children: [
            createElement("div", {
              className: "form-container__head",
              children: [
                createElement("img", {
                  className: "logo",
                  attrs: { src: "assets/icons/logo.svg", alt: "Логотип" },
                }),
                createElement("h1", {
                  className: "form-container__title",
                  text: "Регистрация",
                }),
              ],
            }),
            createElement("form", {
              className: "form",
              attrs: { name: "registerForm" },
              children: [
                createElement("input", {
                  id: "registerEmail",
                  className: "form__input",
                  attrs: {
                    type: "email",
                    placeholder: "Введите электронную почту",
                    required: true,
                    name: "email",
                  },
                }),
                createElement("p", {
                  id: "registerEmailError",
                  className: "form__error",
                }),

                createElement("input", {
                  id: "registerNick",
                  className: "form__input",
                  attrs: {
                    type: "text",
                    placeholder: "Введите никнейм",
                    required: true,
                    name: "nickname",
                  },
                }),
                createElement("p", {
                  id: "registerNickNameError",
                  className: "form__error",
                }),

                createElement("input", {
                  id: "registerName",
                  className: "form__input",
                  attrs: {
                    type: "text",
                    placeholder: "Введите ФИО",
                    required: true,
                    name: "fullname",
                  },
                }),
                createElement("p", {
                  id: "registerNameError",
                  className: "form__error",
                }),

                createElement("input", {
                  id: "registerPassword",
                  className: "form__input",
                  attrs: {
                    type: "password",
                    placeholder: "Введите пароль",
                    required: true,
                    name: "password",
                  },
                }),
                createElement("p", {
                  id: "registerPasswordError",
                  className: "form__error",
                }),

                createElement("p", {
                  id: "registerError",
                  className: "form__error",
                }),

                createElement("button", {
                  id: "registerButton",
                  className: "form__button",
                  text: "Зарегистрироваться",
                  onClick: handlers.onRegister,
                }),
              ],
            }),

            createElement("a", {
              className: "redirect-link",
              attrs: { href: "#login" },
              text: "Войти в аккаунт",
              onClick: handlers.onGoToLogin,
            }),
          ],
        }),
      }),
    ],
  });
};
