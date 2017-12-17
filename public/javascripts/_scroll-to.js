const setSmoothScroll = document.body.scrollBy
  ? (function() {
    const appBody     = document.querySelector('.app__body');
    const fixedHeader = document.querySelector('.main-header__content');
    const offset      = 100; // to skip the header

    return function(selector) {
      let anchors = document.querySelectorAll(selector);
      for (let i=0, l=anchors.length; i < l; i += 1) {
        let anchor    = anchors[i];
        let anchorElt = document.querySelector(`#${anchor.href.split('#')[1]}`);

        if (anchorElt) {
          anchor.addEventListener('click', e => {
            e.preventDefault();
            appBody.scrollBy({top: anchorElt.getBoundingClientRect().top - offset, behavior: 'smooth'});
          });
        }
      }
    }
  })()

  : function() {};

export default setSmoothScroll;
