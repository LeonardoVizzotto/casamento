import "./styles/tokens.css";
import "./styles/layout.css";
import { setupNavigation } from "./modules/nav/main";

function init() {
  setupNavigation();

  const nav = document.querySelector<HTMLElement>(".site-nav--bottom");

  function fixBottomNav() {
    if (!nav || !window.visualViewport) return;

    const vv = window.visualViewport;
    const top = vv.offsetTop + vv.height;

    nav.style.top = `${top}px`;
    nav.style.bottom = "auto";
    nav.style.transform = "translateY(-100%)";
  }

  fixBottomNav();
  window.visualViewport?.addEventListener("resize", fixBottomNav);
  window.visualViewport?.addEventListener("scroll", fixBottomNav);
  window.addEventListener("orientationchange", fixBottomNav);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
