'use strict';

(function () {
  var similarProductCartTemplate = document.querySelector('#card-order').content
  .querySelector('.goods_card');

  window.renderProductCart = function (product) {
    if (product === undefined) {
      throw new Error('Нет аргументов');
    }

    var productElementCart = similarProductCartTemplate.cloneNode(true);

    var renderProductCartName = function () {
      productElementCart.querySelector('.card-order__title').textContent = product.name;
    };

    var renderProductCartImage = function () {
      var imgProduct = productElementCart.querySelector('.card-order__img');

      imgProduct.setAttribute('src', product.picture);
      imgProduct.setAttribute('alt', product.name);
    };

    var renderProductCartPrice = function () {
      productElementCart.querySelector('.card-order__price').textContent =
      product.price + ' ₽';
    };

    var renderProductCartAmount = function () {
      productElementCart.querySelector('.card-order__count').setAttribute('value', 1);
    };

    renderProductCartName();
    renderProductCartImage();
    renderProductCartPrice();
    renderProductCartAmount();

    return productElementCart;
  };
})();
