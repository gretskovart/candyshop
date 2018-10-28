'use strict';

(function () {
  var filterBar = document.querySelector('.catalog__sidebar');
  var showButton = filterBar.querySelector('.catalog__submit');
  var MapOfKinds = {'icecream': 'Мороженое', 'marshmallows': 'Зефир', 'soda': 'Газировка', 'gum': 'Жевательная резинка', 'marmalade': 'Мармелад'};
  var allCheckedItems;

  var allCheckedItemsFilter = {
    'filter-icecream': function (item) {
      return item.kind === MapOfKinds['icecream'];
    },
    'filter-soda': function (item) {
      return item.kind === MapOfKinds['soda'];
    },
    'filter-gum': function (item) {
      return item.kind === MapOfKinds['gum'];
    },
    'filter-marmalade': function (item) {
      return item.kind === MapOfKinds['marmalade'];
    },
    'filter-marshmallows': function (item) {
      return item.kind === MapOfKinds['marshmallows'];
    },
    'filter-sugar-free': function (item) {
      return item.nutritionFacts.sugar === false;
    },
    'filter-vegetarian': function (item) {
      return item.nutritionFacts.vegetarian === true;
    },
    'filter-gluten-free': function (item) {
      return item.nutritionFacts.gluten === false;
    },
    'filter-price': function (item) {
      var minPriceFilter = filterBar.querySelector('.range__price--min').innerText;
      var maxPriceFilter = filterBar.querySelector('.range__price--max').innerText;

      return item.price >= minPriceFilter && item.price <= maxPriceFilter;
    },
    'filter-favorite': function (item) {
      return item.isFavorite === true;
    },
    'filter-in-stock': function (item) {
      return item.amount > 0;
    },
  };

  var fillObjByFilterItems = function () {
    var checkedFilterItems = {
      typeItems: filterBar.querySelectorAll('.input-btn__input[name="food-type"]:checked'),
      propertyItems: filterBar.querySelectorAll('.input-btn__input[name="food-property"]:checked'),
      favoriteItem: filterBar.querySelectorAll('#filter-favorite:checked'),
      inStockItem: filterBar.querySelectorAll('#filter-availability:checked'),
      sortItems: filterBar.querySelectorAll('.input-btn__input[name="sort"]:checked'),
    };

    allCheckedItems = {
      type: [],
      property: [],
      price: {
        min: parseInt(filterBar.querySelector('.range__price--min').innerText, 10),
        max: parseInt(filterBar.querySelector('.range__price--max').innerText, 10)
      },
      favorite: '',
      inStock: '',
      sort: ''
    };

    var fillByItems = function (checked, allChecked) {
      var len = checked.length;

      if (len) {
        checked.forEach(function (item) {
          allChecked.push(item.id);
        });
      }
    };

    var fillByFavoriteItem = function () {
      if (checkedFilterItems.favoriteItem.length) {
        allCheckedItems.favorite = 1;
      }
    };

    var fillByinStockItem = function () {
      if (checkedFilterItems.inStockItem.length) {
        allCheckedItems.inStock = 1;
      }
    };

    var fillBySortItems = function () {
      var sortLen = checkedFilterItems.sortItems.length;

      if (sortLen) {
        checkedFilterItems.sortItems.forEach(function (item) {
          allCheckedItems.sort = item.id;
        });
      }
    };

    fillByItems(checkedFilterItems.typeItems, allCheckedItems.type);
    fillByItems(checkedFilterItems.propertyItems, allCheckedItems.property);
    fillByFavoriteItem();
    fillByinStockItem();
    fillBySortItems();
  };

  var filterCards = {
    byType: function (item) {
      var statusType = 0;
      var typeLen = allCheckedItems.type.length;

      if (typeLen) {
        statusType = allCheckedItems.type.filter(function (itemType) {
          return allCheckedItemsFilter[itemType](item);
        }).length;

      } else {
        statusType++;
      }

      return !!statusType;
    },
    byProperty: function (item) {
      var statusProp = 0;
      var propLen = allCheckedItems.property.length;

      if (propLen) {
        statusProp = allCheckedItems.property.filter(function (itemProperty) {
          return allCheckedItemsFilter[itemProperty](item);
        }).length;

        statusProp = statusProp === propLen;

      } else {
        statusProp++;
      }

      return !!statusProp;
    },
    byPrice: function (item) {
      return allCheckedItemsFilter['filter-price'](item);
    },
    byFavorite: function (item) {
      if (allCheckedItems.favorite === 1) {
        return allCheckedItemsFilter['filter-favorite'](item);
      } else {
        return true;
      }
    },
    byInstock: function (item) {
      if (allCheckedItems.inStock === 1) {
        return allCheckedItemsFilter['filter-in-stock'](item);
      } else {
        return true;
      }
    }
  };

  var getSortedArr = {
    'filter-expensive': function (a, b) {
      return b.price - a.price;
    },
    'filter-cheep': function (a, b) {
      return a.price - b.price;
    },
    'filter-rating': function (a, b) {
      if (b.rating.value - a.rating.value === 0) {
        return b.rating.number - a.rating.number;
      } else {
        return b.rating.value - a.rating.value;
      }
    }
  };

  window.goodsFilter = {
    useFilter: function () {
      fillObjByFilterItems();

      var filteredArr = [];

      filteredArr = window.productsArray.filter(filterCards.byType);
      filteredArr = filteredArr.filter(filterCards.byProperty);
      filteredArr = filteredArr.filter(filterCards.byPrice);
      filteredArr = filteredArr.filter(filterCards.byFavorite);
      filteredArr = filteredArr.filter(filterCards.byInstock);

      if (allCheckedItems.sort) {
        var copyItems;

        copyItems = filteredArr.slice();

        if (allCheckedItems.sort === 'filter-popular') {
          filteredArr = copyItems;
        } else {
          filteredArr = filteredArr.sort(getSortedArr[allCheckedItems.sort]);
        }
      }

      getEmptyFilter(filteredArr);
      window.good.addProductsToPage(filteredArr);
    },

    getFilteredByFavoriteCount: function () {
      var countsBlockOfFavorite = window.goodsCounts.selectBlockInFilter('mark').countsOfFilter[0];
      var countOfFavorite = 0;

      window.productsArray.forEach(function (item) {
        if (item.isFavorite) {
          countOfFavorite++;
        }
      });

      countsBlockOfFavorite.innerText = '(' + countOfFavorite + ')';
    }
  };

  var showEmptyFilter = function (act) {
    var cards = document.querySelector('.catalog__cards');
    var emptyFilterTemplate = document.querySelector('#empty-filters').content
    .querySelector('.catalog__empty-filter');
    var emptyFilterDom = cards.querySelector('.catalog__empty-filter');
    var emptyFilter = emptyFilterTemplate.cloneNode(true);
    var fragment = document.createDocumentFragment();

    switch (act) {
      case 'show':
        if (!emptyFilterDom) {
          fragment.appendChild(emptyFilter);
          cards.appendChild(fragment);
        }
        break;
      case 'hide':
        if (emptyFilterDom) {
          emptyFilterDom.remove();
        }
        break;
    }
  };

  var clearAllInputs = function () {
    var inputs = filterBar.querySelectorAll('input');
    var inputOfPopular = filterBar.querySelector('#filter-popular');

    inputs.forEach(function (item) {
      item.checked = false;
    });

    inputOfPopular.checked = true;
  };

  var clearMarksInputs = function (evt) {
    var target = evt.target;
    var isInputChecked;

    if (target.name === 'mark') {
      isInputChecked = target.checked;

      showAll(evt);

      target.checked = isInputChecked;
    }

    window.goodsFilter.useFilter();
  };

  var getEmptyFilter = function (arr) {
    if (arr.length) {
      showEmptyFilter('hide');

    } else {
      showEmptyFilter('show');
    }
  };

  var showAll = function (evt) {
    evt.preventDefault();

    showEmptyFilter('hide');
    clearAllInputs();
    window.clearPrice();
    window.goodsFilter.useFilter();
  };

  filterBar.addEventListener('change', clearMarksInputs);
  showButton.addEventListener('click', showAll);
})();
