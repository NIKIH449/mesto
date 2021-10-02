import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    console.log(this._handleFormSubmit)
  }

  setEventListeners() {
    super.setEventListeners()
    this._popup.addEventListener('click', (e) => {
      e.preventDefault();
      this.close();
    });
  }
}