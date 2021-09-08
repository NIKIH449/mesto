import Card from './classes/Card.js';
import FormValidator from './FormValidator.js';
import { initialCards } from './initialCards.js';
import {
  popupEditProfile,
  popupAddPicture,
  popups,
  placeInput,
  pictureInput,
  nameInput,
  jobInput,
  editButton,
  plusButton,
  profileName,
  profileDescription,
  object,
} from './constants.js';

//  создаем экземпляры класса валидации
const formValidatorEditProfile = new FormValidator(object, popupEditProfile);
formValidatorEditProfile.enableValidation();
const formValidatorAddPicture = new FormValidator(object, popupAddPicture);
formValidatorAddPicture.enableValidation();

//  функция добавления карточки через попап
function renderCard(e) {
  e.preventDefault();
  createCard(placeInput.value, pictureInput.value, '.element__template');
  closePopup(popupAddPicture);
};

//  создание карточек
function createCard(name, link, templateSelector) {
  const card = new Card(name, link, templateSelector);
  const cardElement = card.generateCard();
  document.querySelector('.elements__list').prepend(cardElement);
};

//  добавление карточек при загрузке
initialCards.forEach((item) => {
  createCard(item.name, item.link, '.element__template');
});

//  функция открытия попапов
export default function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', keyHandler); //  добавляем слушатель для закрытия кнопкой
};

//  функции закрытия попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keyHandler); //  удаляем слущатель для закрытия кнопкой
};

//  функция закрытия попапов эскейпом
function keyHandler(e) {
  if (e.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
};

//  функция смены имени пользователя
function changeProfileName(e) {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupEditProfile);
};

//  обработчики событий
//  кнопка редактирования профиля
editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  formValidatorEditProfile.resetPopupForm();
  openPopup(popupEditProfile);
});

//  кнопка добавить картинку
plusButton.addEventListener('click', () => {
  popupAddPicture.querySelector('.popup__form').reset(); //  сбрасываем инпуты
  formValidatorAddPicture.resetPopupForm();
  openPopup(popupAddPicture);
});

//  создание карточки
popupAddPicture.addEventListener('submit', renderCard);

// сохраняем смену имени пользователя
popupEditProfile.addEventListener('submit', changeProfileName);

//  закрытие попапа по клику на оверлей
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('popup_opened') || e.target.classList.contains('popup__button-close')) {
      closePopup(popup);
    }
  });
});