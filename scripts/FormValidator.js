export default class FormValidator {
  constructor(object, formElement) {
    this._inputSelector = object.inputSelector;
    this._submitButtonSelector = object.submitButtonSelector;
    this._submitButtonClassDisabled = object.submitButtonClassDisabled;
    this._inputErrorClass = object.inputErrorClass;
    this._spanErrorClassActive = object.spanErrorClassActive;
    this._spanErrorClass = object.spanErrorClass;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._submitButtonElement = this._formElement.querySelector(this._submitButtonSelector);
  };

  //  добавляем класс ошибки
  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._spanErrorClassActive);
  };

  //  убираем класс ошибки
  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._spanErrorClassActive);
    errorElement.textContent= '';
  };

  // проверка валидности поля
  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);  //  если невалидно добавляем классы, которые показывают ошибку
    } else {
      this._hideInputError(inputElement);  //  если валидно удаляем эти классы
    };
  };

  //  задаем слушатели
  _setEventListeners = () => {
    this._toggleButtonState();  //  переключение состояния кнопки сабмита
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input',  () => {  //  каждому инпуту задаем слушатель, если срабатывает событие инпут
        this._checkInputValidity(inputElement);  //  проверяем валиден ли инпут
        this._toggleButtonState(this._inputList, this._submitButtonElement);  //  переключение состояния кнопки
      });
    });
  };

  enableValidation = () => {
    this._setEventListeners();  //  для каждого филдсета, задаем набор слушателей
  };

  //  проверяем невалидно ли хоть одно поле
  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  //  метод дизейбла кнопки сабмитп
  _disableSubmitButton = () => {
    this._submitButtonElement.classList.add(this._submitButtonClassDisabled); //  добавляем класс, который выключает кнопку
    this._submitButtonElement.setAttribute('disabled', true);
  };

  //  метод изменения кнопки сабмита
  _toggleButtonState = () => {
    if (this._hasInvalidInput()) { //  если одно из полей невалидно
      this._disableSubmitButton();
    } else {
      this._submitButtonElement.classList.remove(this._submitButtonClassDisabled); //  убираем класс, который выключает кнопку
      this._submitButtonElement.removeAttribute('disabled');  // разблокируем кнопку
    };
  };

  //  метод сброса значений у инпутов и спанов
  resetPopupForm = () => {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._disableSubmitButton();
  };
};