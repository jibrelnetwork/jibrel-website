(function($) {
  'use strict';

  $(document).ready(function() {
    // Start slider
    $('.slider').slick({
      dots: true,
      infinite: true,
      speed: 500,
      fade: true,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 7000,
      adaptiveHeight: true,
    });

    // Articles slider
    $('.slider2').slick({
      dots: true,
      infinite: true,
      speed: 500,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 7000,
      adaptiveHeight: true,
      slidesPerRow: 5,
      slidesToShow: 5,
      slidesToScroll: 1,
      centerMode: true,
      swipeToSlide: true,
      centerPadding: '100px',
      responsive: [{
        breakpoint: 2000,
        settings: {
          slidesToShow: 5,
          centerPadding: '50px',
        }
      }, {
        breakpoint: 1800,
        settings: {
          slidesToShow: 4,
          centerPadding: '100px',
        }
      }, {
        breakpoint: 1600,
        settings: {
          slidesToShow: 3,
        }
      }, {
        breakpoint: 1280,
        settings: {
          centerPadding: '150px',
          slidesToShow: 2,
        }
      }, {
        breakpoint: 1024,
        settings: {
          centerPadding: '50px',
          slidesToShow: 2,
        }
      }, {
        breakpoint: 900,
        settings: {
          centerPadding: '30px',
          slidesToShow: 2,
        }
      }, {
        breakpoint: 768,
        settings: {
          centerPadding: '150px',
          slidesToShow: 1,
        }
      }, {
        breakpoint: 700,
        settings: {
          centerPadding: '100px',
          slidesToShow: 1,
        }
      }, {
        breakpoint: 600,
        settings: {
          centerPadding: '50px',
          slidesToShow: 1,
        }
      }, {
        breakpoint: 480,
        settings: {
          centerPadding: '0',
          slidesToShow: 1,
        }
      }],
    });

    // Header animation
    $(window).scroll(function() {
      if ($(this).scrollTop() >= 100) {
        $('.header').addClass('active');
      } else {
        $('.header').removeClass('active');
      }
    });

    // Accordion
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

    // Scroll
    $('.scroll').smoothScroll();

    // Menu
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

    // Popover
    var title = (window.location.pathname.indexOf('/ko.html') > -1) ? 'Korean' : 'English';
    initPopover({ id: 'language-popover', title: title });
  });
})(jQuery);
