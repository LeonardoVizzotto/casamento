import "./styles/tokens.css";
import "./styles/layout.css";
import { setupNavigation } from "./modules/nav/main";

function init() {
  setupNavigation();

  const ua = window.navigator.userAgent;
  const isIPhone = /iPhone/i.test(ua);
  const isChromeIOS = /CriOS/i.test(ua);
  const isSafariIOS = isIPhone && /Safari/i.test(ua) && !isChromeIOS;
  const braveNavigator = navigator as Navigator & {
    brave?: { isBrave?: () => Promise<boolean> };
  };
  const isBraveIOS = !!braveNavigator.brave;

  if (isIPhone && (isChromeIOS || isBraveIOS)) {
    document.documentElement.classList.add("ios-chrome");
  }

  const navEl = document.querySelector(
    ".site-nav--bottom",
  ) as HTMLElement | null;

  function forceSafariLayoutRecalc() {
    if (!navEl) return;
    void navEl.offsetHeight;
  }

  if (isSafariIOS) {
    window.addEventListener("resize", forceSafariLayoutRecalc);
    window.visualViewport?.addEventListener("resize", forceSafariLayoutRecalc);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
