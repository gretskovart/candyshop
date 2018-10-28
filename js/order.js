'use strict';

(function () {
  var orderForm = document.querySelector('#order');
  var submitButton = document.querySelector('.buy__submit-btn');
  var currentObjCatalog;
  var currentObjCart;

  var fullPrice = 0;
  var quantityInCart = 0;

  var productsCartContainer = document.querySelector('.goods__cards');
  var cardEmpty = document.querySelector('.goods__card-empty');

  var addProductsToCart = function (objToCart) {
    var deliverySection = window.form.formBlock.querySelector('.deliver');
    var fragment = document.createDocumentFragment();

    fragment.appendChild(window.renderProductCart(objToCart));
    productsCartContainer.appendChild(fragment);

    showGoodsCards();
    decreaseCartHandler();
    increaseCartHandler();
    window.order.clearInputsDisabled();
    window.form.disableTabInputs(deliverySection);
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

    if (evt.target.classList.contains('card__btn-favorite')) {
      var target = evt.target;
      var cardTitle = target.parentNode.parentNode.parentNode
      .querySelector('.card__title').innerText.toLowerCase();

      if (target.classList.contains('card__btn-favorite')) {
        target.classList.toggle('card__btn-favorite--selected');
      }

      addIsFavoriteProp(cardTitle);
      window.goodsFilter.getFilteredByFavoriteCount();
    }
  };

  var addIsFavoriteProp = function (title) {
    window.productsArray.forEach(function (item) {
      if (item.name.toLowerCase() === title && !item.hasOwnProperty('isFavorite') ||
       item.name.toLowerCase() === title && item.isFavorite === false) {
        item.isFavorite = true;

      } else if (item.name.toLowerCase() === title &&
      item.isFavorite === true) {

        item.isFavorite = false;
      }
    });
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

  window.order = {

    // добавляем карточку по нажатию на кнопку
    addToCartButtonHandler: function (evt) {
      var currentCard = evt.target.closest('.catalog__card');
      var currentCardName = currentCard.querySelector('.card__title').textContent;
      var currentCardPrice = parseFloat(currentCard.querySelector('.card__price').textContent);
      var productObj = copyObj(window.productsArray, currentCardName, currentCardPrice);
      var noSimilar = true;

      if (productObj) {
        if (window.order.productsCartArray.length === 0) {
          window.order.productsCartArray.push(productObj);
          addProductsToCart(productObj);
          renderHeaderProductCartPrice(productObj.price, 1);
        } else {
          window.order.productsCartArray.forEach(function (itemProduct) {
            if (itemProduct.name === currentCardName) {
              changeQantityCartObj(getCurrentCartCard(currentCardName), 1);

              noSimilar = false;
            }
          });
          if (noSimilar) {
            window.order.productsCartArray.push(productObj);
            renderHeaderProductCartPrice(productObj.price, 1);
            addProductsToCart(productObj);
          }
        }
      }
    },

    makeInputsDisabled: function () {
      var orderFormInputs = orderForm.querySelectorAll('input');
      var orderFormTextArea = orderForm.querySelector('textarea');
      var orderFormDelieveryInputs = orderForm.querySelectorAll('.input-btn__input[name="store"]');

      orderFormInputs.forEach(function (item) {
        item.setAttribute('disabled', '');
      });
      orderFormTextArea.setAttribute('disabled', '');
      submitButton.setAttribute('disabled', '');

      orderFormDelieveryInputs.forEach(function (item) {
        item.setAttribute('disabled', '');
      });
    },

    clearInputsDisabled: function () {
      var disabledInputs = orderForm.querySelectorAll('input[disabled]');
      var disableTextArea = orderForm.querySelector('textarea[disabled]');

      disabledInputs.forEach(function (item) {
        item.removeAttribute('disabled');
      });

      disableTextArea.removeAttribute('disabled');
      submitButton.removeAttribute('disabled');
    },

    productsCartArray: [],

    productsContainer: document.querySelector('.catalog__cards')
  };

  // копируем объект карточки
  var copyObj = function (arr, objName, objPrice) {
    var currentObj = {};

    arr.forEach(function (item) {
      if (item.name === objName && item.price === objPrice) {
        currentObj = item;
      }
    });

    var copy = Object.assign({}, currentObj);
    copy.amount = 1;

    return copy;

  };
  // копируем объект карточки

  // изменяем количество товаров в корзине
  var changeQantityCartObj = function (evtTar, act) {
    var currentCard = evtTar.closest('.goods_card');
    var currentName = currentCard.querySelector('.card-order__title').textContent;

    var cartObjCount = currentCard.querySelector('.card-order__count');
    var currentCount = parseInt(cartObjCount.getAttribute('value'), 10);

    var cartObjPrice = currentCard.querySelector('.card-order__price');
    var currentPrice = parseInt(cartObjPrice.innerText, 10);
    var currenProductPrice = getCurrentCartObj(currentName, window.order.productsCartArray).price;

    var cartPrice = currentCard.getAttribute('data-price');
    var currentIntPrice = parseInt(cartPrice, 10);

    currentObjCatalog = getCurrentCartObj(currentName, window.productsArray);
    currentObjCart = getCurrentCartObj(currentName, window.order.productsCartArray);

    switch (act) {
      case 1:
        if (currentObjCatalog.amount > currentObjCart.amount) {
          cartObjCount.setAttribute('value', currentCount += 1);
          currentObjCart.amount += 1;
          cartObjPrice.textContent = currentPrice + currenProductPrice;

          renderHeaderProductCartPrice(currentIntPrice, act);
        }

        break;
      case -1:
        if (currentObjCatalog.amount >= currentObjCart.amount) {
          if (currentCount !== 1) {
            cartObjCount.setAttribute('value', currentCount -= 1);
            currentObjCart.amount -= 1;
            cartObjPrice.textContent = currentPrice - currenProductPrice;

          } else {
            removeCartObj(evtTar);
          }

          renderHeaderProductCartPrice(currentIntPrice, act);
        }

        break;
    }
  };

  var getCurrentCartObj = function (objName, arr) {
    var currentCartObj;

    arr.forEach(function (item) {
      if (item.name === objName) {
        currentCartObj = item;
      }
    });
    return currentCartObj;
  };

  var getCurrentCartCard = function (objName) {
    var goodsTitles = document.querySelectorAll('.card-order__title');
    var currentCard;

    goodsTitles.forEach(function (item) {

      if (item.textContent === objName) {
        currentCard = item;
      }
    });

    return currentCard;
  };

  var decreaseCartHandler = function () {
    var decreaseButton = productsCartContainer.querySelectorAll('.card-order__btn--decrease');
    var lastElem = decreaseButton.length - 1;

    decreaseButton[lastElem].addEventListener('click', function (evt) {
      changeQantityCartObj(evt.target, -1);
    });
  };

  var increaseCartHandler = function () {
    var increaseButton = productsCartContainer.querySelectorAll('.card-order__btn--increase');
    var lastElem = increaseButton.length - 1;

    increaseButton[lastElem].addEventListener('click', function (evt) {
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

    currentObj.remove();

    if (window.order.productsCartArray.length === 1) {
      hideGoodsCards();
      window.order.makeInputsDisabled();
    }

    var indexCurrentObj = window.order.productsCartArray.indexOf(getCurrentCartObj(currentObjName, window.order.productsCartArray));
    window.order.productsCartArray.splice(indexCurrentObj, 1);
  };

  var removeButtonHandler = function () {
    productsCartContainer.addEventListener('click', function (evt) {
      evt.preventDefault();

      if (evt.target.classList.contains('card-order__close')) {
        removeCartObj(evt.target);

        return;
      }
    });
  };

  removeButtonHandler();
  window.order.productsContainer.addEventListener('mouseup', addSelectedFavorite);
})();
