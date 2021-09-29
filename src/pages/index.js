import './index.css';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js';
import Card from '../components/Card.js';
import Api from '../components/Api.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import FormValidator from '../components/FormValidator.js';
import { initialCards } from '../utils/initialCards.js';
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
//  создаем экземпляры класса валидации

const formValidatorEditProfile = new FormValidator(object, popupEditProfile);
formValidatorEditProfile.enableValidation();
const formValidatorAddPicture = new FormValidator(object, popupAddPicture);
formValidatorAddPicture.enableValidation();
const formValidatorChangeAvatar = new FormValidator(object, popupChangeAvatar);
formValidatorChangeAvatar.enableValidation();


const popupDeletePicture = new PopupWithConfirmation({
  popupSelector: '.popup_type_delete-picture'
})
popupDeletePicture.setEventListeners()
//  добавление карточки через попап
const popupAddCard = new PopupWithForm({
  popupSelector: '.popup_type_add-picture',
  handleFormSubmit: (item) => {
    const card = createCard(item.name, item.link, '.element__template',
    () => { popupBigCard.open(item) },
    () => { popupDeletePicture.open(item)
    });
    getCard(card);
  },
});
popupAddCard.setEventListeners();

  const popupAvatar = new PopupWithForm({
    popupSelector: '.popup_type_change-avatar',
    handleFormSubmit: (item) => {
      userInfo.setUserInfo(item.username, item.description);
      api.sendUserInfo(item.username, item.description)
    }
  })
  popupAvatar.setEventListeners()
//  создание дефолтных шести карточек
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item.name, item.link, '.element__template',
    () => { popupBigCard.open(item) },
    () => { popupDeletePicture.open(item)
    });
      getCard(card);
  }
}, '.elements__list');
cardList.renderItems();
//  создание карточек
function createCard(name, link, templateSelector, handleCardClick, handleCardDelete) {
  const card = new Card(name, link, templateSelector, handleCardClick, handleCardDelete).generateCard();
  return card
};

function getCard(card) {
  cardList.addItem(card);
}


//  получаем информацию о пользователе
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-28',
  headers: {
    authorization: '61ec0817-2cd1-4935-b48e-293d9bfb9a8c',
    'Content-Type': 'application/json'
  }
});
api.getUserInfo(profileName, profileDescription, userAvatar)
api.getCards()

//  меняем информацию о пользователе
const userInfo = new UserInfo(profileName, profileDescription, userAvatar)
const popupEditUserInfo = new PopupWithForm({
  popupSelector:  '.popup_type_edit-profile',
  handleFormSubmit: (item) => {
    userInfo.setUserInfo(item.username, item.description);
    api.sendUserInfo(item.username, item.description)
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

avatarButton.addEventListener('click', () => {
  popupAvatar.open()
  formValidatorChangeAvatar.resetPopupForm();
})

//deleteButton.addEventListener('click', () => {
// deleteButton.open()
//})



