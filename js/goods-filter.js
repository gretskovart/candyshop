'use strict';

(function () {
  var filterBar = document.querySelector('.catalog__sidebar');

  var removeCards = function () {
    var catalogCards = document.querySelectorAll('.catalog__card');

    if (catalogCards) {
      catalogCards.forEach(function (item, i) {
        catalogCards[i].remove();
      });
    }
  };

  var filterByType = function (evt, items) {
    var target = evt.target.innerText;
    var byType = [];
    removeCards();

    items.forEach(function (card, i) {
      if (items[i].kind === target) {
        byType.push(items[i]);
      }
    });
    window.addProductsToPage(byType);
  };

  var filterByNutrition = function (kind, items) {
    var byNutrition = [];
    removeCards();
    items.forEach(function (card, i) {
      switch (kind) {
        case 'sugar':
          if (!items[i].nutritionFacts.sugar) {
            byNutrition.push(items[i]);
          }
          break;
        case 'vegetarian':
          if (items[i].nutritionFacts.vegetarian) {
            byNutrition.push(items[i]);
          }
          break;
        case 'gluten':
          if (!items[i].nutritionFacts.gluten) {
            byNutrition.push(items[i]);
          }
          break;
      }
    });
    window.addProductsToPage(byNutrition);
  };

  var filterByFavorite = function () {
    var favoriteCards = document.querySelectorAll('.card__btn-favorite--selected');
    var favoriteLinks = document.querySelectorAll('.card__btn-favorite');

    if (favoriteCards.length === 0) {
      removeCards();
      showEmptyFilter();
    } else {
      for (var i = 0; i < favoriteLinks.length; i++) {
        if (!favoriteLinks[i].classList.contains('card__btn-favorite--selected')) {
          favoriteLinks[i].closest('.catalog__card').remove();
        }
      }
    }
  };

  var filterByInStock = function () {
    var catalogCards = document.querySelectorAll('.catalog__card');

    for (var i = 0; i < catalogCards.length; i++) {
      if (catalogCards[i].contains('card--soon')) {
        catalogCards[i].remove();
      }
    }
  };

  var showEmptyFilter = function () {
    var cards = document.querySelector('.catalog__cards');
    var emptyFilterTemplate = document.querySelector('#empty-filters').content
    .querySelector('.catalog__empty-filter');
    var emptyFilter = emptyFilterTemplate.cloneNode(true);
    var fragment = document.createDocumentFragment();

    fragment.appendChild(emptyFilter);
    cards.appendChild(fragment);
  };

  // обработчик нажатий на фильтр
  var filterHandler = function (evt) {
    var target = evt.target.innerText;

    switch (target) {
      case 'Мороженое':
      case 'Газировка':
      case 'Жевательная резинка':
      case 'Мармелад':
      case 'Зефир':
        filterByType(evt, window.productsArray);
        break;
      case 'Без сахара':
        filterByNutrition('sugar', window.productsArray);
        break;
      case 'Вегетарианское':
        filterByNutrition('vegetarian', window.productsArray);
        break;
      case 'Безглютеновое':
        filterByNutrition('gluten', window.productsArray);
        break;
      case 'Только избранное':
        filterByFavorite();
        break;
      case 'В наличии':
        filterByInStock();
        break;
    }
  };
  removeCards();
  filterBar.addEventListener('click', filterHandler);
})();
