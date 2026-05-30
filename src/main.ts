import "./styles/tokens.css";
import "./styles/layout.css";
import { setupNavigation } from "./modules/nav/main";

function init() {
  setupNavigation();

  const navEl = document.querySelector(
    ".site-nav--bottom",
  ) as HTMLElement | null;

  function forceSafariLayoutRecalc() {
    if (!navEl) return;

    // This line is the magic trick.
    // Reading a layout property forces Safari to recalculate the page layout,
    // fixing the "floating" bar bug when the bottom toolbar hides.
    void navEl.offsetHeight;
  }

  // Listen to the events that happen when the Safari toolbar moves
  window.addEventListener("resize", forceSafariLayoutRecalc);
  window.visualViewport?.addEventListener("resize", forceSafariLayoutRecalc);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
