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
      checkboxFeedback = document.querySelector('.feedback__form-checkbox');

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
    popupCall.focus();
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
        if (phone.value.length !== 18) {
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

  feedbackBtn.addEventListener('click', validityForm(checkbox, checkboxFeedback, phoneInput, nameInput, feedbackBtn));
  submitBtn.addEventListener('click', validityForm(checkCall, checkboxLabel, phoneInputCall, nameInputCall, submitBtn));
  btnCall.addEventListener('click', openPopup);
})();
