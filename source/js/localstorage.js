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
