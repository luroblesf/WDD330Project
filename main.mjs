import { loadHeaderFooter } from "./utils.mjs";

document.addEventListener("DOMContentLoaded", async () => {
    await loadHeaderFooter();
    console.log("Header y Footer cargados dinámicamente");
});
