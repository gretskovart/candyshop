'use strict';

(function () {
  var PRODUCTS_QUANTITY = 26;

  document.productImagePath = 'img/cards/'

  var similarProductTemplate = document.querySelector('#card').content
  .querySelector('.catalog__card');
  var cards = document.querySelector('.catalog__cards');
  var load = document.querySelector('.catalog__load');

  var showCatalogCards = function () {
  // вынести 2-ую функцию
    cards.classList.remove('catalog__cards--load');
    load.classList.add('visually-hidden');
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
      var catalogImgPath = document.productImagePath + product.picture;

      imgProduct.setAttribute('src', catalogImgPath);
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

  window.addProductsToPage = function () {
    var fragment = document.createDocumentFragment();

    var appendProductsFromArray = function (arr) {
      for (var i = 0; i < PRODUCTS_QUANTITY; i++) {
        fragment.appendChild(renderProduct(arr[i]));
      }

      window.productsContainer.appendChild(fragment);
    };

    showCatalogCards();
    appendProductsFromArray(window.productsArray);
  };
})();
