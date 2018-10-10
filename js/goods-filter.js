'use strict';

(function () {
  var filterBar = document.querySelector('.catalog__sidebar');
  var filterCheckboxes = filterBar.querySelectorAll('.input-btn__input--checkbox');
  var filterLabels = filterBar.querySelectorAll('.input-btn__label--checkbox');
  var showAllButton = filterBar.querySelector('.catalog__submit');
  var emptyBlock;

  var removeCards = function () {
    var catalogCards = document.querySelectorAll('.catalog__card');

    if (catalogCards) {
      catalogCards.forEach(function (item, i) {
        catalogCards[i].remove();
      });
    }
  };

  var isFilterLinkChecked = function (title) {
    var index = 0;

    for (var i = 0; i < filterCheckboxes.length; i++) {
      if (filterCheckboxes[i].checked === true && filterLabels[i].textContent === title && index === 0) {
        index++;
        filterCheckboxes[i].checked = false;
      } else if (filterCheckboxes[i].checked === false && filterLabels[i].textContent === title && index === 0) {
        filterCheckboxes[i].checked = true;
      }
    }
    return !!index;
  };

  var clearAllInputs = function (title) {
    for (var i = 0; i < filterCheckboxes.length; i++) {
      if (title !== filterLabels[i].textContent) {
        filterCheckboxes[i].checked = false;
      }
    }
  };

  var clearMarkInputs = function (title) {
    var markInputs = filterBar.querySelectorAll('.input-btn__input[name="mark"]');
    var markLabels = filterBar.querySelectorAll('.input-btn__input[name="mark"] + .input-btn__label');

    for (var j = 0; j < markLabels.length; j++) {
      if (markInputs[j].checked === true && markLabels[j].textContent !== title) {
        markInputs[j].checked = false;
      }
    }
  };

  var filterByType = function (target, items) {
    var targetTitle = target.innerText;
    var byType = [];
    removeCards();

    items.forEach(function (card, i) {
      if (items[i].kind === targetTitle) {
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
    emptyBlock = document.querySelector('.catalog__empty-filter');

    if (favoriteCards.length === 0 && !emptyBlock) {
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

  var filterByInStock = function (items) {
    var inStock = [];

    removeCards();

    items.forEach(function (card, i) {
      if (items[i].amount !== 0) {
        inStock.push(items[i]);
      }
    });
    window.addProductsToPage(inStock);
  };

  window.filterByPrice = function () {
    var minPrice = document.querySelector('.range__price--min').innerText;
    var maxPrice = document.querySelector('.range__price--max').innerText;

    var cardsPrice = document.querySelectorAll('.card__price');

    for (var i = 0; i < cardsPrice.length; i++) {
      if (cardsPrice[i].innerText < minPrice || cardsPrice[i].innerText > maxPrice) {
        cardsPrice[i].closest('.catalog__card').remove();
      }
    }

    var cards = document.querySelectorAll('.catalog__card');
    emptyBlock = document.querySelector('.catalog__empty-filter');

    if (cards.length === 0 && !emptyBlock) {
      showEmptyFilter();
    }

    window.getFilteredByPriceCount();
  };

  window.getFilteredByPriceCount = function () {
    var minPrice = document.querySelector('.range__price--min').innerText;
    var maxPrice = document.querySelector('.range__price--max').innerText;
    var countsBlockOfPrice = filterBar.querySelector('.range__price-count .range__count');
    var count = 0;

    for (var j = 0; j < window.productsArray.length; j++) {
      if (window.productsArray[j].price >= minPrice && window.productsArray[j]
      .price <= maxPrice) {
        count++;
      }
    }

    countsBlockOfPrice.innerText = '(' + count + ')';
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

  showAllButton.addEventListener('click', function (evt) {
    evt.preventDefault();

    removeCards();
    window.clearPrice();
    window.addProductsToPage(window.productsArray);
  });

  // сортировка сначала дешевый
  var sortByCheaper = function () {
    var cardsArrCopy = getCardsArrCopy();

    cardsArrCopy.sort(function (first, second) {
      var a = first.querySelector('.card__price').innerText;
      var b = second.querySelector('.card__price').innerText;

      if (a > b) {
        return 1;
      } else if (a < b) {
        return -1;
      } else {
        return 0;
      }
    });
    removeCards();
    addCardsIntoCatalog(cardsArrCopy);
  };

  // сортировка сначала дорогие
  var sortByExpensive = function () {
    var cardsArrCopy = getCardsArrCopy();

    cardsArrCopy.sort(function (first, second) {
      var a = first.querySelector('.card__price').innerText;
      var b = second.querySelector('.card__price').innerText;

      if (a < b) {
        return 1;
      } else if (a > b) {
        return -1;
      } else {
        return 0;
      }
    });
    removeCards();
    addCardsIntoCatalog(cardsArrCopy);
  };

  // сортировка сначала популярные
  var sortByPopular = function () {
    var currentArr = getCardsArrCopy();
    var loadedArr = window.productsArray;
    var currentSortedArr = [];

    for (var i = 0; i < currentArr.length; i++) {
      for (var j = 0; j < loadedArr.length; j++) {
        if (currentArr[i].title === loadedArr[j].name) {
          currentSortedArr[j] = currentArr[i];
        }
      }
    }

    var removeEmptyElements = function (arr) {
      arr = arr.filter(function (el) {
        return el !== undefined;
      });
      return arr;
    };

    currentSortedArr = removeEmptyElements(currentSortedArr);
    removeCards();
    addCardsIntoCatalog(currentSortedArr);
  };

  // сортировка по рейтингу
  var sortByRating = function () {
    var cardsArrCopy = getCardsArrCopy();

    cardsArrCopy.sort(function (first, second) {
      var a = first.querySelector('.stars__rating').innerText;
      var b = second.querySelector('.stars__rating').innerText;
      var c = first.querySelector('.star__count').innerText;
      var d = second.querySelector('.star__count').innerText;

      if (a < b) {
        return 1;
      } else if (a > b) {
        return -1;
      } else {
        if (c < d) {
          return 1;
        } else if (c > d) {
          return -1;
        } else {
          return 0;
        }
      }
    });
    removeCards();
    addCardsIntoCatalog(cardsArrCopy);
  };

  var getCardsArrCopy = function () {
    var cards = document.querySelector('.catalog__cards');
    var card = cards.querySelectorAll('.catalog__card');
    var cardTitle = cards.querySelectorAll('.card__title');
    var cardsArr = [];

    for (var i = 0; i < card.length; i++) {
      cardsArr.push(card[i]);
      card[i].title = cardTitle[i].textContent;
    }

    return cardsArr.slice();
  };

  // добавить карточки на страницу после сортировки
  var addCardsIntoCatalog = function (cardArr) {
    var catalog = document.querySelector('.catalog__cards');

    for (var i = 0; i < cardArr.length; i++) {
      catalog.appendChild(cardArr[i]);
    }
  };

  // считаем количество отфильтрованных товаров
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
    window.getFilteredByFavoriteCount();
    getFilteredByInStockCount();
    window.getFilteredByPriceCount();
  };

  // обработчик нажатий на фильтр
  var filterHandler = function (evt) {
    var target = evt.target;
    var targetTitle = target.innerText;

    emptyBlock = document.querySelector('.catalog__empty-filter');

    if (emptyBlock && emptyBlock !== 'undefined') {
      emptyBlock.remove();
    }

    evt.preventDefault();

    if (isFilterLinkChecked(targetTitle)) {
      filterByInStock(window.productsArray);
      return;
    }

    switch (targetTitle) {
      case 'Мороженое':
      case 'Газировка':
      case 'Жевательная резинка':
      case 'Мармелад':
      case 'Зефир':
        clearMarkInputs(targetTitle);
        filterByType(target, window.productsArray);
        break;
      case 'Без сахара':
        clearMarkInputs(targetTitle);
        filterByNutrition('sugar', window.productsArray);
        break;
      case 'Вегетарианское':
        clearMarkInputs(targetTitle);
        filterByNutrition('vegetarian', window.productsArray);
        break;
      case 'Безглютеновое':
        clearMarkInputs(targetTitle);
        filterByNutrition('gluten', window.productsArray);
        break;
      case 'Только избранное':
        clearAllInputs(targetTitle);
        filterByFavorite();
        break;
      case 'В наличии':
        clearAllInputs(targetTitle);
        filterByInStock(window.productsArray);
        break;
      case 'Сначала дешёвые':
        sortByCheaper();
        break;
      case 'Сначала дорогие':
        sortByExpensive();
        break;
      case 'По рейтингу':
        sortByRating();
        break;
      case 'Сначала популярные':
        sortByPopular();
        break;
    }
  };
  removeCards();
  filterBar.addEventListener('click', filterHandler);
})();
