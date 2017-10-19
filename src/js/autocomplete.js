(function($) {
  'use strict';

  window.initAutocomplete = function(props) {
    var source = props.source || [];
    var id = '' + (props.id || '');
    var placeholder = props.placeholder || '';
    var errorText = props.errorText || '';
    var alwaysAll = !!props.alwaysAll;
    var readonly = !!props.readonly;
    var onChange = props.onChange || function () {};

    var containerEl = document.getElementById(id);
    containerEl.id = id + '-container';

    renderContainer(id, placeholder, errorText, readonly);

    var renderItemsHandler = renderItems.bind(null, source, id, alwaysAll);

    renderItemsHandler();

    var inputEl = document.getElementById(id);
    var listEl = document.getElementById(id + '-list');

    $(containerEl).click(function(e) {
      e.stopPropagation();
    });

    $(inputEl).on('input', function(e) {
      onChange(e);
      renderItemsHandler();
    });

    $(inputEl).on('touchstart mousedown', function() {
      hideAllAutocompletes(function() {
        $(listEl).addClass('active');
        hideOnClickOutside(id);
      });
    });
  }

  function renderContainer(id, placeholder, errorText, readonly) {
    renderInput(id, placeholder, readonly);
    renderList(id);
    renderErrorText(id, errorText);
  }

  function renderInput(id, placeholder, readonly) {
    var input = document.createElement('input');
    input.type = 'text';
    input.name = id;
    input.id = id;
    input.placeholder = placeholder;
    input.readOnly = readonly;

    document.getElementById(id + '-container').appendChild(input);
  }

  function renderList(id) {
    var ul = document.createElement('ul');
    ul.id = id + '-list';
    ul.className = 'autocomplete';

    document.getElementById(id + '-container').appendChild(ul);
  }

  function renderErrorText(id, errorText) {
    var div = document.createElement('div');
    div.className = 'error-text';
    div.innerHTML = errorText;

    document.getElementById(id + '-container').appendChild(div);
  }

  function renderItems(source, id, alwaysAll) {
    var inputEl = document.getElementById(id);
    var listEl = document.getElementById(id + '-list');
    var selector = '#' + id;
    var currentItemValue = inputEl.value.toLowerCase();

    $(listEl).removeClass('hidden');

    var listItemsCount = 0;

    var listItems = source.map(function(item) {
      var isFound = (item.toLowerCase().indexOf(currentItemValue) > -1);
      var isActive = (item.toLowerCase() === currentItemValue);

      if (isFound || alwaysAll) {
        listItemsCount += 1;

        return '<li><a' + (isActive ? ' class="active" ' : '') + '>' + item + '</a></li>'
      }

      return '';
    });

    listEl.innerHTML = listItems.join('');

    if (!listItemsCount) {
      $(listEl).addClass('hidden');
    }

    $(selector + '-list' + ' a').click(function(e) {
      e.preventDefault();

      inputEl.value = $(this).text();
      inputEl.dispatchEvent(new Event('input'));
      $(listEl).removeClass('active');
      renderItems(source, id, alwaysAll);

      e.stopPropagation();
    });
  }

  function hideOnClickOutside(id) {
    function outsideClickListener() {
      $('#' + id + '-list').removeClass('active');
      removeClickListener();
    }

    function removeClickListener() {
      document.removeEventListener('click', outsideClickListener);
    }

    setTimeout(function() {
      document.addEventListener('click', outsideClickListener);
    }, 50);
  }

  function hideAllAutocompletes(callback) {
    $('.autocomplete').each(function() {
      $(this).removeClass('active');

      callback();
    });
  }
})(jQuery);
