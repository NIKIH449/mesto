export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector
    this._handleEscClose = this._handleEscClose.bind(this)
  }

  setEventListeners() {
    this._popupSelector.addEventListener('mousedown', (e) => {
      if (e.target.classList.contains('popup_opened') || e.target.classList.contains('popup__button-close')) {
        this.close()
      };
    });
  };

  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose); //  добавляем слушатель для закрытия кнопкой
  };

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  };

  _handleEscClose(e) {
    if (e.key === 'Escape') {
      this.close();
    };
  };
};