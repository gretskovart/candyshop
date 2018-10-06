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
    }
  };
  removeCards();
  filterBar.addEventListener('click', filterHandler);
})();
