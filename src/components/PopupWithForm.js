import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._buttonSubmit = this._popup.querySelector('.popup__button-save')
  };

  onSubmitStart() {
    this._buttonSubmit.textContent = `Сохранение...`;
  }

  onSubmitDefault() {
    this._buttonSubmit.textContent = `Сохранить`;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => (this._formValues[input.name] = input.value));
    return this._formValues;
  };

  close() {
    super.close();
    setTimeout(() => {this._form.reset()}, 220)
  };

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues())
    });
  };
};
