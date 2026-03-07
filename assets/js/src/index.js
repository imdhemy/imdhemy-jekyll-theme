import { addIcons } from 'ionicons';
import { defineCustomElements } from 'ionicons/loader';
import {
  close,
  logoGithub,
  logoLinkedin,
  logoTwitter,
  logoYoutube,
  menuOutline,
} from 'ionicons/icons';

const burgerMenu = require('./burger-menu');

defineCustomElements(window);
addIcons({
  close,
  'logo-github': logoGithub,
  'logo-linkedin': logoLinkedin,
  'logo-twitter': logoTwitter,
  'logo-youtube': logoYoutube,
  'menu-outline': menuOutline,
});

(() => {
  burgerMenu.init();
})();
