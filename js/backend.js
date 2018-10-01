'use strict';

(function () {
  var xhr = new XMLHttpRequest();
  var data = JSON.parse(xhr.responseText);

  xhr.addEventListener('load', function () {
    try {
      console.log(data);
    } catch (err) {
      console.error(err.message);
    }
  });

  xhr.open('GET', 'https://js.dump.academy/candyshop/data');
  xhr.send();
})();
