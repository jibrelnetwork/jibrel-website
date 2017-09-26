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
      emailconfirm: validateEmailConfirm,
      phone: validateOptional,
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

  function validateOptional() {
    return true;
  }

  function validateEmailConfirm(value) {
    return (form.data.email === value);
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
      setCurrentStep(form.successStep);

      var goalParams = {
        currency: form.data.currency,
        amount: form.data.amount,
      }

      reachGoal('presaleSuccess', goalParams);

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

  function reachGoal(goalTarget, goalParams) {
    try {
      yaCounter45922689.reachGoal(goalTarget, goalParams);
    } catch(e) {
      console.error(e);
    }
  }

  function initAutocompletes() {
    initAutocomplete({
      source: form.countries,
      id: 'country',
      placeholder: 'Country of Residence *',
      errorText: 'The field should be valid country!',
      onInput: watchFormField,
    });

    initAutocomplete({
      source: form.countries,
      id: 'citizenship',
      placeholder: 'Citizenship *',
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
