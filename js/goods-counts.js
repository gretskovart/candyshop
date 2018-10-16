'use strict';

(function () {
  var filterBar = document.querySelector('.catalog__sidebar');
  var count = [];

  var selectBlockInFilter = function (title) {
    var blockFilter = {};

    blockFilter.titlesOfFilter = document
    .querySelectorAll('.input-btn__input[name="' + title + '"] + .input-btn__label');
    blockFilter.countsOfFilter = document
    .querySelectorAll('.input-btn__input[name="' + title + '"] + .input-btn__label + .input-btn__item-count');

    return blockFilter;
  };

  window.goodsCounts = {
    getCountOfFilteredCards: function () {

      // по типу продукта
      var getFilteredByTypeCount = function () {
        var titlesOfType = selectBlockInFilter('food-type').titlesOfFilter;
        var countsBlockOfType = selectBlockInFilter('food-type').countsOfFilter;

        titlesOfType.forEach(function (itemTitle, i) {
          count[i] = 0;

          window.productsArray.forEach(function (itemProduct) {
            if (itemProduct.kind === itemTitle.textContent) {
              count[i]++;
            }
          });
          countsBlockOfType[i].innerText = '(' + count[i] + ')';
        });
      };

      var getFilteredByNutritionCount = function () {
        var titlesOfNutrition = selectBlockInFilter('food-property').titlesOfFilter;
        var countsBlockOfNutrition = selectBlockInFilter('food-property').countsOfFilter;

        titlesOfNutrition.forEach(function (itemTitle, i) {
          count[i] = 0;

          window.productsArray.forEach(function (itemProduct, j) {
            switch (itemTitle.textContent) {
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
          });
          countsBlockOfNutrition[i].innerText = '(' + count[i] + ')';
        });
      };

      var getFilteredByPriceCount = function () {
        var minPrice = document.querySelector('.range__price--min').innerText;
        var maxPrice = document.querySelector('.range__price--max').innerText;
        var countsBlockOfPrice = filterBar.querySelector('.range__price-count .range__count');
        var countPrice = 0;

        window.productsArray.forEach(function (item) {
          if (item.price >= minPrice && item.price <= maxPrice) {
            countPrice++;
          }
        });

        countsBlockOfPrice.innerText = '(' + countPrice + ')';
      };

      var getFilteredByInStockCount = function () {
        var countsBlockOfInStock = selectBlockInFilter('mark').countsOfFilter[1];
        count = 0;

        window.productsArray.forEach(function (item) {
          if (item.amount !== 0) {
            count++;
          }
        });

        countsBlockOfInStock.innerText = '(' + count + ')';
      };

      var checkNutrition = function (index, prop) {
        return window.productsArray[index].nutritionFacts[prop];
      };

      getFilteredByTypeCount();
      getFilteredByNutritionCount();
      window.goodsCounts.getFilteredByFavoriteCount();
      getFilteredByInStockCount();
      getFilteredByPriceCount();
    },

    getFilteredByFavoriteCount: function () {
      var catalog = document.querySelector('.catalog__cards');
      var cardFavorite = catalog.querySelectorAll('.card__btn-favorite--selected');
      count = cardFavorite.length;
      var countsBlockOfFavorite = selectBlockInFilter('mark').countsOfFilter[0];

      countsBlockOfFavorite.innerText = '(' + count + ')';
    }
  };
})();
