import { addIcons } from 'ionicons';
import { defineCustomElement as defineIonIcon } from 'ionicons/components/ion-icon.js';
import {
  chevronDownOutline,
  close,
  logoGithub,
  logoLinkedin,
  logoTwitter,
  logoYoutube,
  menuOutline,
  timeOutline,
} from 'ionicons/icons';
import { init as initBurgerMenu } from './burger-menu';
import { init as initCommentsToggle } from './comments-toggle';
import { init as initHeaderState } from './header-state';
import { init as initPostSeries } from './post-series';
import { init as initReadingProgress } from './reading-progress';

addIcons({
  'chevron-down-outline': chevronDownOutline,
  close,
  'logo-github': logoGithub,
  'logo-linkedin': logoLinkedin,
  'logo-twitter': logoTwitter,
  'logo-youtube': logoYoutube,
  'menu-outline': menuOutline,
  'time-outline': timeOutline,
});
defineIonIcon();

(() => {
  initBurgerMenu();
  initCommentsToggle();
  initHeaderState();
  initPostSeries();
  initReadingProgress();
})();
