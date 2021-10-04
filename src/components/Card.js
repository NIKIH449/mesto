export default class Card {
  constructor(name, link, cardSelector, handlerCardClick, handlerCardDelete, likes, id, api, ownerId, userId) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handlerCardClick;
    this._handlerCardDelete = handlerCardDelete;
    this._likes = likes;
    this._id = id;
    this._api = api;
    this._ownerId = ownerId;
    this._userId = userId;
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
    this._element.querySelector('.element__likes').textContent = this._likes.length; //  количествт лайков равно длинне массива лайков получаемых с сервера
    if (this._likes.find(item => this._userId === item._id)) { //  ищем в массиве лайков айди пролайкавших карточку, если совпадает с айди пользователя -- меняем фон
      this._likeButton.classList.add('element__button-like_active');
    }
    if (!(this._ownerId === this._userId)) {    //  если айди пользователя и айди создателя карты НЕ совпадают, удаляем иконку удаления карточки
      this._buttonDelete.classList.add('element__button-remove_disable');
    }
    this.setEventListeners();
    return this._element;
  };

  //  метод лайка. при нажатии на лайк, если в результате создания карточки, в карточке нет фона лайка,
  //  то доавляем фон и меняем счетчик лайковших на длинну массива лайкнувших, пришедший с сервера. и наоборот.
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

  //  слушатели событий
  setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this.handlerLike();
    });
    //  при клике на иконку удаления, срабатывает функция открытия попапа, переданная при создании карточки.
    //  передаем в метод open айди карточки, и функцию удаления карточки, которая далее срабатывает при сабмите
    this._buttonDelete.addEventListener('click', () => {
      this._handlerCardDelete(this._id, () => this._element.remove())
    });
    this._element.querySelector('.element__picture').addEventListener('click', this._handleCardClick)
  };
};