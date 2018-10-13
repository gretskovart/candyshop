'use strict';

(function () {
  var filterBar = document.querySelector('.catalog__sidebar');

  window.getCountOfFilteredCards = function () {
    var count = [];

    // по типу продукта
    var getFilteredByTypeCount = function () {
      var titlesOfType = selectBlockInFilter('food-type').titlesOfFilter;
      var countsBlockOfType = selectBlockInFilter('food-type').countsOfFilter;

      for (var i = 0; i < titlesOfType.length; i++) {
        count[i] = 0;

        for (var j = 0; j < window.productsArray.length; j++) {
          if (window.productsArray[j].kind === titlesOfType[i].textContent) {
            count[i]++;
          }
        }
        countsBlockOfType[i].innerText = '(' + count[i] + ')';
      }
    };

    var getFilteredByNutritionCount = function () {
      var titlesOfNutrition = selectBlockInFilter('food-property').titlesOfFilter;
      var countsBlockOfNutrition = selectBlockInFilter('food-property').countsOfFilter;

      for (var i = 0; i < titlesOfNutrition.length; i++) {
        count[i] = 0;
        for (var j = 0; j < window.productsArray.length; j++) {
          switch (titlesOfNutrition[i].textContent) {
            case 'Без сахара':
              if (!checkNutrition(j, 'sugar')) {
                count[i]++;
              }
              break;
            case 'Вегетарианское':
              if (checkNutrition(j, 'vegetarian')) {
                count[i]++;
              }
              break;
            case 'Безглютеновое':
              if (!checkNutrition(j, 'gluten')) {
                count[i]++;
              }
              break;
          }
        }
        countsBlockOfNutrition[i].innerText = '(' + count[i] + ')';
      }
    };

    var getFilteredByPriceCount = function () {
      var minPrice = document.querySelector('.range__price--min').innerText;
      var maxPrice = document.querySelector('.range__price--max').innerText;
      var countsBlockOfPrice = filterBar.querySelector('.range__price-count .range__count');
      var countPrice = 0;

      for (var j = 0; j < window.productsArray.length; j++) {
        if (window.productsArray[j].price >= minPrice && window.productsArray[j]
        .price <= maxPrice) {
          countPrice++;
        }
      }

      countsBlockOfPrice.innerText = '(' + countPrice + ')';
    };

    var getFilteredByFavoriteCount = function () {
      var catalog = document.querySelector('.catalog__cards');
      var cardFavorite = catalog.querySelectorAll('.card__btn-favorite--selected');
      var countFavorite = cardFavorite.length;
      var countsBlockOfFavorite = selectBlockInFilter('mark').countsOfFilter[0];

      countsBlockOfFavorite.innerText = '(' + countFavorite + ')';
    };

    var getFilteredByInStockCount = function () {
      var countsBlockOfInStock = selectBlockInFilter('mark').countsOfFilter[1];
      count = 0;
      for (var i = 0; i < window.productsArray.length; i++) {
        if (window.productsArray[i].amount !== 0) {
          count++;
        }
      }

      countsBlockOfInStock.innerText = '(' + count + ')';
    };

    window.getFilteredByFavoriteCount = function () {
      var catalog = document.querySelector('.catalog__cards');
      var cardFavorite = catalog.querySelectorAll('.card__btn-favorite--selected');
      count = cardFavorite.length;
      var countsBlockOfFavorite = selectBlockInFilter('mark').countsOfFilter[0];

      countsBlockOfFavorite.innerText = '(' + count + ')';
    };

    var checkNutrition = function (index, prop) {
      return window.productsArray[index].nutritionFacts[prop];
    };

    var selectBlockInFilter = function (title) {
      var blockFilter = {};

      blockFilter.titlesOfFilter = document
      .querySelectorAll('.input-btn__input[name="' + title + '"] + .input-btn__label');
      blockFilter.countsOfFilter = document
      .querySelectorAll('.input-btn__input[name="' + title + '"] + .input-btn__label + .input-btn__item-count');

      return blockFilter;
    };

    getFilteredByTypeCount();
    getFilteredByNutritionCount();
    getFilteredByFavoriteCount();
    getFilteredByInStockCount();
    getFilteredByPriceCount();
  };
})();
