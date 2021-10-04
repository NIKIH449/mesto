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
} from '../utils/constants.js';

//  храним токен и url
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-28',
  headers: {
    authorization: '61ec0817-2cd1-4935-b48e-293d9bfb9a8c',
    'Content-Type': 'application/json'
  }
});

//  храним айди пользователя, что бы передать его в карточку
let userId;

//  получаем информацию о пользователе при загрузке страницы
const profileInfo = api.getUserInfo()

//  получаем с сервера дефолтные карточки
const itinialCards = api.getInitialCards()

  //  выполняем промиcы
Promise.all([profileInfo, itinialCards])
  .then(data => {
    userInfo.setUserInfo(data[0])
    userId = data[0]._id
    cardList.renderItems(data[1])
  })
  .catch(err => {
    console.log(err)
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
  handleFormSubmit: (inputValue) => {
    popupAddCard.onSubmitStart()
    api.setNewCard(inputValue.name, inputValue.link)
      .then(data => {
        const card = createCard(
          data.name,
          data.link,
          '.element__template',
          () => { popupBigCard.open(data) },
          (...args) => { popupDeletePicture.open(...args) },
          data.likes,
          data._id,
          api,
          data.owner._id,
          userId,
          )
          getCardPrepend(card);
          popupAddCard.close();
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        popupAddCard.onSubmitDefault()
      })
  },
});
popupAddCard.setEventListeners();

// попап смены аватарки
const popupAvatar = new PopupWithForm({
  popupSelector: '.popup_type_change-avatar',
  handleFormSubmit: (inputValue) => {
    popupAvatar.onSubmitStart()
    api.setUserAvatar(inputValue.avatar)
      .then(data => {
        userInfo.setUserInfo(data)
        popupAvatar.close()
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        popupAvatar.onSubmitDefault()
      })
  }
})
popupAvatar.setEventListeners()

//  создание дефолтных шести карточек
const cardList = new Section({
  renderer: (data) => {
    const card = createCard(
      data.name,
      data.link,
      '.element__template',
      () => { popupBigCard.open(data)},
      (...args) => { popupDeletePicture.open(...args) },
      data.likes,
      data._id,
      api,
      data.owner._id,
      userId,
    )
    getCardAppend(card);
  }
}, '.elements__list');

//  создание карточек
function createCard(name, link, templateSelector, handleCardClick, popupCardDelete, likes, id, api, ownderId, userId) {
  const card = new Card(name, link, templateSelector, handleCardClick, popupCardDelete, likes, id, api, ownderId, userId).generateCard();
  return card
};

function getCardAppend(card) {
  cardList.addItemAppend(card);
}

function getCardPrepend(card) {
  cardList.addItemPrepend(card);
}

//  попап подтверждения удаления карточки
const popupDeletePicture = new PopupWithConfirmation({
  popupSelector: '.popup_type_delete-picture',
  handleFormSubmit: () => {
    api.deleteCard(popupDeletePicture.id())
      .then(() => {
        popupDeletePicture.close()
        popupDeletePicture.handlerDeleteCard()
      })
      .catch(err => {
        console.log(err)
    })
  }
});
popupDeletePicture.setEventListeners();

//  меняем информацию о пользователе
const userInfo = new UserInfo(profileName, profileDescription, userAvatar)
const popupEditUserInfo = new PopupWithForm({
  popupSelector:  '.popup_type_edit-profile',
  handleFormSubmit: (inputValue) => {
    popupEditUserInfo.onSubmitStart()
    api.setUserInfo(inputValue.username, inputValue.description)
      .then(data => {
        userInfo.setUserInfo(data)
        popupEditUserInfo.close()
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        popupEditUserInfo.onSubmitDefault()
      })
  }
});
popupEditUserInfo.setEventListeners();

//  создаем класс попапа с большой картинкой для каждой карточки
const popupBigCard = new PopupWithImage('.popup_type_picture');
popupBigCard.setEventListeners();

//  обработчики событий
//  кнопка открытия попапа редактирования профиля
editButton.addEventListener('click', () => {
  popupEditUserInfo.open()
  const userProfile = userInfo.getUserInfo()
  nameInput.value = userProfile.userName
  jobInput.value = userProfile.userDescription
  formValidatorEditProfile.resetPopupForm();
});

//  кнопка попапа добавить карточку
plusButton.addEventListener('click', () => {
  popupAddCard.open();
  formValidatorAddPicture.resetPopupForm();
});

//  кнопка сменить аватарку
avatarButton.addEventListener('click', () => {
  popupAvatar.open()
  formValidatorChangeAvatar.resetPopupForm();
})