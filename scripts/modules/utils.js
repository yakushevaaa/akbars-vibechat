import { getProfile } from "./auth.js";

export function showPage(id) {
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active");
  });
  const page = document.querySelector(`#${id}`);
  if (page) page.classList.add("active");
  else console.warn(`Страница с id="${id}" не найдена`);
}

export function showGeneralError(text, typeOfForm) {
  let errorId = "";
  switch (typeOfForm) {
    case "login":
      errorId = "#loginError";
      break;
    case "register":
      errorId = "#registerError";
      break;
    default:
      console.error("Неправильный typeOfForm");
      return;
  }

  const errorElement = document.querySelector(errorId);
  errorElement.innerText = text;
  errorElement.style.display = text ? "block" : "none";
}

export function showFieldErrors(formType, errors = {}) {
  const fieldToId = {
    email: "EmailError",
    nickname: "NickNameError",
    full_name: "NameError",
    password: "PasswordError",
  };

  for (const [field, message] of Object.entries(errors)) {
    const errorElement = document.querySelector(
      `#${formType}${fieldToId[field]}`
    );
    if (!errorElement) continue;
    errorElement.innerText = message;
    errorElement.style.display = message ? "block" : "none";
  }
}

export function handleServerErrors(formType, serverResponse) {
  if (!serverResponse.details?.length) return;

  const errors = {};
  for (const detail of serverResponse.details) {
    let message = detail.message.toLowerCase();
    if (message.includes("email")) errors.email = detail.message;
    else if (message.includes("никнейм")) errors.nickname = detail.message;
    else if (message.includes("пароль")) errors.password = detail.message;
  }

  showFieldErrors(formType, errors);
}

export function clearForm(id) {
  const inputs = document.querySelectorAll(`#${id} input`);
  inputs.forEach((input) => (input.value = ""));
}

export function createElement(tag, options = {}) {
  const el = document.createElement(tag);

  if (options.id) el.id = options.id;

  if (options.className) el.className = options.className;

  if (options.attrs) {
    for (const [key, value] of Object.entries(options.attrs)) {
      if (value === true) {
        el.setAttribute(key, "");
      } else if (value !== false && value != null) {
        el.setAttribute(key, String(value));
      }
    }
  }

  if (options.text !== undefined) {
    el.textContent = options.text;
  }

  if (options.style && typeof options.style === "object") {
    Object.assign(el.style, options.style);
  }

  for (const key in options) {
    if (key.startsWith("on") && typeof options[key] === "function") {
      el.addEventListener(key.slice(2).toLowerCase(), options[key]);
    }
  }

  if (options.children) {
    const children = Array.isArray(options.children)
      ? options.children
      : [options.children];
    for (const child of children) {
      let childEl = null;

      if (child instanceof HTMLElement) {
        childEl = child;
      } else if (typeof child === "string") {
        childEl = document.createTextNode(child);
      }

      if (childEl) el.appendChild(childEl);
    }
  }

  return el;
}

export function formatDate(serverResponse) {
  const date = new Date(serverResponse);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}
