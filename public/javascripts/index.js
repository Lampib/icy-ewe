import setSmoothScroll from './_scroll-to';
import setHeaderDisplay from './_set-header-display';

setSmoothScroll('a[href^="#"]');
setHeaderDisplay(
  document.querySelector('.splash-screen__title'),
  document.querySelector('.splash-screen__strap-line'));
