'use strict';

(function () {
  var filterBar = document.querySelector('.catalog__sidebar');
  var count = [];

  window.goodsCounts = {
    getCountOfFilteredCards: function () {

      var getFilteredByTypeCount = function () {
        var titlesOfType = window.goodsCounts.selectBlockInFilter('food-type').titlesOfFilter;
        var countsBlockOfType = window.goodsCounts.selectBlockInFilter('food-type').countsOfFilter;

        titlesOfType.forEach(function (itemTitle, i) {
          count = 0;

          window.productsArray.forEach(function (itemProduct) {
            if (itemProduct.kind === itemTitle.textContent) {
              count++;
            }
          });
          countsBlockOfType[i].innerText = '(' + count + ')';
        });
      };

      var getFilteredByNutritionCount = function () {
        var titlesOfNutrition = window.goodsCounts.selectBlockInFilter('food-property').titlesOfFilter;
        var countsBlockOfNutrition = window.goodsCounts.selectBlockInFilter('food-property').countsOfFilter;

        titlesOfNutrition.forEach(function (itemTitle, i) {
          count = 0;

          window.productsArray.forEach(function (itemProduct, j) {
            switch (itemTitle.textContent) {
              case 'Без сахара':
                if (!checkNutrition(j, 'sugar')) {
                  count++;
                }
                break;
              case 'Вегетарианское':
                if (checkNutrition(j, 'vegetarian')) {
                  count++;
                }
                break;
              case 'Безглютеновое':
                if (!checkNutrition(j, 'gluten')) {
                  count++;
                }
                break;
            }
          });
          countsBlockOfNutrition[i].innerText = '(' + count + ')';
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
        var countsBlockOfInStock = window.goodsCounts.selectBlockInFilter('mark').countsOfFilter[1];
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
      window.goodsFilter.getFilteredByFavoriteCount();
      getFilteredByInStockCount();
      getFilteredByPriceCount();
    },

    selectBlockInFilter: function (title) {
      var blockFilter = {};

      blockFilter.titlesOfFilter = document
      .querySelectorAll('.input-btn__input[name="' + title + '"] + .input-btn__label');
      blockFilter.countsOfFilter = document
      .querySelectorAll('.input-btn__input[name="' + title + '"] + .input-btn__label + .input-btn__item-count');

      return blockFilter;
    }
  };
})();
