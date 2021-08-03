'use strict';

const btnCall = document.querySelector(`.header__btn`);
const overlayCall = document.querySelector(`.overlay`);
const popupCall = document.querySelector(`.modal`);
const btnCloseCall = popupCall.querySelector(`.modal__close`);
const submitBtn = document.querySelector(`.modal button[type="submit"]`);
const feedbackBtn = document.querySelector(`.feedback button[type="submit"]`);
const phoneInputs = document.querySelectorAll('[data-type="tel"]');

const phoneInputCall = document.querySelector(`#modal__tel`);
const nameInputCall = document.querySelector(`#modal__name`);
const checkboxCall = document.querySelector(`#modal__checked`);
const checkboxLabel = document.querySelector(`.modal__checked-label`);

const phoneInput = document.querySelector(`#tel`);
const nameInput = document.querySelector(`#name`);
const checkbox = document.querySelector(`#checked`);
const checkboxFeedback = document.querySelector(`.feedback__form-checkbox`);

const onPopupEscPress = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closePopup(evt);
  }
};

const openPopup = (evt) => {
  evt.preventDefault();
  popupCall.classList.add(`modal--active`);
  overlayCall.classList.add(`overlay--active`);
  btnCloseCall.addEventListener(`click`, closePopup);
  document.addEventListener(`keydown`, onPopupEscPress);
  overlayCall.addEventListener(`click`, closePopup);
  submitBtn.addEventListener(`click`, validityForm);
  nameInputCall.focus();
};
const closePopup = (evt) => {
  evt.preventDefault();
  popupCall.classList.remove(`modal--active`);
  overlayCall.classList.remove(`overlay--active`);
  btnCloseCall.removeEventListener(`click`, closePopup);
  document.removeEventListener(`keydown`, onPopupEscPress);
  submitBtn.removeEventListener(`click`, validityForm);
  overlayCall.removeEventListener(`click`, closePopup);
};

let setCursorPosition = (pos, elem) => {
    elem.focus();

    if (elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos);
    } else if (elem.createTextRange) {
        let range = elem.createTextRange();

        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
};

function createMask(event) {
    let matrix = '+7 (___) ___ __ __',
        i = 0,
        def = matrix.replace(/\D/g, ''),
        val = this.value.replace(/\D/g, '');

    if (def.length >= val.length) {
        val = def;
    }

    this.value = matrix.replace(/./g, function(a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
    });

    if (event.type === 'blur') {
        if (this.value.length == 2) {
            this.value = '';
        }
    } else {
        setCursorPosition(this.value.length, this);
    }
}

phoneInputs.forEach(input => {
    input.addEventListener('input', createMask);
    input.addEventListener('focus', createMask);
    input.addEventListener('blur', createMask);
});

const validityForm = (evt) => {
  if (!checkboxCall.checked || phoneInputCall.value.length !== 18 || !nameInputCall.value) {
    if (!checkboxCall.checked) {
      evt.preventDefault();
      checkboxLabel.classList.add(`modal--error`);
    } else {
      checkboxLabel.classList.remove(`modal--error`);
    }
    if (phoneInputCall.value.length !== 18) {
      evt.preventDefault();
      phoneInputCall.classList.add(`modal--error`);
    } else {
      phoneInputCall.classList.remove(`modal--error`);
    }
    if (!nameInputCall.value) {
      nameInputCall.classList.add(`modal--error`);
    } else {
      nameInputCall.classList.remove(`modal--error`);
    }
  }
};

const validityFeedback = (evt) => {
  if (!checkbox.checked || phoneInput.value.length !== 18 || !nameInput.value) {
    if (!checkbox.checked) {
      evt.preventDefault();
      checkboxFeedback.classList.add(`modal--error`);
    } else {
      checkboxFeedback.classList.remove(`modal--error`);
    }
    if (phoneInput.value.length !== 18) {
      evt.preventDefault();
      phoneInput.classList.add(`modal--error`);
    } else {
      phoneInput.classList.remove(`modal--error`);
    }
    if (!nameInput.value) {
      nameInput.classList.add(`modal--error`);
    } else {
      nameInput.classList.remove(`modal--error`);
    }
  }
};

feedbackBtn.addEventListener(`click`, validityFeedback);
submitBtn.addEventListener(`click`, validityForm);
btnCall.addEventListener(`click`, openPopup);


