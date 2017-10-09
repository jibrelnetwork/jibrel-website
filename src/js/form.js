(function($) {
  'use strict';

  var form = {
    totalSteps: 3,
    currentStep: 1,
    successStep: 4,
    errorStep: 5,
    validators: {
      checkbox1: validateCheckbox,
      checkbox2: validateCheckbox,
      fullname: validateFullname,
      email: validateEmail,
      emailconfirm: validateEmailConfirm,
      phone: validatePhone,
      country: validateCountry,
      citizenship: validateCitizenship,
      currency: validateCurrency,
      amount: validateAmount,
    },
    validations: {
      checkbox1: false,
      checkbox2: false,
      fullname: false,
      email: false,
      emailconfirm: false,
      phone: true,
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
      emailconfirm: '',
      phone: '',
      country: '',
      citizenship: '',
      currency: '',
      amount: '',
    },
    countries: countries,
    currencies: ['ETH', 'BTC', 'USD', 'EUR', 'CHF'],
    // submitURL: 'http://localhost:3001/v2/presale_request',
    submitURL: 'https://presaleapiv2.jibrel.network/presale_request',
    btcUSD: 4000,
    ethUSD: 300,
    showRecaptchaTimeout: 1000,
  }

  var captchaHandler = function() { console.error('grecaptcha handler not defined') };

  $(document).ready(function() {
    startWatchingFormFields();

    $('#previous-step').click(onPreviousStepClick);
    $('#next-step').click(onNextStepClick);

    initAutocompletes();
    showRecaptcha();
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

    var validationError = form.validators[fieldName](fieldValue);

    form.validations[fieldName] = (validationError == null);

    if (validationError) {
      showFieldError(fieldName, validationError);
    }
  }

  function validateAllFields() {
    var fields = Object.keys(form.data);

    fields.forEach(function(fieldName) {
      validateField(fieldName, form.data[fieldName]);
    })
  }

  function showFieldError(fieldName, validationError) {
    $('#' + fieldName + '-container > .error-text').html(validationError);
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
    // if checkbox is setted on - return null, otherwise empty error message
    return value ? null : '';
  }

  function validateString(value) {
    var numbersRe = /\d/g;

    if ((value.length < 3) || (numbersRe.test(value))) {
      return false;
    }

    return true;
  }

  function validateNumber(value) {
    var notNumbersRe = /[^\d\.]/g;

    if ((value.length < 1) || (notNumbersRe.test(value))) {
      return false;
    }

    return true;
  }

  function validateOptional() {
    return true;
  }

  function validateProhibitedCountry(value) {
    var prohibitedCountries = ['united states', 'singapore', 'china'];

    for (var i = 0; i < prohibitedCountries.length; i += 1) {
      if (prohibitedCountries[i] === value.toLowerCase()) {
        return false;
      }
    }

    return true;
  }

  function validateFullname(value) {
    if (!validateString(value)) {
      return 'The field should be valid full name.'
    }

    return null;
  }

  function validateEmail(value) {
    var emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return emailRe.test(value) ? null : 'The field should be valid email address.';
  }

  function validateEmailConfirm(value) {
    return (form.data.email === value) ? null : 'Emails should match to proceed.';
  }

  function validatePhone(value) {
    if (!validateOptional(value)) {
      return 'The field should be valid phone number.'
    }

    return null;
  }

  function validateCountry(value) {
    if (!validateString(value)) {
      return 'The field should be valid country.';
    } else if (!validateProhibitedCountry(value)) {
      return 'The country is prohibited.';
    }

    return null;
  }

  function validateCitizenship(value) {
    if (!validateString(value)) {
      return 'The field should be valid citizenship.';
    } else if (!validateProhibitedCountry(value)) {
      return 'The country is prohibited.';
    }

    return null;
  }

  function validateCurrency(value) {
    if (!validateString(value)) {
      return 'The field should be valid currency.';
    }

    var amount = $('#amount').val();

    validateField('amount', amount);

    return null;
  }

  function validateAmount(value) {
    if (!validateNumber(value)) {
      return 'The field should be valid number.';
    }

    var amount = parseFloat(value, 10);
    var currency = $('#currency').val();

    switch (currency) {
      case 'ETH':
        return (amount < 15) ? 'Minimum investment is 15 ETH.' : null;
      case 'BTC':
        return (amount < 1.2) ? 'Minimum investment is 1.2 BTC.' : null;
      case 'USD':
        return (amount < 5000) ? 'Minimum investment is 5,000 USD.' : null;
      case 'EUR':
        return (amount < 4250) ? 'Minimum investment is 4,250 EUR.' : null;
      case 'CHF':
        return (amount < 4865) ? 'Minimum investment is 4,865 CHF.' : null;
      default:
        return null;
    }
  }

  function checkNextStepAllowed() {
    var currentStep = form.currentStep;
    var validations = form.validations;
    var isNextStepAllowed = false;

    if (currentStep === 1) {
      isNextStepAllowed = (validations.checkbox1 && validations.checkbox2);
    } else if (currentStep === 2) {
      isNextStepAllowed = (validations.fullname && validations.email && validations.emailconfirm && validations.country && validations.citizenship);
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

      return captchaHandler();
    }

    setCurrentStep(nextStep);
    checkNextStepAllowed();
  }

  window.onPresaleFormSubmit = function() {
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

  function onSuccessSubmit(response, textStatus, jqXHR) {
    hideModalFooter();

    var statusCode = jqXHR.status
    var isValidStatus = ((statusCode === 200) || (statusCode === 201))

    if (isValidStatus && response && (response.error === false)) {
      showAddress(response.address);
      setCurrentStep(form.successStep);

      reachPresaleSuccessGoal();
      pushFormSubmissionEvent();

      return;
    }

    setCurrentStep(form.errorStep);
  }

  function onErrorSubmit(jqXHR, textStatus, error) {
    console.error(textStatus, error);

    hideModalFooter();

    return setCurrentStep(form.errorStep);
  }

  function getFormData() {
    var data = form.data;

    return JSON.stringify({
      fullname: data.fullname,
      email: data.email,
      emailconfirm: data.emailconfirm,
      phone: data.phone,
      country: data.country,
      citizenship: data.citizenship,
      currency: data.currency,
      amount: data.amount,
      'g-recaptcha-response': window.grecaptcha.getResponse(),
    });
  }

  function hideModalFooter() {
    $('.remodal-footer').html('');
    $('.remodal-footer').css('padding', 0);
  }

  function setLoading() {
    $('#previous-step').addClass('hidden');
    $('#next-step').addClass('hidden');
    $('#loading').removeClass('hidden');
  }

  function showAddress(investmentAddress) {
    var isAddressExists = (investmentAddress && investmentAddress.length)
    var isCryptoCurrency = (['BTC', 'ETH'].indexOf(form.data.currency) > -1)

    if (!(isAddressExists && isCryptoCurrency)) {
      return;
    }

    var addressEl = '<span>' + investmentAddress + '</span>';

    $('#investment-address').html('Address for investing your funds: ' + addressEl);
    $('#investment-address').removeClass('hidden');
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

  function reachPresaleSuccessGoal() {
    var currency = form.data.currency;
    var price = form.data.amount;

    if (currency === 'BTC') {
      currency = 'USD';
      price = form.btcUSD * (parseInt(price, 10) || 0)
    } else if (currency === 'ETH') {
      currency = 'USD';
      price = form.ethUSD * (parseInt(price, 10) || 0)
    }

    var goalParams = {
      currency: currency,
      order_price: price,
    }

    reachGoal('presaleSuccess', goalParams);
  }

  function reachGoal(goalTarget, goalParams) {
    try {
      yaCounter45922689.reachGoal(goalTarget, goalParams);
    } catch(e) {
      console.error(e);
    }
  }

  function pushFormSubmissionEvent() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'formSubmission' });
  }

  function initAutocompletes() {
    initAutocomplete({
      source: form.countries,
      id: 'country',
      placeholder: 'Country of Residence *',
      onInput: watchFormField,
    });

    initAutocomplete({
      source: form.countries,
      id: 'citizenship',
      placeholder: 'Citizenship *',
      onInput: watchFormField,
    });

    initAutocomplete({
      source: form.currencies,
      id: 'currency',
      placeholder: 'Currency',
      alwaysAll: true,
      readonly: true,
      onInput: watchFormField,
    });
  }

  window.initRecaptcha = function() {
    window.grecaptcha.render('grecaptcha', {
      sitekey: '6LcgaTMUAAAAACZXKcB6ik_MMVY__gwL1zb8d3lq',
      callback: window.onPresaleFormSubmit,
      size: 'invisible',
    });

    captchaHandler = window.grecaptcha.execute;

    window.grecaptcha.execute = function () {
      if (!isNextStepAllowed()) {
        console.error('Execution of recaptcha from the console is prohibited');

        validateAllFields();

        return showFormErrors();
      }

      return captchaHandler();
    }
  }

  function showRecaptcha() {
    setTimeout(function() {
      $('#grecaptcha').removeClass('hidden');
    }, form.showRecaptchaTimeout);
  }
})(jQuery);
