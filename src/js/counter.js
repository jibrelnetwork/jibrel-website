(function($) {
'use strict';

  function onCounterTick() {
    var timeLeft = moment.duration(moment.utc('2018-01-26T12:00') - moment.utc());

    /**
     * TODO
     * December has 31 days, so need to remove "+ 1" after it
     */
    var monthsDays = (2 * 30) + 1;
    var totalDays = monthsDays + timeLeft.days()

    $('#counter-days .value').html(totalDays);
    $('#counter-hours .value').html(timeLeft.hours());
    $('#counter-minutes .value').html(timeLeft.minutes());
    $('#counter-seconds .value').html(timeLeft.seconds());

    $('#counter-2-days .time').html(totalDays);
    $('#counter-2-hours .time').html(timeLeft.hours());
    $('#counter-2-minutes .time').html(timeLeft.minutes());
    $('#counter-2-seconds .time').html(timeLeft.seconds());

    $('#counter-days .bar').css('height', ((totalDays / 91) * 100) + '%');
    $('#counter-hours .bar').css('height', ((timeLeft.hours() / 24) * 100) + '%');
    $('#counter-minutes .bar').css('height', ((timeLeft.minutes() / 60) * 100) + '%');
    $('#counter-seconds .bar').css('height', ((timeLeft.seconds() / 60) * 100) + '%');
  }

  function showCounters() {
    $('#counter').removeClass('hidden');
    $('#counter-2').removeClass('hidden');
  }

  $(document).ready(function() {
    var counterInterval = 1000;

    onCounterTick();
    setInterval(onCounterTick, counterInterval);
    showCounters();
  });
})(jQuery);