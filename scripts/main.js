import { initTheme } from "./theme-switcher.js";
import { initInfiniteScroll, generateCards } from "./cards-page.js";

window.addEventListener('DOMContentLoaded', () => {
  initTheme();
  generateCards();
  initInfiniteScroll();
});
