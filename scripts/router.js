const pages = document.querySelectorAll(".page");

function showPage(id) {
  pages.forEach((p) => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

document.querySelectorAll(".redirect-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = e.target.getAttribute("href").replace("#", "");
    showPage(target);
  });
});

document.querySelector("#login form").addEventListener("submit", (e) => {
  e.preventDefault();
  showPage("chat-page");
});

document.querySelector("#register form").addEventListener("submit", (e) => {
  e.preventDefault();
  showPage("login");
});

document
  .querySelector(".header__leave-button")
  .addEventListener("click", () => {
    showPage("login");
  });
