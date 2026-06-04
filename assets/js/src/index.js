import { addIcons } from 'ionicons';
import { defineCustomElement as defineIonIcon } from 'ionicons/components/ion-icon.js';
import {
  chevronBackOutline,
  chevronDownOutline,
  chevronForwardOutline,
  close,
  logoGithub,
  logoLinkedin,
  logoTwitter,
  logoYoutube,
  menuOutline,
  searchOutline,
  timeOutline,
} from 'ionicons/icons';
import { init as initBurgerMenu } from './burger-menu';
import { init as initCarousel } from './carousel';
import { init as initCertificatesModal } from './certificates-modal';
import { init as initCommentsToggle } from './comments-toggle';
import { init as initHeaderState } from './header-state';
import { init as initPostSeries } from './post-series';
import { init as initReadingProgress } from './reading-progress';
import { init as initSearch } from './search';

addIcons({
  'chevron-back-outline': chevronBackOutline,
  'chevron-down-outline': chevronDownOutline,
  'chevron-forward-outline': chevronForwardOutline,
  close,
  'logo-github': logoGithub,
  'logo-linkedin': logoLinkedin,
  'logo-twitter': logoTwitter,
  'logo-youtube': logoYoutube,
  'menu-outline': menuOutline,
  'search-outline': searchOutline,
  'time-outline': timeOutline,
});
defineIonIcon();

(() => {
  initBurgerMenu();
  initCarousel();
  initCertificatesModal();
  initCommentsToggle();
  initHeaderState();
  initPostSeries();
  initReadingProgress();
  initSearch();
})();
