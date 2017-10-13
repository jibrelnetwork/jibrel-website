(function($) {
  window.initSelect = function(props) {
    var source = props.source || [];
    var id = '' + (props.id || '');
    var placeholder = props.placeholder || '';
    var errorText = props.errorText || '';
    var onSelect = props.onSelect || function () {};

    var containerEl = document.getElementById(id);
    containerEl.id = id + '-container';

    renderContainer(id, source, placeholder, errorText);

    var $select = $('#' + id);

    $select.on('change', function(e) {
      $select.addClass('selected');

      onSelect(e);
    });

    $select.on('focus', function(e) {
      if (e.target.value.length) {
        $select.addClass('selected');
      }
    });
  }

  function renderContainer(id, source, placeholder, errorText) {
    renderSelect(id, source, placeholder);
    renderErrorText(id, errorText);
  }

  function renderSelect(id, source, placeholder) {
    var select = document.createElement('select');
    select.id = id;
    select.name = id;

    var firstOption = '<option disabled selected value="">' + placeholder + '</option>';

    var options = source.map(function(option) {
      return '<option value="' + option + '">' + option + '</option>';
    });

    select.innerHTML = firstOption + options.join('');

    document.getElementById(id + '-container').appendChild(select);
  }

  function renderErrorText(id, errorText) {
    var div = document.createElement('div');
    div.className = 'error-text';
    div.innerHTML = errorText;

    document.getElementById(id + '-container').appendChild(div);
  }
})(jQuery);
