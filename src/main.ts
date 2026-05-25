import './styles/tokens.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/sections.css';

import { setupNavigation } from './modules/nav';
import { setupParallax } from './modules/parallax';
import { setupModal } from './modules/modal';
import { setupStickyButton } from './modules/sticky-button';

function init() {
  setupNavigation();
  setupParallax();
  setupModal();
  setupStickyButton();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}