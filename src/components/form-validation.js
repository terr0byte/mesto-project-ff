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
  if (!inputElement.validity.valid) {
    showError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationConfig.inputErrorClass,
      validationConfig.errorClass
    );
  } else if (inputElement.validity.patternMismatch) {
    showError(
      formElement,
      inputElement,
      inputElement.dataset.regex,
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
    disableSubmitButton(buttonElement, inactiveButtonClass)
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

const disableSubmitButton = (button, inactiveButtonClass) => {
  button.classList.add(inactiveButtonClass);
  button.disabled = true;
}

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

function clearValidation(formElement, validationConfig) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );
  disableSubmitButton(buttonElement, validationConfig.inactiveButtonClass);
  inputList.forEach((inputElement) => {
    hideError(
      formElement,
      inputElement,
      validationConfig.inputErrorClass,
      validationConfig.errorClass
    );
  });
}

export { enableValidation, clearValidation };
