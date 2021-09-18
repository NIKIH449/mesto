import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPicture = this._popup.querySelector('.popup__image');
    this._popupPictureName = this._popup.querySelector('.popup__picture-description');
  };

  open(item) {
    super.open();
    this._popupPicture.src = item.link;
    this._popupPictureName.textContent = item.name;
    this._popupPicture.textContent = item.name;
  };
};