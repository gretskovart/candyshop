'use strict';

var PRODUCTS_QUANTITY = 26;
var PRODUCTS_PRICE_MAX = 1500;
var PRODUCTS_PRICE_MIN = 100;

var similarProductTemplate = document.querySelector('#card').content
.querySelector('.catalog__card');
var similarProductCartTemplate = document.querySelector('#card-order').content
.querySelector('.goods_card');
var productsContainer = document.querySelector('.catalog__cards');
var productsCartContainer = document.querySelector('.goods__cards');
var showAllProducts = document.querySelector('.catalog__submit');
var fullPrice = 0;
var quantityInCart = 0;
var cards = document.querySelector('.catalog__cards');
var load = document.querySelector('.catalog__load');
var cardEmpty = document.querySelector('.goods__card-empty');
var productsArray = [];
var productsCartArray = [];

var sliderLeft = document.querySelector('.range__btn--left');
var sliderRight = document.querySelector('.range__btn--right');
var rangeFilter = document.querySelector('.range__filter');
var line = rangeFilter.querySelector('.range__fill-line');
var rangePriceRight = document.querySelector('.range__price--max');
var rangePriceLeft = document.querySelector('.range__price--min');

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

var showCatalogCards = function () {
// вынести 2-ую функцию
  cards.classList.remove('catalog__cards--load');
  load.classList.add('visually-hidden');
};

var showGoodsCards = function () {
  productsCartContainer.classList.remove('goods__cards--empty');
  cardEmpty.style.display = 'none';
};

var hideGoodsCards = function () {
  productsCartContainer.classList.add('goods__cards--empty');
  cardEmpty.style.display = 'block';
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
    productElementCart.querySelector('.card-order__count').setAttribute('value', 1);
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
    productElement.setAttribute('amount', product.amount);
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
    productElement.querySelector('.card__price').innerHTML = product.price
    + '<span class="card__currency">₽</span><span class="card__weight">/ '
    + product.weight + ' Г</span>';
  };

  var renderProductRating = function () {
    var productsRatingClassList = productElement.querySelector('.stars__rating')
    .classList;
    productsRatingClassList.remove('stars__rating--five');

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

  showCatalogCards();
  appendProductsFromArray(createProductsArray(PRODUCTS_QUANTITY));
};

var addProductsToCart = function (objToCart) {
  var fragment = document.createDocumentFragment();

  fragment.appendChild(renderProductCart(objToCart));
  productsCartContainer.appendChild(fragment);

  showGoodsCards();
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

var renderHeaderProductCartPrice = function (price, act, qnty) {
  var headerCart = document.querySelector('.main-header__basket');
  switch (act) {
    case 1:
      fullPrice += price;
      quantityInCart += 1;

      break;
    case -1:
      if (quantityInCart <= 1 || quantityInCart === qnty) {
        headerCart.textContent = 'В корзине ничего нет';
        quantityInCart = 0;
        fullPrice = 0;

        return;

      } else {
        fullPrice -= price;
        quantityInCart -= (qnty) ? qnty : 1;
      }

      break;
  }

  headerCart.textContent = 'В корзине ' + quantityInCart + ' товар' +
  getCorrectEnds(quantityInCart) + ' на ' + fullPrice + '₽';
};

var getCorrectEnds = function (quantity) {
  var ends = ['', 'а', 'ов'];
  var number = (quantity > 10 && quantity < 21) ? 10 : quantity;
  var lastInteger = number.toString().slice(-1);
  var end;

  lastInteger = parseInt(lastInteger, 10);

  switch (lastInteger) {
    case 1:
      end = ends[0];

      break;
    case 2:
    case 3:
    case 4:
      end = ends[1];

      break;
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 0:
      end = ends[2];

      break;
  }

  return end;
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
      var currentCardPrice = parseFloat(currentCard.querySelector('.card__price').textContent);
      var productObj = copyObj(productsArray, currentCardName, currentCardPrice);
      var attrAmount = parseFloat(currentCard.getAttribute('amount'));
      if (attrAmount === 0) {
        return;
      }

      if (productObj) {
        if (productsCartArray.length === 0) {
          productsCartArray.push(productObj);
          addProductsToCart(productObj);
        } else {
          for (var j = 0; j < productsCartArray.length; j++) {
            if (productsCartArray[j].name === currentCardName) {
              changeQantityCartObj(getCurrentCartCard(currentCardName), 1);
              productsCartArray[j].amount += 1;
              return;
            } else {
              productsCartArray.push(productObj);
              addProductsToCart(productObj);
            }
          }
        }
      }
      renderHeaderProductCartPrice(productObj.price, 1);
    });
  }
};

// копируем объект карточки
var copyObj = function (arr, objName, objPrice) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].name === objName && arr[i].price === objPrice) {
      var currentObj = arr[i];
    }
  }
  if (currentObj.amount > 0) {
    currentObj.amount -= 1;
  }

  if (currentObj.amount < 1) {
    return false;
  } else {
    var copy = Object.assign({}, currentObj);
    copy.amount = 1;

    return copy;
  }
};
// копируем объект карточки

