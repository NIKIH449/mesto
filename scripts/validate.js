//  добавляем класс ошибки
const showInputError = (formSelector, inputSelector, errorMessage, object) => {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.add(object.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(object.spanErrorClassActive);
};

//  убираем класс ошибки
const hideInputError = (formSelector, inputSelector, object) => {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.remove(object.inputErrorClass);
  errorElement.classList.remove(object.spanErrorClassActive);
  errorElement.textContent= '';
};

// проверка валидности поля
const checkInputValidity = (formSelector, inputSelector, object) => {
  if (!inputSelector.validity.valid) {
    showInputError(formSelector, inputSelector, inputSelector.validationMessage, object);  //  если невалидно добавляем классы, которые показывают ошибку
  } else {
    hideInputError(formSelector, inputSelector, object);  //  если валидно удаляем эти классы
  }
};

//  задаем слушатели
function setEventListeners(formSelector, object) {
  const inputList = Array.from(formSelector.querySelectorAll(object.inputSelector)); //  получаем массив инпутов
  const submitButtonSelector = formSelector.querySelector(object.submitButtonSelector); //  получаем кнопку сабмита
  toggleButtonState(inputList, submitButtonSelector, object); //  переключение состояния кнопки сабмита
  inputList.forEach((inputSelector) => {
    inputSelector.addEventListener('input', function () {  //  каждому инпуту задаем слушатель, если срабатывает событие инпут
      checkInputValidity(formSelector, inputSelector, object);  //  проверяем валиден ли инпу
      toggleButtonState(inputList, submitButtonSelector, object);  //  переключение состояния кнопки
    });
  });
};

function enableValidation(object) {
  const formList = Array.from(document.querySelectorAll(object.formSelector)); //  получаем массив форм
  formList.forEach((formSelector) => {
    formSelector.addEventListener('submit', (e) => {
      e.preventDefault(); //  сбрасываем стандартное поведение браузера формам
    });
    const fieldsetList = Array.from(formSelector.querySelectorAll(object.fieldSet)); //  получаем массив филдсетов
    fieldsetList.forEach((fieldSet) => {
    setEventListeners(fieldSet, object);  //  для каждого филдсета, задаем набор слушателей
    });
  });
};

//  объект со всеми селекторами и классами, что используются при валидации
enableValidation({
  formSelector: '.popup__form',  //  формы
  inputSelector: '.popup__input',  //  инпуты
  submitButtonSelector: '.popup__button-save',  //  кнопка
  submitButtonSelectorDisabled: 'popup__button-save_disabled',  //  кнопка отключенная
  inputErrorClass: 'popup__input_type_error',  //  инпут с ошибкой
  spanErrorClassActive: 'popup__input-error_active',  //  спан с ошибкой
  fieldSet: '.popup__set',  // филдсет
});

//  проверяем невалидно ли хоть одно поле
function hasInvalidInput(inputList) {
  return inputList.some((inputSelector) => {
    return !inputSelector.validity.valid;
  });
}

//  фукцния изменения кнопки сабмита
function toggleButtonState(inputList, submitButtonSelector, object) {
  if (hasInvalidInput(inputList)) { //  если одно из полей невалидно
    submitButtonSelector.classList.add(object.submitButtonSelectorDisabled); //  добавляем класс, который выключает кнопку
  } else {
    submitButtonSelector.classList.remove(object.submitButtonSelectorDisabled); //  убираем класс, который выключает кнопку
    submitButtonSelector.removeAttribute('disabled');  // разблокируем кнопку
  };
};