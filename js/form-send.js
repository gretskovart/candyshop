'use strict';
(function () {
  var ESC_KEYCODE = 27;

  var modalSuccess = document.querySelector('.modal--success');
  var closeModal = modalSuccess.querySelector('.modal__close');

  var orderSuccsess = function () {
    modalSuccess.classList.remove('modal--hidden');
    window.form.reset();
  };

  var closeOrderSuccess = function () {
    modalSuccess.classList.add('modal--hidden');

    document.removeEventListener('keydown', onPopupEscPress);
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeOrderSuccess();
    }
  };

  window.form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.serverData.sendData(new FormData(window.form), orderSuccsess, document.onError);
    document.addEventListener('keydown', onPopupEscPress);
    closeModal.addEventListener('click', closeOrderSuccess);

    setTimeout(closeOrderSuccess, 3000);
  });
})();
