(function($) {
  'use strict';

  var GET_TOKENS_INTERVAL = 60000;
  var TOKENS_ID = 'allocated-tokens-value';

  $(document).ready(function() {
    getTokens();
    setInterval(getTokens, GET_TOKENS_INTERVAL);
  });

  function handleSuccess(response) {
    try {
      var tokens = parseInt(response.raised_tokens, 10);
      var digits = /^(\d{2,3})(\d{3})(\d{3})/.exec(tokens);
      $('#' + TOKENS_ID).html(digits[1] + ',' + digits[2] + ',' + digits[3]);
    } catch (err) {
      handleError(null, null, err);
    }
  }

  function handleError(jqXHR, textStatus, errorThrown) {
    $('#tokens-progress').addClass('hidden');
    console.error(errorThrown);
  }

  function getTokens() {
    $.ajax({
      url: 'https://saleapi.jibrel.network/api/raised-tokens/',
      dataType: 'json',
      success: handleSuccess,
      error: handleError,
    });
  }
})(jQuery);
