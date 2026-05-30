import "./styles/tokens.css";
import "./styles/layout.css";
import { setupNavigation } from "./modules/nav/main";

function init() {
  setupNavigation();

const debugEl = document.getElementById('viewport-debug') as HTMLPreElement | null;
const navEl = document.querySelector('.site-nav--bottom') as HTMLElement | null;

function updateViewportDebug() {
  if (!debugEl || !navEl) return;

  const vv = window.visualViewport;
  const rect = navEl.getBoundingClientRect();
  const styles = window.getComputedStyle(navEl);

  const data = {
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
    scrollY: window.scrollY,
    visualViewport: vv
      ? {
          width: vv.width,
          height: vv.height,
          offsetTop: vv.offsetTop,
          offsetLeft: vv.offsetLeft,
          pageTop: vv.pageTop,
          pageLeft: vv.pageLeft,
          scale: vv.scale,
          bottom: vv.offsetTop + vv.height
        }
      : null,
    navRect: {
      top: rect.top,
      bottom: rect.bottom,
      height: rect.height
    },
    navStyles: {
      position: styles.position,
      bottom: styles.bottom,
      top: styles.top,
      minHeight: styles.minHeight,
      paddingBottom: styles.paddingBottom,
      transform: styles.transform
    }
  };

  debugEl.textContent = JSON.stringify(data, null, 2);
}

function enableViewportDebug() {
  if (!debugEl) return;

  const params = new URLSearchParams(window.location.search);
  const enabled = params.has('debugViewport');

  if (!enabled) return;

  debugEl.hidden = false;
  debugEl.style.position = 'fixed';
  debugEl.style.top = '8px';
  debugEl.style.left = '8px';
  debugEl.style.right = '8px';
  debugEl.style.zIndex = '99999';
  debugEl.style.margin = '0';
  debugEl.style.padding = '12px';
  debugEl.style.background = 'rgba(0,0,0,0.85)';
  debugEl.style.color = '#0f0';
  debugEl.style.font = '12px/1.4 monospace';
  debugEl.style.whiteSpace = 'pre-wrap';
  debugEl.style.pointerEvents = 'none';
  debugEl.style.borderRadius = '8px';
  debugEl.style.maxHeight = '45vh';
  debugEl.style.overflow = 'auto';

  updateViewportDebug();

  window.addEventListener('scroll', updateViewportDebug, { passive: true });
  window.addEventListener('resize', updateViewportDebug);
  window.visualViewport?.addEventListener('resize', updateViewportDebug);
  window.visualViewport?.addEventListener('scroll', updateViewportDebug);

  requestAnimationFrame(function loop() {
    updateViewportDebug();
    requestAnimationFrame(loop);
  });
}

enableViewportDebug();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
