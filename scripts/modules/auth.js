import {
  showGeneralError,
  showFieldErrors,
  handleServerErrors,
  clearForm,
} from "./utils.js";
import { request } from "./api.js";

export async function register(registerData) {
  showGeneralError("", "register");
  showFieldErrors("register", {});
  for (const value of Object.values(registerData)) {
    if (value.trim() === "") {
      showGeneralError("Все значения должны быть заполнены", "register");
      return;
    }
  }

  const response = await request("api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerData),
  });

  if (response.error) {
    handleServerErrors("register", response);
    return;
  }

  clearForm("register");

  return response;
}

export async function login(data) {
  const loginData = {
    email: data.email,
    password: data.password,
  };

  showGeneralError("", "login");
  showFieldErrors("login", {});
  for (const value of Object.values(loginData)) {
    if (value.trim() === "") {
      showGeneralError("Все значения должны быть заполнены", "login");
      return;
    }
  }

  const response = await request("api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  if (response.error) {
    handleServerErrors("login", response);

    if (!response.details?.length && response.message) {
      showGeneralError(response.message, "login");
    }
    return;
  }

  if (response.token) {
    clearForm("login");
    localStorage.setItem("token", response.token);

    const user = await getProfile();
    return user;
  }
}

export async function logout() {
  return await request("api/auth/logout", { method: "POST" });
}

export async function getProfile() {
  const response = await request("api/auth/profile", {
    method: "GET",
  });

  if (response.error) {
    console.error("Ошибка при получении профиля:", response);
    return null;
  }

  if (response?.user) {
    return response.user;
  } else {
    console.error("Профиль пользователя не получен", response);
    return null;
  }
}
