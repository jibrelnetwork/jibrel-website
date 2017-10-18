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
      // phone: validatePhone,
      country: validateCountry,
      citizenship: validateCitizenship,
      currency: validateCurrency,
      amount: validateAmount,
      captcha: validateCaptcha,
    },
    validations: {
      checkbox1: false,
      checkbox2: false,
      fullname: false,
      email: false,
      emailconfirm: false,
      // phone: true,
      country: false,
      citizenship: false,
      currency: false,
      amount: false,
      captcha: false,
    },
    data: {
      checkbox1: false,
      checkbox2: false,
      fullname: '',
      email: '',
      emailconfirm: '',
      // phone: '',
      country: '',
      citizenship: '',
      currency: '',
      amount: '',
      captcha: '',
    },
    countries: countries,
    currencies: ['ETH', 'BTC'],
    // submitURL: 'http://localhost:3001/v2/presale_request',
    submitURL: 'https://saleaddresses.jibrel.network/application',
    btcUSD: 4000,
    ethUSD: 300,
    i18n: window.i18n.remodal,
  }

  $(document).ready(function() {
    startWatchingFormFields();

    initClickHandlers();
    initSelects();
    initRemodalEvents();
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
      $('#next-step').html(form.i18n.submit);
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
      return form.i18n.step2.errors.fullname[0];
    }

    return null;
  }

  function validateEmail(value) {
    var emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    validateField('emailconfirm', form.data.emailconfirm);

    return emailRe.test(value) ? null : form.i18n.step2.errors.email[0];
  }

  function validateEmailConfirm(value) {
    var email = form.data.email.toLowerCase();
    var emailConfirm = value.toLowerCase();

    return (email === emailConfirm) ? null : form.i18n.step2.errors.emailconfirm[0];
  }

  function validatePhone(value) {
    if (!validateOptional(value)) {
      return form.i18n.step2.errors.phone
    }

    return null;
  }

  function validateCountry(value) {
    var isValidString = validateString(value);
    var isFound = (form.countries.indexOf(value) > -1);

    if (!(isValidString && isFound)) {
      return form.i18n.step2.errors.country[0];
    } else if (!validateProhibitedCountry(value)) {
      return form.i18n.step2.errors.country[1];
    }

    return null;
  }

  function validateCitizenship(value) {
    var isValidString = validateString(value);
    var isFound = (form.countries.indexOf(value) > -1);

    if (!(isValidString && isFound)) {
      return form.i18n.step2.errors.citizenship[0];
    } else if (!validateProhibitedCountry(value)) {
      return form.i18n.step2.errors.citizenship[1];
    }

    return null;
  }

  function validateCurrency(value) {
    if (!validateString(value)) {
      return form.i18n.step3.errors.currency[0];
    }

    validateField('amount', form.data.amount);

    return null;
  }

  function validateAmount(value) {
    if (!validateNumber(value)) {
      return form.i18n.step3.errors.amount[0];
    }

    var amount = parseFloat(value, 10);
    var currency = $('#currency').val();

    switch (currency) {
      case 'ETH':
        return (amount < 15) ? form.i18n.step3.errors.amount[1] : null;
      case 'BTC':
        return (amount < 1) ? form.i18n.step3.errors.amount[2] : null;
      default:
        return null;
    }
  }

  function validateCaptcha(value) {
    if (!((typeof value === 'string') && (value.length > 0))) {
      return form.i18n.step3.errors.captcha[0];
    }

    return null;
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
      isNextStepAllowed = (validations.currency && validations.amount && validations.captcha);

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

    $('#next-step').html(form.i18n.next);

    checkNextStepAllowed();
  }

  function onNextStep(nextStep) {
    pushGAEvent(nextStep);

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

  function onSuccessSubmit(response, textStatus, jqXHR) {
    hideModalFooter();

    var statusCode = jqXHR.status
    var isValidStatus = ((statusCode === 200) || (statusCode === 201))

    if (isValidStatus && response && (response.error === false)) {
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
      // phone: data.phone,
      country: data.country,
      citizenship: data.citizenship,
      currency: data.currency,
      amount: data.amount,
      'g-recaptcha-response': data.captcha,
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

  function setCurrentStep(step) {
    $('.remodal-content .step-' + step).addClass('active');
    $('.remodal-content .step-' + form.currentStep).removeClass('active');
    $('#steps-counter').html(' - ' + form.i18n.step + ' ' + step + '/' + form.totalSteps);

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

  function pushGAEvent(nextStep) {
    var currentStep = nextStep - 1;

    try {
      ga('send', 'event', '/virtual/presaleform' + currentStep + '/');
    } catch (e) {
      console.error(e);
    }
  }

  function initClickHandlers() {
    $('#previous-step').click(onPreviousStepClick);
    $('#next-step').click(onNextStepClick);
  }

  function initSelects() {
    var handler = initAutocomplete;

    if (isIOSDevice()) {
      handler = initSelect;

      ['country', 'citizenship', 'currency'].forEach(function(item) {
        $('#' + item).removeClass('field-input').addClass('field-select');
      });
    }

    handler({
      source: form.countries,
      id: 'country',
      placeholder: form.i18n.step2.placeholders.country + ' *',
      onChange: watchFormField,
    });

    handler({
      source: form.countries,
      id: 'citizenship',
      placeholder: form.i18n.step2.placeholders.citizenship + ' *',
      onChange: watchFormField,
    });

    handler({
      source: form.currencies,
      id: 'currency',
      placeholder: form.i18n.step3.placeholders.currency,
      alwaysAll: true,
      readonly: true,
      onChange: watchFormField,
    });
  }

  window.initRecaptcha = function() {
    var windowWidth = $(window).outerWidth();
    var isCompact = (windowWidth < 450);

    if (isCompact) {
      $('#captcha-container').addClass('compact');
    }

    window.grecaptcha.render('grecaptcha', {
      size: isCompact ? 'compact' : 'normal',
      sitekey: '6LcgaTMUAAAAACZXKcB6ik_MMVY__gwL1zb8d3lq',
      callback: setRecaptchaResponse,
      'expired-callback': setRecaptchaResponse.bind(null, ''),
    });
  }

  function setRecaptchaResponse(recaptchaResponse) {
    var event = {
      target: { name: 'captcha', value: recaptchaResponse },
    }

    return watchFormField(event);
  }

  function isIOSDevice() {
    var userAgent = window.navigator.userAgent;

    return (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i));
  }

  function initRemodalEvents() {
    if (window.navigator.userAgent.match(/iPhone/i)) {
      $(document).on('opened', '.remodal', function () {
        $('.remodal-bg').css('display', 'none');
      });

      $(document).on('opening', '.remodal', function () {
        $('.remodal-bg').css('display', 'none');
      });

      $(document).on('closing', '.remodal', function (e) {
        $('.remodal-bg').css('display', 'block');
      });
    }

    $(document).on('opened', '.remodal', function () {
      pushGAEvent(1);
    });
  }
})(jQuery);
