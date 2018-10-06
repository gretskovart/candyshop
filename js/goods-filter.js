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

    items.forEach(function (card, i) {
      if (items[i].kind === target) {
        byType.push(items[i]);
      }
    });
    removeCards();
    window.addProductsToPage(byType);
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
    }
  };
  removeCards();
  filterBar.addEventListener('click', filterHandler);
})();
