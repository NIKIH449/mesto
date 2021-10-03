export default class Card {
  constructor(name, link, cardSelector, handlerCardClick, popupCardDelete, like, id, api, ownerId, userId) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handlerCardClick;
    this._popupCardDelete = popupCardDelete;
    this._likes = like
    this._id = id
    this._api = api
    this._ownerId = ownerId
    this._userId = userId
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
    this._buttonDelete = this._element.querySelector('.element__button-remove');
    this._cardImage = this._element.querySelector('.element__picture');
    this._likeButton = this._element.querySelector('.element__button-like');
    this._likesCount = this._element.querySelector('.element__likes');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.element__place-name').textContent = this._name;
    this._element.querySelector('.element__likes').textContent = this._likes.length;
    if (this._likes.find(item => this._userId === item._id)) {
      this._likeButton.classList.add('element__button-like_active');
    }
    if (!(this._ownerId === this._userId)) {
      this._buttonDelete.classList.add('element__button-remove_disable');
    }
    this.setEventListeners();
    return this._element;
  };

  //  метод лайка
  handlerLike = () => {
    if (!(this._likeButton.classList.contains('element__button-like_active'))) {
      this._api.putLike(this._id)
        .then((res) => {
          this._likeButton.classList.add('element__button-like_active')
          this._likesCount.textContent = res.likes.length
        })
    } else {
      this._api.deleteLike(this._id)
        .then((res) => {
          this._likeButton.classList.remove('element__button-like_active')
          this._likesCount.textContent = res.likes.length
        })
    }
  };

  //  метод удаления
  removeCard = () => {
    this._element.remove();
    this._element = null;
  };


  //  слушатели событий
  setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this.handlerLike();
    });
    this._buttonDelete.addEventListener('click', () => {
      this._popupCardDelete(this._id, () => this._element.remove())
    });
    this._element.querySelector('.element__picture').addEventListener('click', this._handleCardClick)
  };
};