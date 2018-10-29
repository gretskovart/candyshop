'use strict';

(function () {
  var PRODUCTS_PRICE_MAX = 90;
  var PRODUCTS_PRICE_MIN = 0;
  var PIN_WIDTH_X2 = 10;

  var filterBar = document.querySelector('.catalog__sidebar');
  var rangeFilter = filterBar.querySelector('.range__filter');
  var sliderLeft = rangeFilter.querySelector('.range__btn--left');
  var sliderRight = rangeFilter.querySelector('.range__btn--right');
  var line = rangeFilter.querySelector('.range__fill-line');
  var rangePriceRight = filterBar.querySelector('.range__price--max');
  var rangePriceLeft = filterBar.querySelector('.range__price--min');
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
      filterBar.removeEventListener('mousemove', movePinHandler);
      filterBar.removeEventListener('mouseup', upPinHandler);
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

    filterBar.addEventListener('mousemove', movePinHandler);
    filterBar.addEventListener('mouseup', upPinHandler);
    // фильтр товаров по цене
    filterBar.addEventListener('mouseup', window.goodsFilter.useFilter);
  };

  sliderLeft.addEventListener('mousedown', sliderHandler);
  sliderRight.addEventListener('mousedown', sliderHandler);

  // обнуляем изначальные значения фильтра
  window.clearPrice = function () {
    sliderLeft.style.zIndex = 1;

    sliderLeft.style.left = 0;
    sliderRight.style.right = 0;
    sliderLeft.style.right = 'inherit';
    sliderRight.style.left = 'inherit';

    line.style.left = 0;
    line.style.right = 0;

    rangePriceLeft.textContent = PRODUCTS_PRICE_MIN;
    rangePriceRight.textContent = PRODUCTS_PRICE_MAX;
  };

  window.clearPrice();
})();
