'use strict';

(function () {
  var similarProductTemplate = document.querySelector('#card').content
  .querySelector('.catalog__card');
  var cards = document.querySelector('.catalog__cards');
  var load = document.querySelector('.catalog__load');

  var showCatalogCards = function () {
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
      var productsRatingList = productElement.querySelector('.stars__rating');
      var productsRatingClassList = productsRatingList.classList;

      productsRatingClassList.remove('stars__rating--five');
      productsRatingClassList.textContent = '';

      switch (product.rating.value) {
        case 1:
          productsRatingClassList.add('stars__rating--one');
          productsRatingList.textContent = 'Рейтинг: 1 звезда';
          break;
        case 2:
          productsRatingClassList.add('stars__rating--two');
          productsRatingList.textContent = 'Рейтинг: 2 звезды';
          break;
        case 3:
          productsRatingClassList.add('stars__rating--three');
          productsRatingList.textContent = 'Рейтинг: 3 звезды';
          break;
        case 4:
          productsRatingClassList.add('stars__rating--four');
          productsRatingList.textContent = 'Рейтинг: 4 звезды';
          break;
        case 5:
          productsRatingClassList.add('stars__rating--five');
          productsRatingList.textContent = 'Рейтинг: 5 звезд';
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
      var catalogImgPath = window.good.productImagePath + product.picture;

      imgProduct.setAttribute('src', catalogImgPath);
      imgProduct.setAttribute('alt', product.name);
    };

    var renderProductFavorite = function () {
      var favoriteButton = productElement.querySelector('.card__btn-favorite');

      if (product.isFavorite) {
        favoriteButton.classList.add('card__btn-favorite--selected');
      }
    };

    var renderDataAttributes = function () {
      window.dataAttributes = ['ice_cream', 'soda', 'bublegum', 'marmelade', 'marshmallow'];
      var type;
      var composition;

      switch (product.kind) {
        case 'Мороженое':
          type = window.dataAttributes[0];
          break;
        case 'Газировка':
          type = window.dataAttributes[1];
          break;
        case 'Жевательная резинка':
          type = window.dataAttributes[2];
          break;
        case 'Мармелад':
          type = window.dataAttributes[3];
          break;
        case 'Зефир':
          type = window.dataAttributes[4];
          break;
      }

      productElement.setAttribute('data-' + type, '1');

      if (product.nutritionFacts.sugar === false) {
        composition = 'no_sugar';
      }
      if (product.nutritionFacts.vegetarian === true) {
        composition = 'vegetarian';
      }
      if (product.nutritionFacts.gluten === false) {
        composition = 'no_gluten';
      }

      productElement.setAttribute('data-' + composition, '1');
    };

    renderProductAmount();
    renderProductName();
    renderProductPrice();
    renderProductRating();
    renderProductCharacteristic();
    renderProductImage();
    renderProductFavorite();
    renderDataAttributes();

    return productElement;
  };

  window.good = {
    addProductsToPage: function (arr) {
      var fragment = document.createDocumentFragment();

      var appendProductsFromArray = function () {
        arr.forEach(function (item) {
          fragment.appendChild(renderProduct(item));
        });
        window.order.productsContainer.appendChild(fragment);
      };

      showCatalogCards();
      appendProductsFromArray(arr);
      window.order.addToCartButtonHandler(); // добавление в корзину
      window.goodsCounts.getCountOfFilteredCards();
      window.order.makeInputsDisabled(); // блокируем инпуты формы
    },

    productImagePath: 'img/cards/'
  };
})();
