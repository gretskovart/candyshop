'use strict';

var PRODUCTS_PRICE_MAX = 1500;
var PRODUCTS_PRICE_MIN = 100;

var sliderLeft = document.querySelector('.range__btn--left');
var sliderRight = document.querySelector('.range__btn--right');
var rangeFilter = document.querySelector('.range__filter');
var line = rangeFilter.querySelector('.range__fill-line');
var rangePriceRight = document.querySelector('.range__price--max');
var rangePriceLeft = document.querySelector('.range__price--min');
var pinWidth = 5;

// слайдер
var sliderHandler = function (elem) {
  elem.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var currentPinCoord = {
      x: getCoords(evt.target)
    };

    var moveUpHandler = function () {
      document.removeEventListener('mousemove', movePinHandler);
      document.removeEventListener('mouseup', moveUpHandler);
      document.removeEventListener('mouseup', moveUpHandler);

      getPrice(elem);
    };

    var movePinHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var movePosition = moveEvt.clientX;
      var minPosition = rangeFilter.getBoundingClientRect().x;
      var maxPosition = rangeFilter.getBoundingClientRect().x + rangeFilter
      .getBoundingClientRect().width;

      var shift = {
        x: currentPinCoord.x - movePosition
      };

      var coordsWithShift = currentPinCoord.x - shift.x - 85; // смещено на 85 px

      switch (elem) {
        case sliderLeft:
          pinPosition.leftPin = coordsWithShift;
          break;
        case sliderRight:
          pinPosition.rightPin = coordsWithShift;
      }

      // лишние 5 px
/*      if (movePosition - 5 < minPosition || movePosition > maxPosition ||
      elem === sliderRight && pinPosition.rightPin < pinPosition.leftPin ||
      elem === sliderLeft && pinPosition.leftPin > pinPosition.rightPin) {
        document.removeEventListener('mousemove', movePinHandler);
        document.removeEventListener('mouseup', moveUpHandler);
        document.removeEventListener('mouseup', moveUpHandler);
      } else {
        elem.style.left = coordsWithShift + 'px';
      }*/

      if (elem === sliderLeft && movePosition >= 0 && movePosition < pinPosition.rightPin) {
        elem.style.left = movePosition + 'px';
      } else if (elem === sliderRight && movePosition > pinPosition.leftPin &&
        movePosition <= (rangeFilter.clientWidth - pinWidth)) {
        elem.style.left = movePosition + 'px';
      }

      getPrice(elem);

      makeLineFill(elem, coordsWithShift);

    };

    document.addEventListener('mousemove', movePinHandler);
    document.addEventListener('mouseup', moveUpHandler);
    document.addEventListener('mouseup', moveUpHandler);
  });
};

var getPrice = function (elem) {
  switch (elem) {
    case sliderLeft:
      rangePriceLeft.textContent = changeRangePrice(elem);
      break;
    case sliderRight:
      rangePriceRight.textContent = changeRangePrice(elem);
      break;
  }
};

var makeLineFill = function (elem, position) {
  var currentLineCoordRight = rangeFilter.getBoundingClientRect().width - position;
  var currentLineCoordLeft = position;

  switch (elem) {
    case sliderLeft:
      line.style.left = currentLineCoordLeft + 'px';
      break;
    case sliderRight:
      line.style.right = currentLineCoordRight + 'px';
      break;
  }
};

var setDefaultSlider = function (minVal, maxVal) {
  sliderLeft.style.left = 0;
  sliderRight.style.right = 0;
  line.style.left = 0;
  line.style.right = 0;
  rangePriceLeft.textContent = minVal;
  rangePriceRight.textContent = maxVal;

  sliderLeft.style.zIndex = 10;
};

setDefaultSlider(PRODUCTS_PRICE_MIN, PRODUCTS_PRICE_MAX);

var getCoords = function (elem) {
  return parseInt(elem.getBoundingClientRect().x, 10);
};

var pinPosition = {
  leftPin: getCoords(sliderLeft),
  rightPin: getCoords(sliderRight)
};

var changeRangePrice = function (elem) {
  var currentCoords = getCoords(elem);
  var rangeWidth = rangeFilter.getBoundingClientRect().width;
  var calcPercent = Math.round((currentCoords * 100) / (rangeWidth - pinWidth * 2));

  return Math.round((PRODUCTS_PRICE_MAX - PRODUCTS_PRICE_MIN) * (calcPercent / 100) + PRODUCTS_PRICE_MIN);
};

sliderHandler(sliderLeft);
sliderHandler(sliderRight);
