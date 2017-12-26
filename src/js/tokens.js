(function($) {
  'use strict';

  var TOTAL_SUPPLY = 200 * 1000 * 1000;
  var INITIAL_VALUE = 150 * 1000 * 1000;
  var GET_TOKENS_INTERVAL = 60 * 1000;
  var TOKENS_ID = 'allocated-tokens-value';

  $(document).ready(function() {
    getTokens();
    setInterval(getTokens, GET_TOKENS_INTERVAL);
  });

  function getTokens() {
    $.ajax({
      url: 'https://saleapi.jibrel.network/api/raised-tokens/',
      dataType: 'json',
      success: handleSuccess,
      error: handleError,
    });
  }

  function handleSuccess(response) {
    try {
      var tokens = parseInt(response.raised_tokens, 10);
      setRaised(tokens);
      setProgressWidth(tokens);
    } catch (err) {
      handleError(null, null, err);
    }
  }

  function handleError(jqXHR, textStatus, errorThrown) {
    $('#tokens-progress').addClass('hidden');
    console.error(errorThrown);
  }

  function setRaised(tokens) {
    var digits = /^(\d{2,3})(\d{3})(\d{3})/.exec(tokens);
    $('#' + TOKENS_ID).html(digits[1] + ',' + digits[2] + ',' + digits[3]);
  }

  function setProgressWidth(tokens) {
    var raisedPercent = ((tokens - INITIAL_VALUE) / (TOTAL_SUPPLY - INITIAL_VALUE)) * 100;
    $('#progress-before').css('width', (raisedPercent + 1) + '%');
    $('#progress-after').css('width', (100 - raisedPercent) + '%');
    $('#progress-raised').css('left', raisedPercent + '%');
  }
})(jQuery);
