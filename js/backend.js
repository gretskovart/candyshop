'use strict';

(function () {
  var URL_DATA = 'https://js.dump.academy/candyshop/data';
  var URL_SEND = 'https://js.dump.academy/candyshop';
  var SERVER_RESPONSE = 10000;

  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  var responseChecker = function (onLoad, onError) {
    var error;
    xhr.addEventListener('load', function () {

      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;
        case 400:
          error = 'Неверный запрос';
          break;
        case 404:
          error = 'Ничего не найдено';
          break;
        case 500:
          error = 'Ошибка сервера';
          break;
        default:
          error = 'Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText;
      }
      window.good.addProductsToPage(window.productsArray);
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = SERVER_RESPONSE;

    if (error) {
      onError(error);
    }
  };

  window.serverData = {
    loadData: function (onLoad, onError) {
      responseChecker(onLoad, onError);
      xhr.open('GET', URL_DATA);
      xhr.send();
    },
    sendData: function (data, onLoad, onError) {
      responseChecker(onLoad, onError);
      xhr.open('POST', URL_SEND);
      xhr.send(data);
    }
  };

})();
