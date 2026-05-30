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
    const viewportBottom = vv ? vv.offsetTop + vv.height : window.innerHeight;
    const gap = Math.max(0, viewportBottom - navRect.bottom);

    coverEl.style.display = gap > 0 ? "block" : "none";
    coverEl.style.height = `${gap}px`;
  }

  function syncBottomNavFixes() {
    forceSafariLayoutRecalc();
    updateBottomCover();
  }

  syncBottomNavFixes();

  window.addEventListener("resize", syncBottomNavFixes);
  window.addEventListener("scroll", updateBottomCover, { passive: true });
  window.visualViewport?.addEventListener("resize", syncBottomNavFixes);
  window.visualViewport?.addEventListener("scroll", updateBottomCover);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}