import './index.css';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { initialCards } from '../utils/initialCards.js';
import {
  popupEditProfile,
  popupAddPicture,
  popupBigPicture,
  nameInput,
  jobInput,
  editButton,
  plusButton,
  profileName,
  profileDescription,
  object,
} from '../utils/constants.js';
//  создаем экземпляры класса валидации
const formValidatorEditProfile = new FormValidator(object, popupEditProfile);
formValidatorEditProfile.enableValidation();
const formValidatorAddPicture = new FormValidator(object, popupAddPicture);
formValidatorAddPicture.enableValidation();

//  добавление карточки через попап
const popupAddCard = new PopupWithForm({
  popupSelector: popupAddPicture,
  handleFormSubmit: (item) => {
    createCard(item.name, item.link, '.element__template', () => {
      popupBigCard.open(item);
    });
  },
});
popupAddCard.setEventListeners();

//  создание дефолтных шести карточек
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    createCard(item.name, item.link, '.element__template', () => {
      popupBigCard.open(item)});
  }
}, '.elements__list');
cardList.renderItems();

//  создание карточек
function createCard(name, link, templateSelector, handleCardClick) {
  const card = new Card(name, link, templateSelector, handleCardClick);
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
};

//  меняем информацию о пользователе
const userInfo = new UserInfo(profileName, profileDescription)
const popupEditUserInfo = new PopupWithForm({
  popupSelector:  popupEditProfile,
  handleFormSubmit: (item) => {
    userInfo.setUserInfo(item.username, item.description);
  }
});
popupEditUserInfo.setEventListeners();

//  создаем класс каждому попапу
const popupBigCard = new PopupWithImage(popupBigPicture);
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