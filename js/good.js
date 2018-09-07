'use strict';

var getRandomFromArray = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

var getRandomInteger = function (min, max) {
  var rand = Math.floor(min + Math.random() * (max + 1 - min));

  return rand;
};
