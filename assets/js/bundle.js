(function($) {
  window.initAutocomplete = function(props) {
    var source = props.source || [];
    var id = '' + (props.id || '');
    var placeholder = props.placeholder || '';
    var errorText = props.errorText || '';
    var alwaysAll = !!props.alwaysAll;
    var onInput = props.onInput || function () {};

    var containerEl = document.getElementById(id);
    containerEl.id = id + '-container';

    renderContainer(id, placeholder, errorText);

    var renderItemsHandler = renderItems.bind(null, source, id, alwaysAll);

    renderItemsHandler();

    var inputEl = document.getElementById(id);
    var listEl = document.getElementById(id + '-list');

    $(containerEl).click(function(e) {
      e.stopPropagation();
    });

    $(inputEl).on('input', function(e) {
      onInput(e);
      renderItemsHandler();
    });

    $(inputEl).on('touchstart mousedown', function() {
      hideAllAutocompletes(function() {
        $(listEl).addClass('active');
        hideOnClickOutside(id);
      });
    });
  }

  function renderContainer(id, placeholder, errorText) {
    renderInput(id, placeholder);
    renderList(id);
    renderErrorText(id, errorText);
  }

  function renderInput(id, placeholder) {
    var input = document.createElement('input');
    input.type = 'text';
    input.name = id;
    input.id = id;
    input.placeholder = placeholder;

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

(function() {
  window.countries = ["Afghanistan","Åland Islands","Albania","Algeria","American Samoa","Andorra","Angola","Anguilla","Antarctica","Antigua and Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bonaire, Sint Eustatius and Saba","Bosnia and Herzegovina","Botswana","Bouvet Island","Brazil","British Indian Ocean Territory","Brunei Darussalam","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central African Republic","Chad","Chile","China","Christmas Island","Cocos (Keeling) Islands","Colombia","Comoros","Congo, Republic of the (Brazzaville)","Congo, the Democratic Republic of the (Kinshasa)","Cook Islands","Costa Rica","Côte d'Ivoire, Republic of","Croatia","Cuba","Curaçao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands (Islas Malvinas)","Faroe Islands","Fiji","Finland","France","French Guiana","French Polynesia","French Southern and Antarctic Lands","Gabon","Gambia, The","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guadeloupe","Guam","Guatemala","Guernsey","Guinea","Guinea-Bissau","Guyana","Haiti","Heard Island and McDonald Islands","Holy See (Vatican City)","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran, Islamic Republic of","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Korea, Democratic People's Republic of","Korea, Republic of","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macao","Macedonia, Republic of","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Martinique","Mauritania","Mauritius","Mayotte","Mexico","Micronesia, Federated States of","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Niue","Norfolk Island","Northern Mariana Islands","Norway","Oman","Pakistan","Palau","Palestine, State of","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Pitcairn","Poland","Portugal","Puerto Rico","Qatar","Réunion","Romania","Russian Federation","Rwanda","Saint Barthélemy","Saint Helena, Ascension and Tristan da Cunha","Saint Kitts and Nevis","Saint Lucia","Saint Martin","Saint Pierre and Miquelon","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Sint Maarten (Dutch part)","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Georgia and South Sandwich Islands","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syrian Arab Republic","Taiwan","Tajikistan","Tanzania, United Republic of","Thailand","Timor-Leste","Togo","Tokelau","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Turks and Caicos Islands","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United Kingdom Overseas Territories","United States","United States Minor Outlying Islands","Uruguay","Uzbekistan","Vanuatu","Venezuela, Bolivarian Republic of","Viet Nam","Virgin Islands, British","Virgin Islands, U.S.","Wallis and Futuna","Western Sahara","Yemen","Zambia","Zimbabwe"];
})();

(function($) {
  var form = {
    totalSteps: 3,
    currentStep: 1,
    successStep: 4,
    errorStep: 5,
    validators: {
      checkbox1: validateCheckbox,
      checkbox2: validateCheckbox,
      fullname: validateString,
      email: validateEmail,
      country: validateString,
      citizenship: validateString,
      currency: validateString,
      amount: validateNumber,
    },
    validations: {
      checkbox1: false,
      checkbox2: false,
      fullname: false,
      email: false,
      country: false,
      citizenship: false,
      currency: false,
      amount: false,
    },
    data: {
      checkbox1: false,
      checkbox2: false,
      fullname: '',
      email: '',
      country: '',
      citizenship: '',
      currency: '',
      amount: 0,
    },
    countries: countries,
    currencies: ['ETH', 'BTC', 'USD', 'EUR', 'CHF'],
    submitURL: 'https://presaleapi.jibrel.network/presale_request',
  }

  $(document).ready(function() {
    startWatchingFormFields();

    $('#previous-step').click(onPreviousStepClick);
    $('#next-step').click(onNextStepClick);

    initAutocompletes();
  });

  function startWatchingFormFields() {
    $('.remodal-content input').on('change', watchFormField);
    $('.remodal-content input').on('input', watchFormField);
  }

  function onPreviousStepClick(event) {
    event.preventDefault();

    if (form.currentStep < 2) {
      return;
    }

    var previousStep = form.currentStep - 1;

    $('.remodal-content .step-' + previousStep).toggleClass('active');
    $('.remodal-content .step-' + form.currentStep).toggleClass('active');

    onPreviousStep(previousStep);

    event.stopPropagation();
  }

  function onNextStepClick(event) {
    event.preventDefault();

    if (form.currentStep > form.totalSteps) {
      return;
    }

    hideFormErrors();

    if (!isNextStepAllowed()) {
      validateAllFields();

      return showFormErrors();
    }

    var nextStep = form.currentStep + 1;

    if (nextStep === form.totalSteps) {
      $('#next-step').html('Submit form');
    }

    onNextStep(nextStep);

    event.stopPropagation();
  }

  function isNextStepAllowed() {
    return !$('#next-step').hasClass('disabled');
  }

  function showFormErrors() {
    $('.step-' + form.currentStep).addClass('show-errors');
  }

  function hideFormErrors() {
    $('.step-' + form.currentStep).removeClass('show-errors');
  }

  function watchFormField(event) {
    var fieldName = event.target.name;
    var fieldValue = getFieldValue(event.target);

    validateField(fieldName, fieldValue);

    form.data[fieldName] = fieldValue;

    checkNextStepAllowed();
  }

  function validateField(fieldName, fieldValue) {
    hideFieldError(fieldName);

    isFieldValid = form.validators[fieldName](fieldValue);

    if ((fieldName === 'country') || (fieldName === 'citizenship')) {
      isFieldValid = validateCountry(fieldValue, isFieldValid);
    }

    form.validations[fieldName] = isFieldValid;

    if (!isFieldValid) {
      showFieldError(fieldName);
    }
  }

  function validateAllFields() {
    var fields = Object.keys(form.data);

    fields.forEach(function(fieldName) {
      validateField(fieldName, form.data[fieldName]);
    })
  }

  function validateCountry(country, isValid) {
    var prohibitedCountries = ['united states', 'singapore', 'china'];
    var isProhibitedCountry = false;

    prohibitedCountries.forEach(function(prohibitedCountry) {
      if (prohibitedCountry === country.toLowerCase()) {
        isProhibitedCountry = true;
      }
    });

    return isProhibitedCountry ? false : isValid;
  }

  function showFieldError(fieldName) {
    $('#' + fieldName + '-container').addClass('error');
  }

  function hideFieldError(fieldName) {
    $('#' + fieldName + '-container').removeClass('error');
  }

  function getFieldValue(target) {
    var fieldName = target.name;
    var fieldValue = target.value;

    if (fieldName.indexOf('checkbox') === 0) {
      fieldValue = target.checked;
    }

    return fieldValue;
  }

  function validateCheckbox(value) {
    return value;
  }

  function validateString(value) {
    var numbersRe = /\d/g;

    if ((value.length < 3) || (numbersRe.test(value))) {
      return false;
    }

    return true;
  }

  function validateNumber(value) {
    var notNumbersRe = /\D/g;

    if ((value.length < 1) || (notNumbersRe.test(value))) {
      return false;
    }

    return true;
  }

  function validateEmail(value) {
    var emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return emailRe.test(value);
  }

  function checkNextStepAllowed() {
    var currentStep = form.currentStep;
    var validations = form.validations;
    var isNextStepAllowed = false;

    if (currentStep === 1) {
      isNextStepAllowed = (validations.checkbox1 && validations.checkbox2);
    } else if (currentStep === 2) {
      isNextStepAllowed = (validations.fullname && validations.email && validations.country && validations.citizenship);
    } else if (currentStep === 3) {
      isNextStepAllowed = (validations.currency && validations.amount);

      if (isNextStepAllowed) {
        setTotalAmount();
      }
    }

    if (isNextStepAllowed) {
      return enableNextStep();
    }

    disableNextStep();
  }

  function setTotalAmount() {
    var amount = $('#amount').val();
    var currency = $('#currency').val();

    $('#total-amount').html('' + amount + ' ' + currency);
  }

  function disableNextStep() {
    $('#next-step').addClass('disabled');
  }

  function enableNextStep() {
    $('#next-step').removeClass('disabled');
  }

  function onPreviousStep(previousStep) {
    setCurrentStep(previousStep);

    $('#next-step').html('Next step');

    checkNextStepAllowed();
  }

  function onNextStep(nextStep) {
    if (nextStep > form.totalSteps) {
      $('#steps-counter').addClass('hidden');

      return onSubmit();
    }

    setCurrentStep(nextStep);
    checkNextStepAllowed();
  }

  function onSubmit() {
    setLoading();

    return $.ajax({
      type: 'POST',
      url: form.submitURL,
      data: getFormData(),
      cache: false,
      crossDomain: true,
      dataType: 'json',
      headers: { 'Content-Type': 'application/json' },
      success: onSuccessSubmit,
      error: onErrorSubmit,
    });
  }

  function onSuccessSubmit(response, textStatus) {
    hideModalFooter();

    if (response && (response.success === true) && (textStatus === 'success')) {
      return setCurrentStep(form.successStep);
    }

    return setCurrentStep(form.errorStep);
  }

  function onErrorSubmit(jqXHR, textStatus, error) {
    hideModalFooter();

    return setCurrentStep(form.errorStep);
  }

  function getFormData() {
    var data = form.data;

    return JSON.stringify({
      fullname: data.fullname,
      email: data.email,
      country: data.country,
      citizenship: data.citizenship,
      currency: data.currency,
      amount: data.amount,
    });
  }

  function hideModalFooter() {
    $('.remodal-footer').html('');
    $('.remodal-footer').css('padding', 0);
  }

  function setLoading() {
    $("#previous-step").addClass('hidden');
    $("#next-step").addClass('hidden');
    $("#loading").removeClass('hidden');
  }

  function setCurrentStep(step) {
    $('.remodal-content .step-' + step).addClass('active');
    $('.remodal-content .step-' + form.currentStep).removeClass('active');
    $('#steps-counter').html('Step ' + step + '/' + form.totalSteps);

    if (step === 1) {
      $('#previous-step').addClass('hidden');
    } else {
      $('#previous-step').removeClass('hidden');
    }

    form.currentStep = step;
  }

  function initAutocompletes() {
    initAutocomplete({
      source: form.countries,
      id: 'country',
      placeholder: 'Country of Residence',
      errorText: 'The field should be valid country!',
      onInput: watchFormField,
    });

    initAutocomplete({
      source: form.countries,
      id: 'citizenship',
      placeholder: 'Citizenship',
      errorText: 'The field should be valid citizenship!',
      onInput: watchFormField,
    });

    initAutocomplete({
      source: form.currencies,
      id: 'currency',
      placeholder: 'Currency',
      errorText: 'The field should be valid currency!',
      alwaysAll: true,
      onInput: watchFormField,
    });
  }
})(jQuery);

(function($) {
    $(document).ready(function() {

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

        //Count
        var timeLeft = (new Date("Sep 25, 2017 12:00:00 GMT+000").getTime() - $.now())/1000;

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
})(jQuery);