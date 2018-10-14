'use strict';

(function () {
  var MAP_PATH_IMG = ['img/map/academicheskaya.jpg', 'img/map/vasileostrovskaya.jpg', 'img/map/rechka.jpg', 'img/map/petrogradskaya.jpg', 'img/map/proletarskaya.jpg', 'img/map/vostaniya.jpg', 'img/map/prosvesheniya.jpg', 'img/map/frunzenskaya.jpg', 'img/map/chernishevskaya.jpg', 'img/map/tehinstitute.jpg'];

  window.form = document.querySelector('.buy form');

  var formCardNum = window.form.querySelector('#payment__card-number');
  var formCardDate = window.form.querySelector('#payment__card-date');
  var formCardCvc = window.form.querySelector('#payment__card-cvc');
  var cardStatus = window.form.querySelector('.payment__card-status');
  var deliverySection = window.form.querySelector('.deliver');
  var paymentSection = window.form.querySelector('.payment');
  var paymentInputsBlock = paymentSection.querySelector('.payment__card-group');

  // переключаем способ оплаты
  var changePayment = function () {
    var toggleButtonPay = document.querySelector('.toggle-btn');

    toggleButtonPay.addEventListener('click', function (evt) {
      var btnTarget = evt.target;

      if (btnTarget.tagName === 'INPUT' && !btnTarget.hasAttribute('checked')) {
        togglePayment(btnTarget);
      }
    });
  };

  changePayment();

  var changeDelievery = function () {
    var toggleButtonDelivery = document.querySelector('.deliver__toggle');

    toggleButtonDelivery.addEventListener('click', function (evt) {
      var btnTarget = evt.target;

      if (btnTarget.tagName === 'INPUT' && !btnTarget.hasAttribute('checked')) {
        toggleDelivery(btnTarget);
      }
    });
  };

  changeDelievery();

  var togglePayment = function (target) {
    var cashWrap = paymentSection.querySelector('.payment__cash-wrap');
    var cardWrap = paymentSection.querySelector('.payment__card-wrap');
    var checkedBtn = paymentSection.querySelector('.toggle-btn__input[checked]');

    cardWrap.classList.toggle('visually-hidden');
    cashWrap.classList.toggle('visually-hidden');
    target.setAttribute('checked', true);
    checkedBtn.removeAttribute('checked');
    window.disableTabInputs(paymentSection);
  };

  var changeMap = function () {
    var delivery = document.querySelector('.deliver');
    var metroAddress = delivery.querySelectorAll('.input-btn__input--radio');
    var metroMap = delivery.querySelector('.deliver__store-map-img');

    var addCurrentMap = function () {
      metroAddress.forEach(function (item, i) {
        if (item.checked) {
          metroMap.src = MAP_PATH_IMG[i];
        }
      });
    };

    delivery.addEventListener('click', addCurrentMap);
  };

  changeMap();

  var toggleDelivery = function (target) {
    var store = deliverySection.querySelector('.deliver__store');
    var courier = deliverySection.querySelector('.deliver__courier');
    var checkedBtn = deliverySection.querySelector('.toggle-btn__input[checked]');

    store.classList.toggle('visually-hidden');
    courier.classList.toggle('visually-hidden');
    target.setAttribute('checked', true);
    checkedBtn.removeAttribute('checked');
    window.disableTabInputs(deliverySection);
  };

  window.disableTabInputs = function (tab) {
    var inputs = tab.querySelectorAll('.visually-hidden input');

    inputs.forEach(function (item) {
      item.setAttribute('disabled', '');
    });

    if (tab.classList.contains('deliver__courier')) {
      var tabTextArea = tab.querySelector('textarea');

      tabTextArea.setAttribute('disabled', '');
    }
  };

  var formInputsChecker = function (evt) {
    var id = evt.target.id;
    var value = evt.target.value;

    switch (id) {
      case 'payment__card-number':
        if (!checkLuhnAlgorithm(value)) {
          formCardNum.setCustomValidity('Введите правильный номер карты');
        } else {
          formCardNum.setCustomValidity('');
        }
        break;
      case 'payment__card-date':
        if (!dateChecker(value)) {
          formCardDate.setCustomValidity('Введите правильный срок действия карты');
        } else {
          formCardDate.setCustomValidity('');
        }
        break;
    }

    if (formCardNum.validity.valid && formCardDate.validity.valid && formCardCvc.validity.valid) {
      cardStatus.textContent = 'Одобрен';
    } else {
      cardStatus.textContent = 'Не определен';
    }
  };

  var checkLuhnAlgorithm = function (cardNumber) {
    var num = cardNumber;
    var arr = num.split('').map(function (char, index) {
      var digit = parseInt(char, 10);

      if ((index + cardNumber.length) % 2 === 0) {
        var digitX2 = digit * 2;

        return digitX2 > 9 ? digitX2 - 9 : digitX2;
      }

      return digit;
    });

    return !(arr.reduce(function (a, b) {
      return a + b;
    }, 0) % 10);
  };

  var dateChecker = function (val) {
    if (val.length < 5) {
      return false;
    }

    var date = new Date();
    var year = date.getFullYear().toString().substr(-2);
    var yearForm = val.substr(-2);
    var month = date.getMonth() + 1;
    var monthForm = val.substr(-10, 2);
    monthForm = parseFloat(monthForm);

    var checkMonth = function () {
      return (monthForm <= 12 && monthForm > 1);
    };

    var checkYear = function () {
      return (yearForm > year) || (yearForm === year) && (monthForm >= month);
    };

    return checkMonth() && checkYear();
  };

  var addDividerToDate = function (target) {
    var dividerLen = 3;
    var value = target.value;

    if (value.length === dividerLen) {
      formCardDate.value = value.slice(0, 2) + '/' + value.slice(2);
    }
  };

  var typeOnlyInt = function (target) {
    var value = target.value;
    var lastChar = value.substr(-1);
    var replacedChar;

    if (isNaN(lastChar) || lastChar === ' ') {
      replacedChar = value.substring(0, value.length - 1);
      target.value = replacedChar;
    }
  };

  var changeInputsPaymentHandler = function (evt) {
    var target = evt.target;

    typeOnlyInt(target);

    switch (target.id) {
      case 'payment__card-date':
        addDividerToDate(target);

        break;
    }
  };

  paymentInputsBlock.addEventListener('change', changeInputsPaymentHandler);
  paymentInputsBlock.addEventListener('keyup', changeInputsPaymentHandler);
  paymentInputsBlock.addEventListener('focusout', formInputsChecker);

})();
