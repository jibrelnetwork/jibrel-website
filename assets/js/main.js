
var isEmailValid = function(value) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(value && value != '' && value.length > 5 && re.test(value)) return true;
    return false;
}

var sendEmail = function(email, callback){
    var emailAddlUrl = '//network.us16.list-manage.com/subscribe/post-json?u=c183c6fd5297d1abedae2421f&id=ea106174e5&EMAIL=' + email;
    
    jsonp( emailAddlUrl, {param: "c"}, function (err, data) {
            callback();
    })
}

$(document).ready(function(){

    var $emailContainer = $('.field-email-subscriprion');

    //Header animation
    $(window).scroll(function() {
        if ($(this).scrollTop() >= 100) {
            $('.header').addClass('active');
        }
        else {
            $('.header').removeClass('active');
        }
    });

    //Email
    $('#email-subcribe-button', $emailContainer).click(function() {
        
        var emailValue = $('#email-input', $emailContainer).val();
        if (isEmailValid(emailValue)) {
            $emailContainer.find('.in-progress').removeClass('hidden');
            $emailContainer.find('.error').addClass('hidden');
            sendEmail(emailValue, function(){
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
    

    //Accordion
    $('.faq h3').click(function() {
        $('.faq .item').removeClass('active');
        $(this).parent().toggleClass('active');
    });

    $(".faq .row ul a").each(function(k,v){
        $(v).click(function(e){
            $(".faq .row ul a").removeClass('active');
            $(".faq .items .tab").removeClass('active');
            $(this).addClass('active');

            var n = $(this).attr('data-id');
            $(".faq .items .tab-"+n).addClass('active');
            e.preventDefault();
        })
    });

    //Scroll
    $('.scroll').smoothScroll();

    //Menu
    $('.menu-button').click(function() {
        $(this).toggleClass('active');
        $('.menu, html').toggleClass('active');
        return false;
    });

    $('.menu .scroll').click(function() {
        $('.menu-button').toggleClass('active');
        $('.menu, html').removeClass('active');
        return false;
    });

    var timeLeft = (new Date("Sep 25, 2017 12:00:00 GMT+000").getTime() - $.now())/1000;
    //Count
    $('#countdown').ClassyCountdown({
        end: $.now() + timeLeft,
        labelsOptions: {
            lang: {
                days: 'Days',
                hours: 'Hours',
                minutes: 'Minutes',
                seconds: 'Seconds'
            },
            style: ''
        },
        style: {
            element: '',
            labels: false,
            days: {
                gauge: {
                    thickness: 0.2,
                    bgColor: 'rgba(255, 255, 255, 0.3)',
                    fgColor: 'rgba(255, 255, 255, 1)',
                    lineCap: 'round'
                },
                textCSS: ''
            },
            hours: {
                gauge: {
                    thickness: 0.2,
                    bgColor: 'rgba(255, 255, 255, 0.3)',
                    fgColor: 'rgba(255, 255, 255, 1)',
                    lineCap: 'round'
                },
                textCSS: ''
            },
            minutes: {
                gauge: {
                    thickness: 0.2,
                    bgColor: 'rgba(255, 255, 255, 0.3)',
                    fgColor: 'rgba(255, 255, 255, 1)',
                    lineCap: 'round'
                },
                textCSS: ''
            },
            seconds: {
                gauge: {
                    thickness: 0.2,
                    bgColor: 'rgba(255, 255, 255, 0.3)',
                    fgColor: 'rgba(255, 255, 255, 1)',
                    lineCap: 'round'
                },
                textCSS: ''
            }
        }
    });

});
/**
 * uses 
 * https://www.npmjs.com/package/jsonp 
 * code ot perform correct email subscription
 */
function noop(){}
function jsonp(url, opts, fn){
    
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