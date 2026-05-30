const SECTION_IDS = ['hero', 'schedule', 'details', 'gifts'];
const DESKTOP_NAV_LINK_SELECTOR = '.site-nav--top .site-nav__link';
const MOBILE_NAV_LINK_SELECTOR = '.site-nav--bottom .site-nav__link';
const ACTIVE_LINK_CLASS = 'site-nav__link--active';

let suppressObserver = false;

function setActiveLink(sectionId: string): void {
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

function getNavHeight(): number {
  return parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 64;
}

function setupActiveTracking(): void {
  const navHeight = getNavHeight();
  const rootMargin = `-${navHeight}px 0px 0px 0px`;

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

      if (activeSection && !suppressObserver) {
        setActiveLink(activeSection.id);
      }
    },
    { rootMargin, threshold: thresholds },
  );

  sections.forEach((section) => {
    ratios.set(section, 0);
    observer.observe(section);
  });
}

function forceActiveLink(sectionId: string): void {
  suppressObserver = true;
  setActiveLink(sectionId);
  setTimeout(() => {
    suppressObserver = false;
  }, 1000);
}

function setupClickTracking(): void {
  const selectors = [DESKTOP_NAV_LINK_SELECTOR, MOBILE_NAV_LINK_SELECTOR];
  selectors.forEach((selector) => {
    const links = document.querySelectorAll<HTMLAnchorElement>(selector);
    links.forEach((link) => {
      link.addEventListener('click', (event) => {
        const sectionId = link.getAttribute('href')?.replace('#', '');
        if (!sectionId) return;

        const target = document.getElementById(sectionId);
        if (!target) return;

        event.preventDefault();
        forceActiveLink(sectionId);

        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });

        history.replaceState(null, '', `#${sectionId}`);
      });
    });
  });
}

export function setupNavigation(): void {
  setupActiveTracking();
  setupClickTracking();
}