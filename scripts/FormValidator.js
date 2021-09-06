export default class FormValidator {
  constructor(object, formElement) {
    this._inputClass = object.inputClass;
    this._submitButtonClass = object.submitButtonClass;
    this._submitButtonClassDisabled = object.submitButtonClassDisabled;
    this._inputErrorClass = object.inputErrorClass;
    this._spanErrorClassActive = object.spanErrorClassActive;
    this._spanErrorClass = object.spanErrorClass;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputClass));
    this._submitButtonElement = this._formElement.querySelector(this._submitButtonClass);
    this._spacErrorClassList = Array.from(this._formElement.querySelectorAll(this._spanErrorClass));
  };

  //  добавляем класс ошибки
  _showInputError = (inputClass, errorMessage) => {
    const errorElement = this._formElement.querySelector(`.${inputClass.id}-error`);
    inputClass.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._spanErrorClassActive);
  };

  //  убираем класс ошибки
  _hideInputError = (inputClass) => {
    const errorElement = this._formElement.querySelector(`.${inputClass.id}-error`);
    inputClass.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._spanErrorClassActive);
    errorElement.textContent= '';
  };

  // проверка валидности поля
  _checkInputValidity = (inputClass) => {
    if (!inputClass.validity.valid) {
      this._showInputError(inputClass, inputClass.validationMessage);  //  если невалидно добавляем классы, которые показывают ошибку
    } else {
      this._hideInputError(inputClass);  //  если валидно удаляем эти классы
    };
  };

  //  задаем слушатели
  _setEventListeners = () => {
    this._toggleButtonState(this._inputList, this._submitButtonElement);  //  переключение состояния кнопки сабмита
    this._inputList.forEach((inputClass) => {
      inputClass.addEventListener('input',  () => {  //  каждому инпуту задаем слушатель, если срабатывает событие инпут
        this._checkInputValidity(inputClass);  //  проверяем валиден ли инпут
        this._toggleButtonState(this._inputList, this._submitButtonElement);  //  переключение состояния кнопки
      });
    });
  };

  enableValidation = () => {
    this._setEventListeners();  //  для каждого филдсета, задаем набор слушателей
  };

  //  проверяем невалидно ли хоть одно поле
  _hasInvalidInput = () => {
    return this._inputList.some((inputClass) => {
      return !inputClass.validity.valid;
    });
  };

  //  фукцния изменения кнопки сабмита
  _toggleButtonState = (inputList, submitButtonElement) => {
    if (this._hasInvalidInput(inputList)) { //  если одно из полей невалидно
      submitButtonElement.classList.add(this._submitButtonClassDisabled); //  добавляем класс, который выключает кнопку
      submitButtonElement.setAttribute('disabled', true);
    } else {
      submitButtonElement.classList.remove(this._submitButtonClassDisabled); //  убираем класс, который выключает кнопку
      submitButtonElement.removeAttribute('disabled');  // разблокируем кнопку
    };
  };

  //  функцияя сброса значений у инпутов и спанов, а также ставящая дизейбл кнопке сабмита
  resetPopupForm = () => {
  this._spacErrorClassList.forEach((spacErrorClass) => {
    spacErrorClass.textContent= ' '; //  очищаем каждый спан
  });
  this._inputList.forEach((inputClass) => {
    inputClass.classList.remove(this._inputErrorClass);  // у каждого инпута удаляем класс с ошибкой
  });
  this._submitButtonElement.classList.add(this._submitButtonClassDisabled);
  };
};