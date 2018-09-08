'use strict';

var getRandomFromArray = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

var getRandomInteger = function (min, max) {
  var rand = Math.floor(min + Math.random() * (max + 1 - min));

  return rand;
};

var getProductNames = function () {
  var productsName = [
    'Чесночные сливки',
    'Огуречный педант',
    'Молочная хрюша',
    'Грибной шейк',
    'Баклажановое безумие',
    'Паприколу итальяно',
    'Нинзя-удар васаби',
    'Хитрый баклажан',
    'Горчичный вызов',
    'Кедровая липучка',
    'Корманный портвейн',
    'Чилийский задира',
    'Беконовый взрыв',
    'Арахис vs виноград',
    'Сельдерейная душа',
    'Початок в бутылке',
    'Чернющий мистер чеснок',
    'Раша федераша',
    'Кислая мина',
    'Кукурузное утро',
    'Икорный фуршет',
    'Новогоднее настроение',
    'С пивком потянет',
    'Мисс креветка',
    'Бесконечный взрыв',
    'Невинные винные',
    'Бельгийское пенное',
    'Острый язычок'
  ];
};

var getProductImage = function () {
  var productImageName = [
    'ice-garlic.jpg',
    'ice-cucumber.jpg',
    'ice-pig.jpg',
    'ice-mushroom.jpg',
    'ice-eggplant.jpg',
    'ice-italian.jpg',
    'gum-wasabi.jpg',
    'gum-eggplant.jpg',
    'gum-mustard.jpg',
    'gum-cedar.jpg',
    'gum-portwine.jpg',
    'gum-chile.jpg',
    'soda-bacon.jpg',
    'soda-peanut-grapes.jpg',
    'soda-celery.jpg',
    'soda-cob.jpg',
    'soda-garlic.jpg',
    'soda-russian.jpg',
    'marmalade-sour.jpg',
    'marmalade-corn.jpg',
    'marmalade-caviar.jpg',
    'marmalade-new-year.jpg',
    'marmalade-beer.jpg',
    'marshmallow-shrimp.jpg',
    'marshmallow-bacon.jpg',
    'marshmallow-wine.jpg',
    'marshmallow-beer.jpg',
    'marshmallow-spicy.jpg'
  ];

  var productImagePath = 'img/cards/';

  return productImagePath + getRandomFromArray(productImageName);
};

var getProductAmount = function () {
  return getRandomInteger(0, 20);
};

var getProductPrice = function () {
  return getRandomInteger(100, 1500);
};

var getProductWeight = function () {
  return getRandomInteger(30, 300);
};

var getProductRating = function () {
  var productRating = {
    value: getRandomInteger(),
    number: getProductRatingNumber()
  };

  var getProductRatingValue = function () {
    return getRandomInteger(1, 5);
  };

  var getProductRatingNumber = function () {
    return getRandomInteger(10, 900);
  };

  return productRating();
};

var getProductNutritionFacts = function () {
  var nutritionFacts = [
    sugar: getProductNutritionFactsIsSugar(),
    energy: ,
    contents:
  ];

  var getProductNutritionFactsIsSugar = function () {
    return getRandomInteger(0, 1) = 1 ? true : false;
  };

  var getProductNutritionFactsEnergy = function () {
      return getRandomInteger(70, 500);
  };

  var getProductNutritionFactsContents = function () {
    var ProductNutritionFactsContents = {
      'молоко',
      'сливки',
      'вода',
      'пищевой краситель',
      'патока',
      'ароматизатор бекона',
      'ароматизатор свинца',
      'ароматизатор дуба, идентичный натуральному',
      'ароматизатор картофеля',
      'лимонная кислота',
      'загуститель',
      'эмульгатор',
      'консервант: сорбат калия',
      'посолочная смесь: соль, нитрит натрия',
      'ксилит',
      'карбамид',
      'вилларибо',
      'виллабаджо'
    };

    var productContentsLen = getRandomInteger(0, ProductNutritionFactsContents
      .length);
    var productsContents = ProductNutritionFactsContents[productContentsLen - 1];

    for (var i = 0; i < productContentsLen; i++) {
      var randomContent  = '';

      randomContent += (i < productContentsLen - 1) ? productsContents + ', ' :
      productsContents;
    }
  };

  return nutritionFacts;
};
