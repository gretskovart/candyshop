'use strict';

var PRODUCTS_QUANTITY = 26;

var similarProductTemplate = document.querySelector('#card').content
.querySelector('.catalog__card');
var similarProductCartTemplate = document.querySelector('#card-order').content
.querySelector('.goods_card');
var productsContainer = document.querySelector('.catalog__cards');
var productsCartContainer = document.querySelector('.goods__cards');
var showAllProducts = document.querySelector('.catalog__submit');
var productsArray = [];
var productsCartArray = [];

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
  var goodsCards = document.querySelector('.goods__cards');
  var cardEmpty = document.querySelector('.goods__card-empty');

  cards.classList.remove('catalog__cards--load');
  load.classList.add('visually-hidden');
  goodsCards.classList.remove('goods__cards--empty');
  cardEmpty.style.display = 'none';
};

var renderProductCart = function (product) {
  if (product === undefined) {
    throw new Error('Нет аргументов');
  }

  var productElementCart = similarProductCartTemplate.cloneNode(true);

  var renderProductCartName = function () {
    productElementCart.querySelector('.card-order__title').textContent = product.name;
  };

  var renderProductCartImage = function () {
    var imgProduct = productElementCart.querySelector('.card-order__img');

    imgProduct.setAttribute('src', product.picture);
    imgProduct.setAttribute('alt', product.name);
  };

  var renderProductCartPrice = function () {
    productElementCart.querySelector('.card-order__price').textContent =
    product.price + ' ₽';
  };

  var renderProductCartAmount = function () {
    productElementCart.querySelector('.card-order__count').textContent = product.count;
  };

  renderProductCartName();
  renderProductCartImage();
  renderProductCartPrice();
  renderProductCartAmount();

  return productElementCart;
};

var renderProduct = function (product) {
  var productElement = similarProductTemplate.cloneNode(true);

  var renderProductAmount = function () {
    if (product.amount > 5) {
      productElement.classList.add('card--in-stock');
    } else if (product.amount >= 1 && product.amount <= 5) {
      productElement.classList.add('card--little');
    } else {
      productElement.classList.add('card--soon');
    }
  };

  var renderProductName = function () {
    productElement.querySelector('.card__title').textContent = product.name;
  };

  var renderProductPrice = function () {
    productElement.querySelector('.card__price').innerHtml = product.price
    + '<span class="card__currency">₽</span><span class="card__weight">/ '
    + product.weight + ' Г</span>';
  };

  var renderProductRating = function () {
    var productsRatingClassList = productElement.querySelector('.stars__rating')
    .classList;

    switch (product.rating.value) {
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

    productElement.querySelector('.star__count').textContent = product.rating.number;
  };

  var renderProductCharacteristic = function () {
    if (product.nutritionFacts.sugar) {
      productElement.querySelector('.card__characteristic').textContent = 'Содержит сахар';
    } else {
      productElement.querySelector('.card__characteristic').textContent = 'Без сахара';
    }

    productElement.querySelector('.card__composition-list').textContent = product.nutritionFacts.contents;
  };

  var renderProductImage = function () {
    var imgProduct = productElement.querySelector('.card__img');

    imgProduct.setAttribute('src', product.picture);
    imgProduct.setAttribute('alt', product.name);
  };

  renderProductAmount();
  renderProductName();
  renderProductPrice();
  renderProductRating();
  renderProductCharacteristic();
  renderProductImage();

  return productElement;
};

var addProductsToPage = function () {
  var createProductsArray = function (quantity) {
    for (var i = 0; i < quantity; i++) {
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

  var fragment = document.createDocumentFragment();

  var appendProductsFromArray = function (arr) {
    for (var i = 0; i < PRODUCTS_QUANTITY; i++) {
      fragment.appendChild(renderProduct(arr[i]));
    }

    productsContainer.appendChild(fragment);
  };

  hideCatalogCards();
  appendProductsFromArray(createProductsArray(PRODUCTS_QUANTITY));
};

var addProductsToCart = function (objToCart) {
  var fragment = document.createDocumentFragment();

  fragment.appendChild(renderProductCart(objToCart));
  productsCartContainer.appendChild(fragment);

  removeButtonHandler();
  decreaseCartHandler();
  increaseCartHandler();
};

var addSelectedFavorite = function (evt) {
  evt.preventDefault();

  var target = evt.target;

  while (target !== productsContainer) {
    if (target.classList.contains('card__btn-favorite')) {
      target.classList.toggle('card__btn-favorite--selected');

      return;
    }
    target = target.parentNode;
  }
};

showAllProducts.addEventListener('click', function (evt) {
  evt.preventDefault();
  addProductsToPage();
  addToCartButtonHandler();
});

var favoriteClickHandler = function () {
  productsContainer.addEventListener('click', addSelectedFavorite);
};

favoriteClickHandler();

// добавляем карточку по нажатию на кнопку
var addToCartButtonHandler = function () {
  var addButton = document.querySelectorAll('.card__btn');

  for (var i = 0; i < addButton.length; i++) {
    addButton[i].addEventListener('click', function (evt) {
      var currentCard = evt.target.closest('.catalog__card');
      var currentCardName = currentCard.querySelector('.card__title').textContent;
      var productObj = copyObj(productsArray, currentCardName);

      productsCartArray.push(addProductsToCart(productObj));
    });
  }
};

// копируем объект карточки
var copyObj = function (arr, objName) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].name === objName) {
      var currentObj = arr[i];
    }
  }

  var copy = Object.assign({}, currentObj);

  return copy;
};
// копируем объект карточки

// изменяем количество товаров в корзине
var changeQantityCartObj = function (evt, act) {
  var currentObj = evt.target.closest('.goods_card');
  var cartObjCount = currentObj.querySelector('.card-order__count');
  var currentCount = parseInt(cartObjCount.getAttribute('value'), 10);

  // TODO: сделать условия по-элегантнее
  if (act === 'increase') {
    cartObjCount.setAttribute('value', currentCount += 1);
  } else if (act === 'decrease') {
    if (currentCount !== 1) {
      cartObjCount.setAttribute('value', currentCount -= 1);
    } else {
      removeCartObj(evt);
    }
  }
};

var decreaseCartHandler = function () {
  var decreaseButton = productsCartContainer.querySelectorAll('.card-order__btn--decrease');
  var act = 'decrease';

  for (var i = 0; i < decreaseButton.length; i++) {
    decreaseButton[i].addEventListener('click', function (evt) {
      changeQantityCartObj(evt, act);
    });
  }
};

var increaseCartHandler = function () {
  var increaseButton = productsCartContainer.querySelectorAll('.card-order__btn--increase');
  var act = 'increase';

  for (var i = 0; i < increaseButton.length; i++) {
    increaseButton[i].addEventListener('click', function (evt) {
      changeQantityCartObj(evt, act);
    });
  }
};
// изменяем количество товаров в корзине

// удаляем товар из корзины
var removeCartObj = function (evt) {
  var currentObj = evt.target.closest('.goods_card');
  currentObj.remove();
};

var removeButtonHandler = function () {
  var removeButton = productsCartContainer.querySelectorAll('.card-order__close');

  for (var i = 0; i < removeButton.length; i++) {
    removeButton[i].addEventListener('click', function (evt) {
      evt.preventDefault();
      removeCartObj(evt);
    });
  }
};

// удаляем товар из корзины
