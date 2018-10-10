'use strict';

(function () {
  var MAP_PATH_IMG = ['img/map/academicheskaya.jpg', 'img/map/vasileostrovskaya.jpg', 'img/map/rechka.jpg', 'img/map/petrogradskaya.jpg', 'img/map/proletarskaya.jpg', 'img/map/vostaniya.jpg', 'img/map/prosvesheniya.jpg', 'img/map/frunzenskaya.jpg', 'img/map/chernishevskaya.jpg', 'img/map/tehinstitute.jpg'];

  window.form = document.querySelector('.buy form');

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

  // TODO: объединить функции табов
  var togglePayment = function (target) {
    var paymentSection = document.querySelector('.payment');
    var cashWrap = paymentSection.querySelector('.payment__cash-wrap');
    var cardWrap = paymentSection.querySelector('.payment__card-wrap');
    var checkedBtn = paymentSection.querySelector('.toggle-btn__input[checked]');

    cardWrap.classList.toggle('visually-hidden');
    cashWrap.classList.toggle('visually-hidden');
    target.setAttribute('checked', true);
    checkedBtn.removeAttribute('checked');
  };

  var changeMap = function () {
    var delivery = document.querySelector('.deliver');
    var metroAddress = delivery.querySelectorAll('.input-btn__input--radio');
    var metroMap = delivery.querySelector('.deliver__store-map-img');

    var addCurrentMap = function () {
      for (var i = 0; i < metroAddress.length; i++) {
        if (metroAddress[i].checked) {
          metroMap.src = MAP_PATH_IMG[i];
        }
      }
    };

    delivery.addEventListener('click', addCurrentMap);
  };

  changeMap();

  var toggleDelivery = function (target) {
    var deliverySection = document.querySelector('.deliver');
    var store = deliverySection.querySelector('.deliver__store');
    var courier = deliverySection.querySelector('.deliver__courier');
    var checkedBtn = deliverySection.querySelector('.toggle-btn__input[checked]');

    store.classList.toggle('visually-hidden');
    courier.classList.toggle('visually-hidden');
    target.setAttribute('checked', true);
    checkedBtn.removeAttribute('checked');
  };

  var formInputsChecker = function () {
    var formCardNum = window.form.querySelector('#payment__card-number');
    var formCardDate = window.form.querySelector('#payment__card-date');

    var formPaymentInputs = document.querySelector('.payment__inputs')
    .querySelectorAll('input');

    for (var i = 0; i < formPaymentInputs.length; i++) {
      formPaymentInputs[i].addEventListener('blur', function (evt) {
        switch (evt.target) {
          case formCardNum:
            if (!checkLuhnAlgorithm(formCardNum)) {
              formCardNum.setCustomValidity('Введите корректный номер карты');

            } else {
              formCardNum.classList.add('inputChecked');

            }
            break;
          case formCardDate:
            if (!dateChecker(formCardDate)) {
              formCardDate.setCustomValidity('Введите корректный срок действия карты');

            } else {
              formCardNum.classList.add('inputChecked');

            }
            break;
        }
      });
    }

    window.form.addEventListener('submit', function (evt) {
      evt.preventDefault();

      return (formCardNum.classList.contains('inputChecked') && formCardDate
      .classList.contains('inputChecked'));
    });
  };

  formInputsChecker();

  var checkLuhnAlgorithm = function (cardNumber) {
    var arr = cardNumber.value.toString().split('');
    var sum = 0;

    if (arr.length !== 16) {
      return false;
    }

    for (var i = 0; i < arr.length; i++) {
      var integer = parseFloat(arr[i]);
      if (i % 2 === 0) {
        integer *= 2;
      }

      if (integer >= 10) {
        integer -= 9;
      }

      sum += integer;
    }

    return (sum % 10 === 0);
  };

  var dateChecker = function (val) {
    val = val.value;
    var date = new Date();
    var year = date.getFullYear().toString().substr(-2);
    var yearForm = val.substr(-2);
    var month = date.getMonth() + 1;
    var monthForm = val.substr(-10, 2);
    month = parseFloat(month);

    var checkMonth = function () {
      return (monthForm <= 12 && monthForm > 1);
    };

    var checkYear = function () {
      return (yearForm > year) || (yearForm === year) && (monthForm >= month);
    };

    return checkMonth() && checkYear();
  };
})();
