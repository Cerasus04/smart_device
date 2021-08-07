'use strict';
(function () {
  const list = document.querySelectorAll('.sections'),
  btns = document.querySelectorAll('.sections__toggle');

  if (window.matchMedia("(min-width: 767px)").matches) {
    for (let i = 0; i < btns.length; i++) {
      btns[i].setAttribute("disabled", true);
    }
  } else {
    for (let i = 0; i < btns.length; i++) {
      btns[i].removeAttribute("disabled");
    }
  }

  for (let k = 0; k < list.length; k++) {
    list[k].classList.remove('sections--nojs');
  }

  const toggleItem = function() {
    const itemClass = this.parentNode.className;

    for (let i = 0; i < list.length; i++) {
      list[i].className = 'sections sections--hidden';
    }
    if (itemClass == 'sections sections--hidden') {
      this.parentNode.className = 'sections sections--active';
    }
  };

  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', toggleItem, false);
  }
})();
