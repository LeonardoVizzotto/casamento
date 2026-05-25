import './styles/tokens.css';
import './styles/layout.css';
import { setupNavigation } from './modules/nav/main';


function init() {
  setupNavigation();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}