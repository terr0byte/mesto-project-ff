function showError(
  formElement,
  inputElement,
  errorMessage,
  inputErrorClass,
  errorClass
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

function hideError(formElement, inputElement, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
}

function checkInputValidity(formElement, inputElement, validationConfig) {
  const regex = new RegExp(inputElement.dataset.regex, "gim");
  if (!inputElement.validity.valid) {
    showError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationConfig.inputErrorClass,
      validationConfig.errorClass
    );
  } else if (!regex.test(inputElement.value)) {
    showError(
      formElement,
      inputElement,
      "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы",
      validationConfig.inputErrorClass,
      validationConfig.errorClass
    );
  } else {
    hideError(
      formElement,
      inputElement,
      validationConfig.inputErrorClass,
      validationConfig.errorClass
    );
  }
}

function setEventListeners(formElement, validationConfig) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );
  toggleButtonState(
    inputList,
    buttonElement,
    validationConfig.inactiveButtonClass
  );
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, validationConfig);
      toggleButtonState(
        inputList,
        buttonElement,
        validationConfig.inactiveButtonClass
      );
    });
  });
}

function hasInvalidInput(inputList) {
  return inputList.some((el) => {
    return !el.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
}

// validationConfig: {
//  formSelector: '.popup__form',
//  inputSelector: '.popup__input',
//  submitButtonSelector: '.popup__button',
//  inactiveButtonClass: 'popup__button-inactive',
//  inputErrorClass: 'popup__input_type_error',
//  errorClass: 'popup__error-visible'
// }

function enableValidation(validationConfig) {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, validationConfig);
  });
}

function clearValidation(profileForm, validationConfig) {
  const inputList = Array.from(
    profileForm.querySelectorAll(validationConfig.inputSelector)
  );
  inputList.forEach((inputElement) => {
    hideError(
      profileForm,
      inputElement,
      validationConfig.inputErrorClass,
      validationConfig.errorClass
    );
  });
}

export { enableValidation, clearValidation };
