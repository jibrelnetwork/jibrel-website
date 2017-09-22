(function($) {
  var totalSteps = 3;
  var currentStep = 1;

  var formFields = {
    checkbox1: false,
    checkbox2: false,
    fullname: false,
    email: false,
    country: false,
    citizenship: false,
    currency: false,
    amount: false,
  }

  var validateFields = {
    checkbox1: validateCheckbox,
    checkbox2: validateCheckbox,
    fullname: validateString,
    email: validateEmail,
    country: validateString,
    citizenship: validateString,
    currency: validateString,
    amount: validateNumber,
  }

  $(document).ready(function() {
    $('.remodal-content input[type="checkbox"]').on('change', watchFormField);
    $('.remodal-content input').on('input', watchFormField);

    $('#next-step').click(function(e) {
      e.preventDefault();

      if ($(this).hasClass('disabled')) {
        return;
      }

      var nextStep = currentStep + 1;

      $('.remodal-content .step-' + currentStep).toggleClass('active');
      $('.remodal-content .step-' + nextStep).toggleClass('active');

      if (nextStep === totalSteps) {
        $('#next-step').html('Submit form');
      }

      changeStepsCounter(nextStep);

      e.stopPropagation();
    });
  });

  function watchFormField(event) {
    var fieldName = event.target.name;
    var fieldValue = event.target.value;

    formFields[fieldName] = validateFields[fieldName](fieldValue);

    checkNextStepAllowed();
  }

  function validateCheckbox(value) {
    return (value === 'on');
  }

  function validateString(value) {
    var numbersRe = /\d/g;

    if (
      (value.length < 3) ||
      (numbersRe.test(value))
    ) {
      return false;
    }

    return true;
  }

  function validateNumber(value) {
    var notNumbersRe = /\D/g;

    if (
      (value.length < 1) ||
      (notNumbersRe.test(value))
    ) {
      return false;
    }

    return true;
  }

  function validateEmail(value) {
    var emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return emailRe.test(value);
  }

  function checkNextStepAllowed() {
    var isNextStepAllowed = false;

    if (currentStep === 1) {
      isNextStepAllowed = (formFields.checkbox1 && formFields.checkbox2);
    } else if (currentStep === 2) {
      isNextStepAllowed = (formFields.fullname && formFields.email && formFields.country && formFields.citizenship);
    } else if (currentStep === 3) {
      isNextStepAllowed = (formFields.currency && formFields.amount);

      if (isNextStepAllowed) {
        var amount = $('#form-amount').val();
        var currency = $('#form-currency').val();

        $('#total-amount').html('' + amount + ' ' + currency);
      }
    }

    if (isNextStepAllowed) {
      return $('#next-step').removeClass('disabled');
    }

    $('#next-step').addClass('disabled');
  }

  function changeStepsCounter(nextStep) {
    currentStep = nextStep;

    if (nextStep > totalSteps) {
      $('.remodal-footer').html('');
      $('.remodal-footer').css('padding', 0);

      return;
    }

    $('#next-step').addClass('disabled');
    $('#steps-counter').html('' + currentStep + ' / ' + totalSteps);
  }
})(jQuery);
