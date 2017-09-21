$(document).ready(function(){

    //Header animation
    $(window).scroll(function() {
        if ($(this).scrollTop() >= 100) {
            $('.header').addClass('active');
        }
        else {
            $('.header').removeClass('active');
        }
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

    //Form
    var currentStep = 1;

    $('.remodal-footer a').click(function(e) {
        e.preventDefault();

        var nextStep = currentStep + 1;

        $('.remodal-content .step-' + currentStep).toggleClass('active');
        $('.remodal-content .step-' + nextStep).toggleClass('active');

        currentStep = nextStep;

        e.stopPropagation();
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
                    thickness: 0.15,
                    bgColor: 'rgba(255, 255, 255, 0.3)',
                    fgColor: 'rgba(255, 255, 255, 1)',
                    lineCap: 'round'
                },
                textCSS: ''
            },
            hours: {
                gauge: {
                    thickness: 0.15,
                    bgColor: 'rgba(255, 255, 255, 0.3)',
                    fgColor: 'rgba(255, 255, 255, 1)',
                    lineCap: 'round'
                },
                textCSS: ''
            },
            minutes: {
                gauge: {
                    thickness: 0.15,
                    bgColor: 'rgba(255, 255, 255, 0.3)',
                    fgColor: 'rgba(255, 255, 255, 1)',
                    lineCap: 'round'
                },
                textCSS: ''
            },
            seconds: {
                gauge: {
                    thickness: 0.15,
                    bgColor: 'rgba(255, 255, 255, 0.3)',
                    fgColor: 'rgba(255, 255, 255, 1)',
                    lineCap: 'round'
                },
                textCSS: ''
            }
        }
    });

});
