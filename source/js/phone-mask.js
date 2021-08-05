'use strict';

// (function () {
//   const phoneInputs = document.querySelectorAll('[data-type="tel"]');

//   let setCursorPosition = (pos, elem) => {
//     elem.focus();

//     if (elem.setSelectionRange) {
//         elem.setSelectionRange(pos, pos);
//     } else if (elem.createTextRange) {
//         let range = elem.createTextRange();

//         range.collapse(true);
//         range.moveEnd('character', pos);
//         range.moveStart('character', pos);
//         range.select();
//     }
//   };

//   const createMask= function (evt) {
//     let matrix ='+7(___) ___ __ __',
//         i = 0,
//         def = matrix.replace(/\D/g, ''),
//         val = this.value.replace(/\D/g, '');

//     if (def.length >= val.length) {
//         val = def;
//     }

//     this.value = matrix.replace(/./g, function(a) {
//         return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
//     });

//     if (evt.type === 'blur') {
//         if (this.value.length == 2) {
//             this.value = '';
//         }
//     } else {
//         setCursorPosition(this.value.length, this);
//     }
//   };

//   phoneInputs.forEach(input => {
//       input.addEventListener('input', createMask);
//       input.addEventListener('focus', createMask);
//       input.addEventListener('blur', createMask);
//   });
// })();

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
