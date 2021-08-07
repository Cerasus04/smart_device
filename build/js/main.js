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

'use strict';

(function () {
  const anchors = document.querySelectorAll('a[href*="#"]');

  for (let anchor of anchors) {
    anchor.addEventListener('click', (evt) => {
      evt.preventDefault();

      const blockID = anchor.getAttribute('href').substr(1);

      document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  }
})();

'use strict';
(function () {
  const page = document.querySelector('.page'),
      btnCall = document.querySelector('.header__btn'),
      overlayCall = document.querySelector('.overlay'),
      popupCall = document.querySelector('.modal'),
      btnCloseCall = popupCall.querySelector('.modal__close'),
      submitBtn = document.querySelector('.modal button[type="submit"]'),
      feedbackBtn = document.querySelector('.feedback button[type="submit"]'),

      phoneInputCall = document.querySelector('#modal__tel'),
      nameInputCall = document.querySelector('#modal__name'),
      checkCall = document.querySelector('#modal__checked'),
      checkboxLabel = document.querySelector('.modal__checked-label'),

      phoneInput = document.querySelector('#tel'),
      nameInput = document.querySelector('#name'),
      checkbox = document.querySelector('#checked'),
      checkboxFeedback = document.querySelector('.feedback__form-checkbox'),

      focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      modal = document.querySelector('#modal'),
      firstFocusableElement = modal.querySelectorAll(focusableElements)[0],
      focusableContent = modal.querySelectorAll(focusableElements),
      lastFocusableElement = focusableContent[focusableContent.length - 1];

  const onPopupEscPress = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closePopup(evt);
    }
  };

  const openPopup = (evt) => {
    evt.preventDefault();
    page.classList.add('page--js');
    popupCall.classList.add('modal--active');
    overlayCall.classList.add('overlay--active');
    btnCloseCall.addEventListener('click', closePopup);
    document.addEventListener('keydown', onPopupEscPress);
    overlayCall.addEventListener('click', closePopup);
    nameInputCall.focus();
  };

  const closePopup = (evt) => {
    evt.preventDefault();
    popupCall.classList.remove('modal--active');
    overlayCall.classList.remove('overlay--active');
    btnCloseCall.removeEventListener('click', closePopup);
    document.removeEventListener('keydown', onPopupEscPress);
    submitBtn.removeEventListener('click', validityForm);
    overlayCall.removeEventListener('click', closePopup);
  };

  const validityForm = (checkbox, checkboxLabel, phone, name, button) => {
    const validity = (evt) => {
      if (!checkbox.checked || phone.value.length !== 17 || !name.value) {
        if (!checkbox.checked) {
          evt.preventDefault();
          checkboxLabel.classList.add('modal--error');
        } else {
          checkboxLabel.classList.remove('modal--error');
        }
        if (phone.value.length !== 17) {
          evt.preventDefault();
          phone.classList.add('modal--error');
        } else {
          phone.classList.remove('modal--error');
        }
        if (!name.value) {
          name.classList.add('modal--error');
        } else {
          name.classList.remove('modal--error');
        }
      }
    };

    button.addEventListener('click', validity);
  };

document.addEventListener('keydown', function(e) {
  let isTabPressed = e.key === 'Tab' || e.key === 9;

  if (!isTabPressed) {
    return;
  }

  if (e.shiftKey) {
    if (document.activeElement === firstFocusableElement) {
      lastFocusableElement.focus();
      e.preventDefault();
    }
  } else {
    if (document.activeElement === lastFocusableElement) {
      firstFocusableElement.focus();
      e.preventDefault();
    }
  }
});

firstFocusableElement.focus();

  feedbackBtn.addEventListener('click', validityForm(checkbox, checkboxFeedback, phoneInput, nameInput, feedbackBtn));
  submitBtn.addEventListener('click', validityForm(checkCall, checkboxLabel, phoneInputCall, nameInputCall, submitBtn));
  btnCall.addEventListener('click', openPopup);
})();

'use strict';

(function () {
  const phoneInputCall = document.querySelector('#modal__tel'),
        nameInputCall = document.querySelector('#modal__name'),
        inputText = document.querySelector('.modal textarea'),
        form = document.querySelector('.modal__form');

  let storageName = '',
    storageTel = '',
    storageText = '',
    isStorageSupport = true;

  try {
    storageName = localStorage.getItem('name');
    storageTel = localStorage.getItem('tel');
    storageText = localStorage.getItem('text');
  } catch (err) {
    isStorageSupport = false;
  }

  if (storageName) {
    nameInputCall.value = storageName;
  }

  if (storageTel) {
    phoneInputCall.value = storageTel;
  }

  if (storageText) {
    inputText.value = storageText;
  }

  form.addEventListener('submit', () => {
    if (isStorageSupport) {
      localStorage.setItem('name', nameInputCall.value);
      localStorage.setItem('tel', phoneInputCall.value);
      localStorage.setItem('text', inputText.value);
    }
  });
})();

'use strict';

(function () {
  const COUNTRY_CODE = '+7(';
  const length = COUNTRY_CODE.length;

  const onInputPhoneInput = (e) => {
    const matrix = COUNTRY_CODE + '___) ___ __ __';
    const def = matrix.replace(/\D/g, '');
    let i = 0;
    let val = e.target.value.replace(/\D/g, '');
    if (def.length >= val.length) {
      val = def;
    }
    e.target.value = matrix.replace(/./g, function (a) {
      if (/[_\d]/.test(a) && i < val.length) {
        return val.charAt(i++);
      } else if (i >= val.length) {
        return '';
      } else {
        return a;
      }
    });
  };

  const onFocusPhoneInput = (e) => {
    if (!e.target.value) {
      e.target.value = COUNTRY_CODE;
      e.target.addEventListener('input', onInputPhoneInput);
      e.target.addEventListener('blur', onBlurPhoneInput);
      e.target.addEventListener('keydown', onKeydownPhoneInput);
    }
  };

  const onKeydownPhoneInput = (e) => {
    if (e.target.selectionStart <= length && e.keyCode !== 8 && e.keyCode !== 46) {
      e.target.setSelectionRange(length, length);
    }
    if ((e.target.selectionStart === length || e.target.selectionStart === 1) && e.keyCode === 8) {
      e.preventDefault();
    }
    if (e.target.selectionStart === 1 && e.keyCode === 46) {
      e.preventDefault();
    }
  };

  const onBlurPhoneInput = (e) => {
    if (e.target.value === COUNTRY_CODE) {
      e.target.value = '';
      e.target.removeEventListener('input', onInputPhoneInput);
      e.target.removeEventListener('blur', onBlurPhoneInput);
    }
  };

  const initPhoneMask = () => {
    const phoneInputs = document.querySelectorAll('[data-type="tel"]');
    if (phoneInputs.length) {
      phoneInputs.forEach((input) => {
        input.addEventListener('focus', onFocusPhoneInput);
      });
    }
  };

  initPhoneMask();
})();
