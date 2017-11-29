(function($) {
  'use strict';

  function parseUtmParams() {
    var data = {};

    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
      if (key.indexOf('utm_') > -1) {
        data[key] = value.replace(/[#\/].*/g, '');
      }
    });

    return data;
  }

  function getUtmParamsFromStorage() {
    try {
      var data = window.localStorage.getItem('utmData');

      if (!data) {
        return null;
      }

      var parsedData = JSON.parse(data);

      if (Object.keys(parsedData).length === 0) {
        return null;
      }

      return parsedData;
    } catch (err) {
      console.error(err);

      return null;
    }
  }

  function setUtmParams(data) {
    try {
      window.localStorage.setItem('utmData', JSON.stringify(data));
    } catch (err) {
      console.error(err);
    }
  }

  function init() {
    var newUtmData = parseUtmParams();

    setUtmParams((Object.keys(newUtmData).length > 0) ? newUtmData : getUtmParamsFromStorage());
  }

  function getUtmQueryParams() {
    try {
      var utmData = getUtmParamsFromStorage() || {};
      var keys = Object.keys(utmData);

      if (keys.length === 0) {
        return '';
      }

      return '?' + keys.map(function(key, index) {
        var isLast = (index === (keys.length - 1));

        return key + '=' + utmData[key] + (isLast ? '' : '&');
      }).join('');
    } catch (err) {
      console.error(err);

      return '';
    }
  }

  $(document).ready(function() {
    try {
      init();
    } catch (err) {
      console.error(err);
    }

    setTimeout(function() {
      var saleUrl = 'https://sale.jibrel.network';
      $('[href="' + saleUrl + '"]').attr('href', saleUrl + getUtmQueryParams());
    }, 1000);
  });
})(jQuery);