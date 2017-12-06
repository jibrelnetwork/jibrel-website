(function($) {
  'use strict';

  var AFFILIATE_NETWORKS = ['clicksureclickid', 'track_id', 'actionpay'];

  $(document).ready(function() {
    try {
      init();
    } catch (err) {
      console.error(err);
    }

    setTimeout(function() {
      var saleUrl = 'https://sale.jibrel.network';
      $('[href="' + saleUrl + '"]').attr('href', saleUrl + getTrackingParams());
    }, 1000);
  });

  function init() {
    var newTrackingData = parseTrackingParams();
    var trackingData = getTrackingParamsFromStorage() || {};

    setTrackingParams((Object.keys(newTrackingData).length > 0) ? newTrackingData : trackingData);
  }

  function parseTrackingParams() {
    var data = {};

    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
      if (key.indexOf('utm_') > -1) {
        data[key] = value.replace(/[#\/].*/g, '');
      }

      AFFILIATE_NETWORKS.forEach(function(affiliate) {
        if (key === affiliate) {
          data[key] = value.replace(/[#\/].*/g, '');
        }
      });
    });

    return data;
  }

  function getTrackingParamsFromStorage() {
    try {
      var data = window.localStorage.getItem('utmData');

      return parseDataFromStorage(data);
    } catch (err) {
      console.error(err);

      return null;
    }
  }

  function setTrackingParams(data) {
    try {
      window.localStorage.setItem('utmData', JSON.stringify(data));
    } catch (err) {
      console.error(err);
    }
  }

  function getTrackingParams() {
    try {
      var trackingData = getTrackingParamsFromStorage() || {};
      var keys = Object.keys(trackingData);

      if (keys.length === 0) {
        return '';
      }

      return '?' + keys.map(function(key, index) {
        var isLast = (index === (keys.length - 1));

        return key + '=' + trackingData[key] + (isLast ? '' : '&');
      }).join('');
    } catch (err) {
      console.error(err);

      return '';
    }
  }

  function parseDataFromStorage(data) {
    try {
      if (!data) {
        return null
      }

      var parsedData = JSON.parse(data)

      if (Object.keys(parsedData).length === 0) {
        return null
      }

      return parsedData
    } catch (err) {
      console.error(err)

      return null
    }
  }
})(jQuery);
