'use strict';

var PRODUCTS_QUANTITY = 26;

var similarProductTemplate = document.querySelector('#card').content
.querySelector('.catalog__card');
var productsContainer = document.querySelector('.catalog__cards');

var getRandomFromArray = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
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

  return getRandomFromArray(productsName);
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
  var getProductRatingValue = function () {
    return getRandomInteger(1, 5);
  };

  var getProductRatingNumber = function () {
    return getRandomInteger(10, 900);
  };

  var productRating = {
    value: getProductRatingValue(),
    number: getProductRatingNumber()
  };

  return productRating;
};

var getProductNutritionFacts = function () {
  var getProductNutritionFactsIsSugar = function () {
    return (getRandomInteger(0, 1) === 1) ? true : false;
  };

  var getProductNutritionFactsEnergy = function () {
    return getRandomInteger(70, 500);
  };

  var getProductNutritionFactsContents = function () {
    var ProductNutritionFactsContents = [
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
    ];

    var productContentsLen = getRandomInteger(0, ProductNutritionFactsContents
      .length);
    var productsContents = ProductNutritionFactsContents[productContentsLen - 1];

    for (var i = 0; i < productContentsLen; i++) {
      var randomContent = '';

      randomContent += (i < productContentsLen - 1) ? productsContents + ', ' :
        productsContents;
    }

    return randomContent;
  };

  var nutritionFacts = {
    sugar: getProductNutritionFactsIsSugar(),
    energy: getProductNutritionFactsEnergy(),
    contents: getProductNutritionFactsContents()
  };

  return nutritionFacts;
};

var hideCatalogCards = function () {
  var cards = document.querySelector('.catalog__cards');
  var load = document.querySelector('.catalog__load');

  cards.classList.remove('catalog__cards--load');
  load.classList.add('visually-hidden');
};

hideCatalogCards();

var createProductsArray = function () {
  var productsArray = [];

  for (var i = 0; i < PRODUCTS_QUANTITY; i++) {
    productsArray[i] = {
      name: getProductNames(),
      picture: getProductImage(),
      amount: getProductAmount(),
      price: getProductPrice(),
      weight: getProductWeight(),
      rating: getProductRating(),
      nutritionFacts: getProductNutritionFacts()
    };
  }

  return productsArray;
};

var renderProduct = function (product) {
  var productElement = similarProductTemplate.cloneNode(true);
  var productsArray = createProductsArray();

  for (var i = 0; i < productsArray.length; i++) {
    var renderProductAmount = function () {
      if (productsArray[i].amount > 5) {
        productElement.classList.add('card--in-stock');
      } else if (productsArray.amount >= 1 && product.amount <= 5) {
        productElement.classList.add('card--little');
      } else {
        productElement.classList.add('card--soon');
      }
    };

    var renderProductName = function () {
      productElement.querySelector('.card__title').textContent = productElement
      .name;
    };

    var renderProductPrice = function () {
      productElement.querySelector('.card__price').textContent = productElement
      .price;
      productElement.querySelector('.card__price').textContent = '/ ' +
      productElement.weight + ' Г';
    };

    var renderProductRating = function () {
      var productsRatingClassList = productElement.querySelector('.stars__rating')
      .classList;

      switch (productsArray[i].rating.value) {
        case 1:
          productsRatingClassList.add('stars__rating--one');
          break;
        case 2:
          productsRatingClassList.add('stars__rating--two');
          break;
        case 3:
          productsRatingClassList.add('stars__rating--three');
          break;
        case 4:
          productsRatingClassList.add('stars__rating--four');
          break;
        case 5:
          productsRatingClassList.add('stars__rating--five');
          break;
      }

      productElement.querySelector('.star__count').textContent = productElement
      .rating.number;
    };

    var renderProductCharacteristic = function () {
      if (productsArray[i].nutritionFacts.sugar) {
        productElement.querySelector('.card__characteristic').textContent =
        'Содержит сахар';
      } else {
        productElement.querySelector('.card__characteristic').textContent =
        'Без сахара';
      }

      productElement.querySelector('.card__composition-list').textContent =
      productElement.nutritionFacts.contents;
    };
  }

  renderProductAmount();
  renderProductName();
  renderProductPrice();
  renderProductRating();
  renderProductCharacteristic();
};

var addProductsToPage = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < PRODUCTS_QUANTITY; i++) {
    fragment.appendChild(renderProduct(createProductsArray(i)));
  }

  productsContainer.appendChild(fragment);
};

addProductsToPage();
