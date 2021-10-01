export default class Card {
  constructor(name, link, cardSelector, handleCardClick, handleCardDelete, like, id, api) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._like = like
    this._id = id
    this._api = api
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
  //  if (!(this._id === '274ce11873a65a1b26f568b5')) {
  //    this._element.querySelector('.element__button-remove').classList.add('element__button-remove_disable')
  //  }
    this._cardImage = this._element.querySelector('.element__picture');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.element__place-name').textContent = this._name;
    this._likeButton = this._element.querySelector('.element__button-like');
    this._likesCount = this._element.querySelector('.element__likes');
    this._element.querySelector('.element__likes').textContent = this._like
    this.setEventListeners();
    return this._element;
  };

  //  метод лайка
  _handlerLike = () => {
    if (!(this._likeButton.classList.contains('element__button-like_active'))) {
      this._likeButton.classList.add('element__button-like_active')
      this._api.putLike(this._id)
        .then(res => this._likesCount.textContent = res.likes.length)

    } else {
      this._likeButton.classList.remove('element__button-like_active')
      this._api.deleteLike(this._id)
        .then(res => this._likesCount.textContent = res.likes.length)
    }
  };

  //  метод удаления
  _removeCard = () => {
    this._element.remove();
    this._element = null;
  };

  //  слушатели событий
  setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handlerLike();

    });
    this._element.querySelector('.element__picture').addEventListener('click', this._handleCardClick)
    this._element.querySelector('.element__button-remove').addEventListener('click', this._handleCardDelete)
  };
};