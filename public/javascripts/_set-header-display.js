import { eventOptions } from './_has'

let appBody = document.querySelector('.app__body');
let hiding  = false;
let topElt;
let bottomElt;

appBody.addEventListener('scroll', setHeaderDisplay, eventOptions ? { passive : true } : false);
window.addEventListener('resize',  setHeaderDisplay, eventOptions ? { passive : true } : false);

function setHeaderDisplay() {
  if (!hiding && bottomElt.getBoundingClientRect().bottom < 0) {
    document.body.className = 'body--header-hidden';
    hiding = true;
  } else if (hiding && topElt.getBoundingClientRect().top > 0) {
    document.body.className = '';
    hiding = false;
  }
}

export default function(newTopElt, newBottomElt) {
  topElt = newTopElt;
  bottomElt = newBottomElt;
}
