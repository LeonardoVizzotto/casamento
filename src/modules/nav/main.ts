const SECTION_IDS = ['hero', 'schedule', 'details', 'gifts'];
const DESKTOP_NAV_LINK_SELECTOR = '.site-nav--top .site-nav__link';
const MOBILE_NAV_LINK_SELECTOR = '.site-nav--bottom .site-nav__link';
const NAV_SCROLLED_CLASS = 'site-nav--scrolled';
const ACTIVE_LINK_CLASS = 'site-nav__link--active';

function getNavBottomOffset(): number {
  const nav = document.querySelector('.site-nav--top');
  if (!nav) return 84;
  const style = getComputedStyle(nav);
  const navOffsetTop = parseInt(style.getPropertyValue('--nav-offset-top')) || 20;
  const navHeight = parseInt(style.getPropertyValue('--nav-height')) || 64;
  return navOffsetTop + navHeight;
}

function updateActiveLink(sectionId: string): void {
  const selectors = [DESKTOP_NAV_LINK_SELECTOR, MOBILE_NAV_LINK_SELECTOR];
  selectors.forEach((selector) => {
    const links = document.querySelectorAll<HTMLAnchorElement>(selector);
    links.forEach((link) => {
      if (link.getAttribute('href') === `#${sectionId}`) {
        link.classList.add(ACTIVE_LINK_CLASS);
      } else {
        link.classList.remove(ACTIVE_LINK_CLASS);
      }
    });
  });
}

function setupScrollBackground(): void {
  const heroLogo = document.querySelector('.hero__logo');
  const nav = document.querySelector('.site-nav--top');
  if (!heroLogo || !nav) return;

  const navBottom = getNavBottomOffset();
  const rootMargin = `-${navBottom + 16}px 0px 0px 0px`;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.intersectionRatio >= 1) {
        nav.classList.remove(NAV_SCROLLED_CLASS);
      } else {
        nav.classList.add(NAV_SCROLLED_CLASS);
      }
    },
    { rootMargin, threshold: [1] },
  );

  observer.observe(heroLogo);
}

function setupActiveTracking(): void {
  const nav = document.querySelector('.site-nav--top');
  if (!nav) return;

  const navBottom = getNavBottomOffset();
  const rootMargin = `-${navBottom}px 0px 0px 0px`;

  const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
    (el): el is HTMLElement => el !== null,
  );

  const ratios = new Map<HTMLElement, number>();

  const thresholds = Array.from({ length: 101 }, (_, i) => i / 100);

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        ratios.set(entry.target as HTMLElement, entry.intersectionRatio);
      }

      let maxRatio = -1;
      let activeSection: HTMLElement | null = null;

      for (const [section, ratio] of ratios) {
        if (ratio > maxRatio) {
          maxRatio = ratio;
          activeSection = section;
        }
      }

      if (activeSection) {
        updateActiveLink(activeSection.id);
      }
    },
    { rootMargin, threshold: thresholds },
  );

  sections.forEach((section) => {
    ratios.set(section, 0);
    observer.observe(section);
  });
}

export function setupNavigation(): void {
  setupScrollBackground();
  setupActiveTracking();
}
