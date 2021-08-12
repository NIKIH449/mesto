//  добавляем класс ошибки
const showInputError = (formSelector, inputSelector, errorMessage) => {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`)
  inputSelector.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

//  убираем класс ошибки
const hideInputError = (formSelector, inputSelector) => {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`)
  inputSelector.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent= ' '
};

// проверка валидности поля
const checkInputValidity = (formSelector, inputSelector) => {
  if (!inputSelector.validity.valid) {
    showInputError(formSelector, inputSelector, inputSelector.validationMessage);  //  если невалидно добавляем классы, которые показывают ошибку
  } else {
    hideInputError(formSelector, inputSelector);  //  если валидно удаляем эти классы
  }
};

//  функцияя сброса значений у инпутов и спанов
function resetValidation () {
  const formList = document.querySelectorAll('.popup__form')
  formList.forEach((formSelector) => {
    const inputErrorList = Array.from(formSelector.querySelectorAll('.popup__input-error'));
    inputErrorList.forEach((errorElement) => {
      errorElement.textContent= ' '
      });
    const inputList = Array.from(formSelector.querySelectorAll('.popup__input'));
    inputList.forEach((inputSelector) => {
      inputSelector.classList.remove('popup__input_type_error');
      });
    })
}

//  задаем слушатели
function setEventListeners(formSelector) {
  const inputList = Array.from(formSelector.querySelectorAll('.popup__input'));
  const submitButtonSelector = formSelector.querySelector('.popup__button-save');
  toggleButtonState(inputList, submitButtonSelector);
  inputList.forEach((inputSelector) => {
    inputSelector.addEventListener('input', function () {
      checkInputValidity(formSelector, inputSelector);
      toggleButtonState(inputList, submitButtonSelector);
      });
    });
  }

function enableValidation() { //  сбрасываем стандартное поведение браузера
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formSelector) => {
    formSelector.addEventListener('submit', (e) => {
      e.preventDefault();
    })
    const fieldsetList = Array.from(formSelector.querySelectorAll('.popup__set'));
    fieldsetList.forEach((fieldSet) => {
    setEventListeners(fieldSet);
    });
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inputErrorClass: 'popup__input_type_error',
});


//  включаем кнопку сабмита
function enableSubmitButton(submitButtonSelector) {
  submitButtonSelector.classList.remove('popup__button-save_disabled');
}

//  задаем массив полей
function hasInvalidInput(inputList) {
  return inputList.some((inputSelector) => {
    return !inputSelector.validity.valid;
  });
}

//  фукцния изменения кнопки сабмита
function toggleButtonState(inputList, submitButtonSelector) {
  if (hasInvalidInput(inputList)) {
    submitButtonSelector.classList.add('popup__button-save_disabled');
  } else {
    submitButtonSelector.classList.remove('popup__button-save_disabled');
  }
}