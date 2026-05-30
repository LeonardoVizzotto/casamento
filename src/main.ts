import "./styles/tokens.css";
import "./styles/layout.css";
import { setupNavigation } from "./modules/nav/main";

function init() {
  setupNavigation();

  const navEl = document.querySelector(".site-nav--bottom") as HTMLElement | null;
  const coverEl = document.querySelector(".site-nav-bottom-cover") as HTMLElement | null;

  const isIPhone = /iPhone/i.test(window.navigator.userAgent);
  const isChromeIOS = /CriOS/i.test(window.navigator.userAgent);

  function forceSafariLayoutRecalc() {
    if (!navEl) return;
    void navEl.offsetHeight;
  }

  function updateBottomCover() {
    if (!navEl || !coverEl) return;

    if (!(isIPhone && isChromeIOS)) {
      coverEl.style.display = "none";
      coverEl.style.height = "0px";
      return;
    }

    const vv = window.visualViewport;
    const navRect = navEl.getBoundingClientRect();
    const viewportBottom = vv ? vv.height + vv.offsetTop : window.innerHeight;
    const gap = Math.max(0, Math.ceil(viewportBottom - navRect.bottom));

    coverEl.style.display = "block";
    coverEl.style.height = `${gap}px`;
  }

  function syncBottomFix() {
    forceSafariLayoutRecalc();
    updateBottomCover();
  }

  syncBottomFix();

  window.addEventListener("resize", syncBottomFix);
  window.addEventListener("scroll", updateBottomCover, { passive: true });
  window.visualViewport?.addEventListener("resize", syncBottomFix);
  window.visualViewport?.addEventListener("scroll", updateBottomCover);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}