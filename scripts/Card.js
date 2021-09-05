import openPopup from './index.js';
export default class Card {
  constructor(name, link, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  };

  //  получаем и копируем темплейт карточки
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
      return cardElement;
  };

  //  присваиваем карточке все параметры и возвращаем ее
  generateCard = () => {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.element__picture').src = this._link;
    this._element.querySelector('.element__picture').alt = this._name;
    this._element.querySelector('.element__place-name').textContent = this._name;
    return this._element;
  };
  //  метод лайка
  _toggleLike = () => {
    const likeButton = this._element.querySelector('.element__button-like');
    likeButton.classList.toggle('element__button-like_active');
  };

    //  метод удаления
  _removeCard = () => {
    this._element.remove();
  };

    //  метод открытия попапа с карточкой, и присваивания параметры картинке
  _openBigPicture = () => {
    const bigPicture = document.querySelector('.popup__image');
    const formElementBigPicture = document.querySelector('.popup_type_picture');
    openPopup(formElementBigPicture);
    bigPicture.src = this._link;
    bigPicture.alt = this._name;
    document.querySelector('.popup__picture-description').textContent = this._name; //  описание картинки
  };

  //  слушатели событий
  _setEventListeners() {
    this._element.querySelector('.element__button-like').addEventListener('click', () => {
      this._toggleLike();
    });
    this._element.querySelector('.element__button-remove').addEventListener('click', () => {
      this._removeCard();
    });
    this._element.querySelector('.element__picture').addEventListener('click', () => {
      this._openBigPicture();
    });
  };
};