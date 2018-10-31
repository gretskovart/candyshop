'use strict';
(function () {
  var ESC_KEYCODE = 27;

  var modalSuccess = document.querySelector('.modal--success');
  var closeModal = modalSuccess.querySelector('.modal__close');

  var orderSuccsess = function () {
    modalSuccess.classList.remove('modal--hidden');
    window.form.formBlock.reset();
    window.form.cardStatus.textContent = 'Не определен';
    clearCart();

    document.addEventListener('keydown', onPopupEscPress);
    closeModal.addEventListener('click', closeOrderSuccess);
  };

  var clearCart = function () {
    var cardsInCart = document.querySelectorAll('.card-order__close');

    cardsInCart.forEach(function (item) {
      window.order.removeCartObj(item);
    });
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

  window.form.formBlock.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.serverData.sendData(new FormData(window.form.formBlock), orderSuccsess, document.onError);

    setTimeout(closeOrderSuccess, 3000);
  });
})();
