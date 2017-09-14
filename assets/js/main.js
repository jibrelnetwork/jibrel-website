
var isEmailValid = function(value) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(value && value != '' && value.length > 5 && re.test(value)) return true;
    return false;
}

function callbackName (data){}
var sendEmail = function(email, callback){
    var emailAddlUrl = 'https://network.us16.list-manage.com/subscribe/post?u=c183c6fd5297d1abedae2421f&id=ea106174e5&EMAIL=' + email;
    
    $.post(emailAddlUrl, function(){
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