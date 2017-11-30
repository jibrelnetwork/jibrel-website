(function($) {
  'use strict';

  var POPOVER_ANIMATION_TIMEOUT = 300;

  window.initPopover = function(props) {
    if (!(props.id && props.id.length)) {
      throw new Error('Please pass popover id');
    }

    var id = '#' + (props.id || '');
    var title = props.title || '';

    setTitle(id, title);
    initHandlers(id);
  }

  function setTitle(id, title) {
    $(id + ' .popover-title').html(title);
  }

  function initHandlers(id) {
    initPopoverTitleClickHandler(id);
    initPopoverOverlayClickHandler(id);
  }

  function initPopoverTitleClickHandler(id) {
    $(id + ' .popover-title').click(function() {
      openPopover(id);
    });
  }

  function initPopoverOverlayClickHandler(id) {
    $(id + ' .popover-overlay').click(function() {
      closePopover(id);
    });
  }

  function openPopover(id) {
    $(id).addClass('opening');
    $(id).addClass('open');

    setTimeout(function() {
      $(id).removeClass('opening');
    }, POPOVER_ANIMATION_TIMEOUT);
  }

  function closePopover(id) {
    $(id).addClass('closing');
    $(id).removeClass('open');

    setTimeout(function() {
      $(id).removeClass('closing');
    }, POPOVER_ANIMATION_TIMEOUT);
  }
})(jQuery);
