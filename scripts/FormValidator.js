export default class FormValidator {
  constructor(object, formSelector) {
    this._inputSelector = object.inputSelector;
    this._submitButtonSelector = object.submitButtonSelector;
    this._submitButtonSelectorDisabled = object.submitButtonSelectorDisabled;
    this._inputErrorClass = object.inputErrorClass;
    this._spanErrorClassActive = object.spanErrorClassActive;
    this._formSelector = formSelector;
  };
  
  //  добавляем класс ошибки
  _showInputError = (inputSelector, errorMessage) => {
    const errorElement = this._formSelector.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._spanErrorClassActive);
  };

  //  убираем класс ошибки
  _hideInputError = (inputSelector) => {
    const errorElement = this._formSelector.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._spanErrorClassActive);
    errorElement.textContent= '';
  };

  // проверка валидности поля
  _checkInputValidity = (inputSelector) => {
    if (!inputSelector.validity.valid) {
      this._showInputError(inputSelector, inputSelector.validationMessage);  //  если невалидно добавляем классы, которые показывают ошибку
    } else {
      this._hideInputError(inputSelector);  //  если валидно удаляем эти классы
    };
  };

  //  задаем слушатели
  _setEventListeners = () => {
    const inputList = Array.from(this._formSelector.querySelectorAll(this._inputSelector)); //  получаем массив инпутов
    const submitButtonSelector = this._formSelector.querySelector(this._submitButtonSelector); //  получаем кнопку сабмита
    this._toggleButtonState(inputList, submitButtonSelector); //  переключение состояния кнопки сабмита
    inputList.forEach((inputSelector) => {
      inputSelector.addEventListener('input',  () => {  //  каждому инпуту задаем слушатель, если срабатывает событие инпут
        this._checkInputValidity(inputSelector);  //  проверяем валиден ли инпут
        this._toggleButtonState(inputList, submitButtonSelector);  //  переключение состояния кнопки
      });
    });
  };

  enableValidation = () => {
    this._setEventListeners();  //  для каждого филдсета, задаем набор слушателей
  };

  //  проверяем невалидно ли хоть одно поле
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputSelector) => {
      return !inputSelector.validity.valid;
    });
  };

  //  фукцния изменения кнопки сабмита
  _toggleButtonState = (inputList, submitButtonSelector) => {
    if (this._hasInvalidInput(inputList)) { //  если одно из полей невалидно
      submitButtonSelector.classList.add(this._submitButtonSelectorDisabled); //  добавляем класс, который выключает кнопку
    } else {
      submitButtonSelector.classList.remove(this._submitButtonSelectorDisabled); //  убираем класс, который выключает кнопку
      submitButtonSelector.removeAttribute('disabled');  // разблокируем кнопку
    };
  };
};