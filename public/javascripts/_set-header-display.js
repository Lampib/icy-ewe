import { eventOptions } from './_has'

let appBody   = document.querySelector('.app__body');
let targetElt = document.querySelector('.splash-screen__title');
appBody.addEventListener('scroll', setHeaderDisplay, eventOptions ? { passive : true } : false);
window.addEventListener('resize',  setHeaderDisplay, eventOptions ? { passive : true } : false);

function setHeaderDisplay() {
  if (targetElt.getBoundingClientRect().bottom < 0) {
    document.body.className = 'body--header-open';
  } else if (targetElt.getBoundingClientRect().top > 0) {
    document.body.className = '';
  }
}

export default function(newTargetElt) {
  targetElt = newTargetElt;
}
