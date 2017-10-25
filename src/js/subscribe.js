var isEmailValid = function(value) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if(value && value != '' && value.length > 5 && re.test(value)) return true;

  return false;
}

var sendEmail = function(email, callback){
  var emailAddlUrl = '//network.us16.list-manage.com/subscribe/post-json?u=c183c6fd5297d1abedae2421f&id=ea106174e5&EMAIL=' + email;

  jsonp(emailAddlUrl, { param: "c" }, function (err, data) {
    callback();
  })
}

$(document).ready(function() {
  var $emailContainer = $('.field-email-subscriprion');

  $('#email-subcribe-button', $emailContainer).click(function() {
    $emailContainer.find('.done').addClass('hidden');

    var emailValue = $('#email-input', $emailContainer).val();

    if (isEmailValid(emailValue)) {
      $emailContainer.find('.in-progress').removeClass('hidden');
      $emailContainer.find('.error').addClass('hidden');

      sendEmail(emailValue, function() {
        $emailContainer.find('.done').removeClass('hidden');
        $emailContainer.find('.in-progress').addClass('hidden');
        $emailContainer.find('.error').addClass('hidden');

        $('#email-input', $emailContainer).val('')
      })
    } else {
      $emailContainer.find('.error').removeClass('hidden');
    }

    return false;
  });
});

/**
 * uses 
 * https://www.npmjs.com/package/jsonp 
 * code ot perform correct email subscription
 */
function noop() {}

function jsonp(url, opts, fn) {
  var count = 0;

  if ('function' == typeof opts) {
    fn = opts;
    opts = {};
  }

  if (!opts) opts = {};

  var prefix = opts.prefix || '__jp'; 
  var id = opts.name || (prefix + (count++));

  var param = opts.param || 'callback';
  var timeout = null != opts.timeout ? opts.timeout : 60000;
  var enc = encodeURIComponent;
  var target = document.getElementsByTagName('script')[0] || document.head;
  var script;
  var timer;

  if (timeout) {
    timer = setTimeout(function(){
      cleanup();

      if (fn) fn(new Error('Timeout'));
    }, timeout);
  }

  function cleanup(){
    if (script.parentNode) script.parentNode.removeChild(script);

    window[id] = noop;

    if (timer) clearTimeout(timer);
  }

  function cancel(){
    if (window[id]) {
      cleanup();
    }
  }

  window[id] = function(data){
    cleanup();

    if (fn) fn(null, data);
  };

  url += (~url.indexOf('?') ? '&' : '?') + param + '=' + enc(id);
  url = url.replace('?&', '?');
  script = document.createElement('script');
  script.src = url;
  target.parentNode.insertBefore(script, target);

  return cancel;
}
