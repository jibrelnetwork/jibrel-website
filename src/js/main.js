(function($) {
    'use strict';

    $(document).ready(function() {

        //Slider
        $('.slider').slick({
            dots: true,
            infinite: true,
            speed: 500,
            fade: true,
            arrows: false
        });

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

    });
})(jQuery);