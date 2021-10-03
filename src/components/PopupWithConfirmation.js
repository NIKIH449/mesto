import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  open(cardId, handlerDeleteCard) {
    super.open()
    this._handlerDeleteCard = handlerDeleteCard
    this._id = cardId
  }

  id() {
    return this._id
  }

  close() {
    super.close()
  }

  setEventListeners() {
    super.setEventListeners()
    this._popup.addEventListener('submit', (e) => {
      e.preventDefault();
      this._handleFormSubmit()
      this._handlerDeleteCard()
      this.close();
    });
  }
}