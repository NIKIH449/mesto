export default class Card {
  constructor(name, link, cardSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
    this._element.querySelector('.element__picture').src = this._link;
    this._element.querySelector('.element__picture').alt = this._name;
    this._element.querySelector('.element__place-name').textContent = this._name;
    this._likeButton = this._element.querySelector('.element__button-like');
    this.setEventListeners();
    return this._element;
  };

  //  метод лайка
  _toggleLike = () => {
    this._likeButton.classList.toggle('element__button-like_active');
  };

  //  метод удаления
  _removeCard = () => {
    this._element.remove();
    this._element = null;
  };

  //  слушатели событий
  setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._toggleLike();
    });
    this._element.querySelector('.element__button-remove').addEventListener('click', () => {
      this._removeCard();
    });
    this._element.querySelector('.element__picture').addEventListener('click', this._handleCardClick)
  };
};