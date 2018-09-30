'use strict';

(function () {
  var PRODUCTS_PRICE_MAX = 1500;
  var PRODUCTS_PRICE_MIN = 100;
  var PIN_WIDTH_X2 = 10;

  var sliderLeft = document.querySelector('.range__btn--left');
  var sliderRight = document.querySelector('.range__btn--right');
  var rangeFilter = document.querySelector('.range__filter');
  var line = rangeFilter.querySelector('.range__fill-line');
  var rangePriceRight = document.querySelector('.range__price--max');
  var rangePriceLeft = document.querySelector('.range__price--min');
  var rangeWidth = rangeFilter.clientWidth;

  var sliderHandler = function (downEvt) {
    var currentPin = downEvt.target;
    var pinPosition = currentPin.offsetLeft;

    var movePinHandler = function (moveEvt) {
      var movePosition = pinPosition - (downEvt.clientX - moveEvt.clientX);

      if (currentPin === sliderLeft && movePosition >= 0 &&
      movePosition < sliderRight.offsetLeft) {

        currentPin.style.left = movePosition + 'px';
        makeRangePrice(rangePriceLeft, movePosition);
        makeLineFill(sliderLeft, movePosition);

      } else if (currentPin === sliderRight && movePosition > sliderLeft.offsetLeft
      && movePosition <= (rangeWidth - PIN_WIDTH_X2)) {

        currentPin.style.left = movePosition + 'px';
        makeRangePrice(rangePriceRight, movePosition);
        makeLineFill(sliderRight, movePosition);
      }
    };

    var upPinHandler = function () {
      document.removeEventListener('mousemove', movePinHandler);
      document.removeEventListener('mouseup', upPinHandler);
    };

    var getRangePrice = function (position) {
      var calcPercent = Math.round((position * 100) / (rangeWidth - PIN_WIDTH_X2));

      return Math.round((PRODUCTS_PRICE_MAX - PRODUCTS_PRICE_MIN) *
      (calcPercent / 100) + PRODUCTS_PRICE_MIN);
    };

    var makeRangePrice = function (pinPrice, position) {
      pinPrice.textContent = getRangePrice(position);
    };

    var makeLineFill = function (pin, position) {
      switch (pin) {
        case sliderLeft:
          line.style.left = (position + PIN_WIDTH_X2) + 'px';
          break;
        case sliderRight:
          line.style.right = (rangeWidth - position) + 'px';
          break;
      }
    };

    document.addEventListener('mousemove', movePinHandler);
    document.addEventListener('mouseup', upPinHandler);
  };

  sliderLeft.addEventListener('mousedown', sliderHandler);
  sliderRight.addEventListener('mousedown', sliderHandler);

  // обнуляем изначальные значения фильтра
  (function () {
    sliderLeft.style.zIndex = 1;

    sliderLeft.style.left = 0;
    sliderRight.style.right = 0;

    line.style.left = 0;
    line.style.right = 0;

    rangePriceLeft.textContent = PRODUCTS_PRICE_MIN;
    rangePriceRight.textContent = PRODUCTS_PRICE_MAX;
  })();
})();
