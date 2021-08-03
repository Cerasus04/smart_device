`use strict`;

const btnCall = document.querySelector(`.header__btn`);
const overlayCall = document.querySelector(`.overlay`);
const popupCall = document.querySelector(`.modal`);
const btnCloseCall = popupCall.querySelector(`.modal__close`);
const submitBtn = document.querySelector(`.modal button[type="submit"]`);
const feedbackBtn = document.querySelector(`.feedback button[type="submit"]`);
const phoneInputs = document.querySelectorAll(`[data-type="tel"]`);

const phoneInputCall = document.querySelector(`#modal__tel`);
const nameInputCall = document.querySelector(`#modal__name`);
const checkCall = document.querySelector(`#modal__checked`);
const checkboxLabel = document.querySelector(`.modal__checked-label`);

const phoneInput = document.querySelector(`#tel`);
const nameInput = document.querySelector(`#name`);
const checkbox = document.querySelector(`#checked`);
const checkboxFeedback = document.querySelector(`.feedback__form-checkbox`);

const form = document.querySelector(`.modal__form`);
const inputText = document.querySelector(`.modal textarea`);

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

//создание маски

let setCursorPosition = (pos, elem) => {
    elem.focus();

    if (elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos);
    } else if (elem.createTextRange) {
        let range = elem.createTextRange();

        range.collapse(true);
        range.moveEnd(`character`, pos);
        range.moveStart(`character`, pos);
        range.select();
    }
};

function createMask(event) {
  let matrix =`+7(___) ___ __ __`,
      i = 0,
      def = matrix.replace(/\D/g, ``),
      val = this.value.replace(/\D/g, ``);

  if (def.length >= val.length) {
      val = def;
  }

  this.value = matrix.replace(/./g, function(a) {
      return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? `` : a;
  });

  if (event.type === `blur`) {
      if (this.value.length == 2) {
          this.value = ``;
      }
  } else {
      setCursorPosition(this.value.length, this);
  }
}

phoneInputs.forEach(input => {
    input.addEventListener(`input`, createMask);
    input.addEventListener(`focus`, createMask);
    input.addEventListener(`blur`, createMask);
});

// валидация формы

const validityForm = (checkbox, checkboxLabel, phone, name, button) => {
  const validity = (evt) => {
    if (!checkbox.checked || phoneInputCall.value.length !== 18 || !name.value) {
      if (!checkbox.checked) {
        evt.preventDefault();
        checkboxLabel.classList.add(`modal--error`);
      } else {
        checkboxLabel.classList.remove(`modal--error`);
      }
      if (phone.value.length !== 18) {
        evt.preventDefault();
        phone.classList.add(`modal--error`);
      } else {
        phone.classList.remove(`modal--error`);
      }
      if (!name.value) {
        name.classList.add(`modal--error`);
      } else {
        name.classList.remove(`modal--error`);
      }
    }
  };

  button.addEventListener(`click`, validity);
};

feedbackBtn.addEventListener(`click`, validityForm(checkbox, checkboxFeedback, phoneInput, nameInput, feedbackBtn));
submitBtn.addEventListener(`click`, validityForm(checkCall, checkboxLabel, phoneInputCall, nameInputCall, submitBtn));

btnCall.addEventListener(`click`, openPopup);

//локальное хранилище

let storageName = ``,
    storageTel = ``,
    storageText = ``,
    isStorageSupport = true;

try {
  storageName = localStorage.getItem(`name`);
  storageTel = localStorage.getItem(`tel`);
  storageText = localStorage.getItem(`text`);
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

form.addEventListener(`submit`, () => {
  if (isStorageSupport) {
    localStorage.setItem(`name`, nameInputCall.value);
    localStorage.setItem(`tel`, phoneInputCall.value);
    localStorage.setItem(`text`, inputText.value);
  }
});

//скролл

const anchors = document.querySelectorAll(`a[href*="#"]`);

for (let anchor of anchors) {
  anchor.addEventListener(`click`, (e) =>{
    e.preventDefault();

    const blockID = anchor.getAttribute(`href`).substr(1);

    document.getElementById(blockID).scrollIntoView({
      behavior: `smooth`,
      block: `start`
    });
  });
}

// Аккордеон

const list = document.querySelectorAll(`.sections`);
const btns = document.querySelectorAll(`.sections__toggle`);

for (let k = 0; k < list.length; k++) {
  list[k].classList.remove(`sections--nojs`);
}

for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener(`click`, toggleItem, false);
}

function toggleItem() {
  const itemClass = this.parentNode.className;
  for (let i = 0; i < list.length; i++) {
    list[i].className = `sections sections--hidden`;
  }
  if (itemClass == `sections sections--hidden`) {
    this.parentNode.className = `sections sections--active`;
  }
}
