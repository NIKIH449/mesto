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
  popupDeleteCard,
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
  .then(res => {
    userId = res._id
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
  handleFormSubmit: (item) => {
    popupAddCard.onSubmitStart()
    api.setNewCard(item.name, item.link)
      .then((item) => {
        const card = createCard(
          item.name,
          item.link,
          '.element__template',
          () => { popupBigCard.open(item) },
          (...args) => { popupDeletePicture.open(...args) },
          item.likes,
          item._id,
          api,
          item.owner._id,
          userId,
          )
          getCardPrepend(card);
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        popupAddCard.onSubmitDefault()
        popupAddCard.close()
      })
  },
});
popupAddCard.setEventListeners();

// функционал смены аватарки
const popupAvatar = new PopupWithForm({
  popupSelector: '.popup_type_change-avatar',
  handleFormSubmit: (item) => {
    popupAvatar.onSubmitStart()
    api.setUserAvatar(item.avatar)
      .then((item) => {
        userInfo.setUserAvatar(item.avatar)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        popupAvatar.onSubmitDefault()
        popupAvatar.close()
      })
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
      () => { popupBigCard.open(item)},
      (...args) => { popupDeletePicture.open(...args) },
      item.likes,
      item._id,
      api,
      item.owner._id,
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

const popupDeletePicture = new PopupWithConfirmation({
  popupSelector: '.popup_type_delete-picture',
  handleFormSubmit: () => {
    api.deleteCard(popupDeletePicture.id())
      .then(() => {
        popupDeletePicture.close()
      })
      .catch(err => {
        console.log(err)
    })}
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
  .then(data => {
    userInfo.setUserInfo(data.name, data.about)
    userInfo.setUserAvatar(data.avatar)
  })
  .catch(err => {
    console.log(err)
})

  //  меняем информацию о пользователе
const userInfo = new UserInfo(profileName, profileDescription, userAvatar)
const popupEditUserInfo = new PopupWithForm({
  popupSelector:  '.popup_type_edit-profile',
  handleFormSubmit: (item) => {
    popupEditUserInfo.onSubmitStart()
    api.setUserInfo(item.username, item.description)
      .then((item) => {
        userInfo.setUserInfo(item.name, item.about)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        popupEditUserInfo.onSubmitDefault()
        popupEditUserInfo.close()
      })
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