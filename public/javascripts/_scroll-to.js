const HAS_SMOOTH_SCROLL = !!document.body.scrollBy;

let appBody     = document.querySelector('.app__body');
let fixedHeader = document.querySelector('.main-header__wrapper');
let offset      = 16;

function setSmoothScroll(selector) {
  let anchors = document.querySelectorAll(selector);

  for (let i=0, l=anchors.length; i < l; i += 1) {
    let anchor    = anchors[i];
    let anchorElt = document.querySelector(`#${anchor.href.split('#')[1]}`);

    if (anchorElt) {
      anchor.addEventListener('click', e => {
        e.preventDefault();
        let scrollTo     = anchorElt.getBoundingClientRect().top;
        let headerHeight = fixedHeader.getBoundingClientRect().height;

        if (HAS_SMOOTH_SCROLL) {
          appBody.scrollBy({
            top      : scrollTo - headerHeight - offset,
            behavior : 'smooth',
          });
        } else {
          appBody.scrollTop = scrollTo - headerHeight - offset;
        }
      });
    }
  }
}

export default setSmoothScroll;
