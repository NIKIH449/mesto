import './index.css';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js';
import Card from '../components/Card.js';
import Api from '../components/Api.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import FormValidator from '../components/FormValidator.js';
import {
  popupEditProfile,
  popupAddPicture,
  nameInput,
  jobInput,
  editButton,
  plusButton,
  profileName,
  profileDescription,
  object,
  userAvatar,
  avatarButton,
  popupChangeAvatar,
  likeCount,
} from '../utils/constants.js';

//  храним токен
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-28',
  headers: {
    authorization: '61ec0817-2cd1-4935-b48e-293d9bfb9a8c',
    'Content-Type': 'application/json'
  }
});

let userId

api.getUserInfo()
  .then((res) => {
    userId = res._id
  })


//  создаем экземпляры класса валидации
const formValidatorEditProfile = new FormValidator(object, popupEditProfile);
formValidatorEditProfile.enableValidation();
const formValidatorAddPicture = new FormValidator(object, popupAddPicture);
formValidatorAddPicture.enableValidation();
const formValidatorChangeAvatar = new FormValidator(object, popupChangeAvatar);
formValidatorChangeAvatar.enableValidation();

//  добавление карточки через попап
const popupAddCard = new PopupWithForm({
  popupSelector: '.popup_type_add-picture',
  handleFormSubmit: (item) => {
    api.setNewCard(item.name, item.link)
      .then((info) => {
        const card = createCard(
          info.name,
          info.link,
          '.element__template',
          () => { popupBigCard.open(info) },
          () => { popupDeletePicture.open()},
          info.likes,
          info._id,
          api,
          info.owner._id,
          userId,
          () => { card.deleteCard() }
          )
          getCardPrepend(card);
      })
      .catch(err => {
          console.log(err)
      })
  },
});
popupAddCard.setEventListeners();

// функционал смены аватарки
const popupAvatar = new PopupWithForm({
  popupSelector: '.popup_type_change-avatar',
  handleFormSubmit: (item) => {
    userInfo.setUserAvatar(item.avatar)
    api.setUserAvatar(item.avatar)
  }
})
popupAvatar.setEventListeners()

//  создание дефолтных шести карточек
const cardList = new Section({
  renderer: (item) => {
    const card = createCard(
      item.name,
      item.link,
      '.element__template',
      () => { popupBigCard.open(item) },
      () => { popupDeletePicture.open()},
      item.likes,
      item._id,
      api,
      item.owner._id,
      userId,
      () => { card.deleteCard() }
    )
    getCardAppend(card);
  }
}, '.elements__list');

//  создание карточек
function createCard(name, link, templateSelector, handleCardClick, popupCardDelete, likes, id, api, ownderId, userId, handlerCardDelete) {
  const card = new Card(name, link, templateSelector, handleCardClick, popupCardDelete, likes, id, api, ownderId, userId, handlerCardDelete).generateCard();
  return card
};

function getCardAppend(card) {
  cardList.addItemAppend(card);
}

function getCardPrepend(card) {
  cardList.addItemPrepend(card);
}

const popupDeletePicture = new PopupWithConfirmation({
  popupSelector: '.popup_type_delete-picture',
})
popupDeletePicture.setEventListeners()

//  вставляем с сервера дефолтные карточки
api.getInitialCards()
  .then((cards) => {
    cardList.renderItems(cards)
  })
  .catch(err => {
      console.log(err)
  })

api.getUserInfo()
  .then((data => {
    userInfo.setUserInfo(data.name, data.about)
    userInfo.setUserAvatar(data.avatar)
  }))
  //  меняем информацию о пользователе
const userInfo = new UserInfo(profileName, profileDescription, userAvatar)
const popupEditUserInfo = new PopupWithForm({
  popupSelector:  '.popup_type_edit-profile',
  handleFormSubmit: (item) => {
    userInfo.setUserInfo(item.username, item.description);
    api.setUserInfo(item.username, item.description);
  }
});
popupEditUserInfo.setEventListeners();

//  создаем класс каждому попапу
const popupBigCard = new PopupWithImage('.popup_type_picture');
popupBigCard.setEventListeners();

//  обработчики событий
//  кнопка открытия попапа
editButton.addEventListener('click', () => {
  popupEditUserInfo.open()
  const userProfile = userInfo.getUserInfo()
  nameInput.value = userProfile.userName
  jobInput.value = userProfile.userDescription
  formValidatorEditProfile.resetPopupForm();
});

//  кнопка добавить картинку
plusButton.addEventListener('click', () => {
  popupAddCard.open();
  formValidatorAddPicture.resetPopupForm();
});

//  кнопка сменить аватарку
avatarButton.addEventListener('click', () => {
  popupAvatar.open()
  formValidatorChangeAvatar.resetPopupForm();
})