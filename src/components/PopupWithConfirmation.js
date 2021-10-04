import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  open(cardId, handlerDeleteCard) { //  передаем айди карточки, и функцию удаления карточки
    super.open();
    this.handlerDeleteCard = handlerDeleteCard;
    this._id = cardId;
  }

  id() {
    return this._id;
  }

  setEventListeners() {
    super.setEventListeners()
    this._popup.addEventListener('submit', (e) => {
      e.preventDefault();
      this._handleFormSubmit(); //  отправляем на сервер
    });
  }
}