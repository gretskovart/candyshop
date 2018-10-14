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
      var cartImgPath = window.productImagePath + product.picture;

      imgProduct.setAttribute('src', cartImgPath);
      imgProduct.setAttribute('alt', product.name);
    };

    var renderProductCartPrice = function () {
      productElementCart.querySelector('.card-order__price').textContent =
      product.price + ' ₽';
      productElementCart.setAttribute('data-price', product.price);
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
