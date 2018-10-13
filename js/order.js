'use strict';

(function () {
  window.productsCartArray = [];
  window.productsContainer = document.querySelector('.catalog__cards');

  var fullPrice = 0;
  var quantityInCart = 0;

  var productsCartContainer = document.querySelector('.goods__cards');
  var cardEmpty = document.querySelector('.goods__card-empty');
  // var showAllProducts = document.querySelector('.catalog__submit');

  var addProductsToCart = function (objToCart) {
    var fragment = document.createDocumentFragment();

    fragment.appendChild(window.renderProductCart(objToCart));
    productsCartContainer.appendChild(fragment);

    showGoodsCards();
    removeButtonHandler();
    decreaseCartHandler();
    increaseCartHandler();
  };

  var showGoodsCards = function () {
    productsCartContainer.classList.remove('goods__cards--empty');
    cardEmpty.style.display = 'none';
  };

  var hideGoodsCards = function () {
    productsCartContainer.classList.add('goods__cards--empty');
    cardEmpty.style.display = 'block';
  };

  var addSelectedFavorite = function (evt) {
    evt.preventDefault();

    var target = evt.target;
    var cardTitle = target.parentNode.parentNode.parentNode
    .querySelector('.card__title').innerText.toLowerCase();

    var addIsFavoriteProp = function () {
      for (var i = 0; i < window.productsArray.length; i++) {
        if (window.productsArray[i].name.toLowerCase() === cardTitle &&
        !!window.productsArray[i].isFavorite === false) {
          window.productsArray[i].isFavorite = true;

          return;
        } else if (window.productsArray[i].name.toLowerCase() === cardTitle &&
        window.productsArray[i].isFavorite === true) {
          window.productsArray[i].isFavorite = false;

          return;
        }
      }
    };

    addIsFavoriteProp();

    while (target !== window.productsContainer) {
      if (target.classList.contains('card__btn-favorite')) {
        target.classList.toggle('card__btn-favorite--selected');
        window.getFilteredByFavoriteCount();

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

  var favoriteClickHandler = function () {
    window.productsContainer.addEventListener('click', addSelectedFavorite);
  };

  favoriteClickHandler();

  // добавляем карточку по нажатию на кнопку
  window.addToCartButtonHandler = function () {
    var addButton = document.querySelectorAll('.card__btn');

    for (var i = 0; i < addButton.length; i++) {
      addButton[i].addEventListener('click', function (evt) {
        var currentCard = evt.target.closest('.catalog__card');
        var currentCardName = currentCard.querySelector('.card__title').textContent;
        var currentCardPrice = parseFloat(currentCard.querySelector('.card__price').textContent);
        var productObj = copyObj(window.productsArray, currentCardName, currentCardPrice);
        var attrAmount = parseFloat(currentCard.getAttribute('amount'));
        if (attrAmount === 0) {
          return;
        }

        if (productObj) {
          if (window.productsCartArray.length === 0) {
            window.productsCartArray.push(productObj);
            addProductsToCart(productObj);
          } else {
            for (var j = 0; j < window.productsCartArray.length; j++) {

              if (window.productsCartArray[j].name === currentCardName) {
                changeQantityCartObj(getCurrentCartCard(currentCardName), 1);
                changeOverallPrice(getCurrentCartCard(currentCardName), 1);

                window.productsCartArray[j].amount += 1;

                return;
              } else {
                window.productsCartArray.push(productObj);
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
    var currentName = currentCard.querySelector('.card-order__title').textContent;

    var cartObjCount = currentCard.querySelector('.card-order__count');
    var currentCount = parseInt(cartObjCount.getAttribute('value'), 10);

    var cartPrice = currentCard.getAttribute('data-price');
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

  var changeOverallPrice = function (evtTar, act) {
    var currentCard = evtTar.closest('.goods_card');
    var cartObjPrice = currentCard.querySelector('.card-order__price');
    var currentPrice = parseInt(cartObjPrice.innerText, 10);
    var currentName = currentCard.querySelector('.card-order__title').textContent;
    var currenProductPrice = getCurrentCartObj(currentName).price;

    switch (act) {
      case 1:
        cartObjPrice.textContent = currentPrice + currenProductPrice;

        break;
      case -1:
        if (currentPrice !== currenProductPrice) {
          cartObjPrice.textContent = currentPrice - currenProductPrice;
        }

        break;
    }
  };

  var getCurrentCartObj = function (objName) {
    for (var i = 0; i < window.productsCartArray.length; i++) {
      if (window.productsCartArray[i].name === objName) {
        var currentCartObj = window.productsCartArray[i];
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
      changeOverallPrice(evt.target, -1);
    });
  };

  var increaseCartHandler = function () {
    var increaseButton = productsCartContainer.querySelectorAll('.card-order__btn--increase');
    var lastElem = increaseButton.length - 1;

    increaseButton[lastElem].addEventListener('click', function (evt) {
      evt.stopPropagation();
      changeQantityCartObj(evt.target, 1);
      changeOverallPrice(evt.target, 1);
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

    currentObj.remove();

    if (window.productsCartArray.length === 0) {
      hideGoodsCards();
    }

    var indexCurrentObj = window.productsCartArray.indexOf(getCurrentCartObj(currentObjName));
    window.productsCartArray.splice(indexCurrentObj, 1);
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
})();
