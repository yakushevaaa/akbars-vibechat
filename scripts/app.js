import { loadState, renderUI, setRoot } from "./modules/state.js";
import { getSocket } from "./modules/socket.js";

document.addEventListener("DOMContentLoaded", async () => {
  const rootElem = document.querySelector("#app");
  setRoot(rootElem);
  loadState();
  await getSocket();
  renderUI();
});