// изменяем количество товаров в корзине
var changeQantityCartObj = function (evtTar, act) {
  var currentCard = evtTar.closest('.goods_card');
  var cartObjCount = currentCard.querySelector('.card-order__count');
  var currentCount = parseInt(cartObjCount.getAttribute('value'), 10);
  var cartPrice = currentCard.querySelector('.card-order__price').textContent;
  var currentName = currentCard.querySelector('.card-order__title').textContent;
  var currentIntPrice = parseInt(cartPrice, 10);

  switch (act) {
    case 1:
      cartObjCount.setAttribute('value', currentCount += 1);
      getCurrentCartObj(currentName).amount += 1;

      break;
    case -1:
      if (currentCount !== 1) {
        cartObjCount.setAttribute('value', currentCount -= 1);
        getCurrentCartObj(currentName).amount -= 1;
      } else {
        removeCartObj(evtTar);
      }

      break;
  }

  renderHeaderProductCartPrice(currentIntPrice, act);
};

var getCurrentCartObj = function (objName) {
  for (var i = 0; i < productsCartArray.length; i++) {
    if (productsCartArray[i].name === objName) {
      var currentCartObj = productsCartArray[i];
    }
  }
  return currentCartObj;
};

var getCurrentCartCard = function (objName) {
  var goodsTitles = document.querySelectorAll('.card-order__title');

  for (var i = 0; i < goodsTitles.length; i++) {
    if (goodsTitles[i].textContent === objName) {
      var currentCard = goodsTitles[i];
    }
  }

  return currentCard;
};

var decreaseCartHandler = function () {
  var decreaseButton = productsCartContainer.querySelectorAll('.card-order__btn--decrease');
  var lastElem = decreaseButton.length - 1;

  decreaseButton[lastElem].addEventListener('click', function (evt) {
    evt.stopPropagation();
    changeQantityCartObj(evt.target, -1);
  });
};

var increaseCartHandler = function () {
  var increaseButton = productsCartContainer.querySelectorAll('.card-order__btn--increase');
  var lastElem = increaseButton.length - 1;

  increaseButton[lastElem].addEventListener('click', function (evt) {
    evt.stopPropagation();
    changeQantityCartObj(evt.target, 1);
  });
};
// изменяем количество товаров в корзине

// удаляем товар из корзины
var removeCartObj = function (evtTar) {
  var currentObj = evtTar.closest('.goods_card');
  var currentObjQuantity = currentObj.querySelector('.card-order__count');
  var currentObjQuantityVal = parseInt(currentObjQuantity.getAttribute('value'), 10);
  var cartPrice = currentObj.querySelector('.card-order__price').textContent;
  var currentObjFullPrice = parseInt(cartPrice, 10) * currentObjQuantityVal;
  var currentObjName = currentObj.querySelector('.card-order__title').textContent;

  renderHeaderProductCartPrice(currentObjFullPrice, -1, currentObjQuantityVal);

  if (productsCartArray.length === 1) {
    hideGoodsCards();
  }

  currentObj.remove();

  var indexCurrentObj = productsCartArray.indexOf(getCurrentCartObj(currentObjName));
  productsCartArray.splice(indexCurrentObj, 1);

  // TODO: hideCatalogCards(); при условии пустого глобально массива
};

var removeButtonHandler = function () {
  var removeButton = productsCartContainer.querySelectorAll('.card-order__close');

  for (var i = 0; i < removeButton.length; i++) {
    removeButton[i].addEventListener('click', function (evt) {
      evt.preventDefault();
      removeCartObj(evt.target);
    });
  }
};

// удаляем товар из корзины

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

      if (movePosition < minPosition || movePosition > maxPosition ||
      elem === sliderRight && pinPosition.rightPin < pinPosition.leftPin ||
      elem === sliderLeft && pinPosition.leftPin > pinPosition.rightPin) {
        document.removeEventListener('mousemove', movePinHandler);
        document.removeEventListener('mouseup', moveUpHandler);
        document.removeEventListener('mouseup', moveUpHandler);
      } else {
        elem.style.left = coordsWithShift + 'px';
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
  var startCoords = getCoords(rangeFilter);
  var rangeWidth = rangeFilter.getBoundingClientRect().width;
  var countPerPx = Math.round(PRODUCTS_PRICE_MAX / rangeWidth);

  return Math.round((currentCoords - startCoords) * countPerPx);
};

sliderHandler(sliderLeft);
sliderHandler(sliderRight);

var formInputsChecker = function () {
  var form = document.querySelector('.buy form');
  var formCardNum = form.querySelector('#payment__card-number');
  var formCardDate = form.querySelector('#payment__card-date');

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

  form.addEventListener('submit', function () {
    return (formCardNum.classList.contains('inputChecked') && formCardDate
    .classList.contains('inputChecked'));
  });
};

formInputsChecker();

var checkLuhnAlgorithm = function (cardNumber) {
  var arr = cardNumber.value.toString().split('');
  var sum = 0;

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
