import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards } from './initialCards.js';

//  объявляю переменные
const page = document.querySelector('.page');
const popupEditProfile = page.querySelector('.popup_type_edit-profile');
const popupAddPicture = page.querySelector('.popup_type_add-picture');
const popups = page.querySelectorAll('.popup');
const placeInput = popupAddPicture.querySelector('.popup__input_type_place');
const pictureInput = popupAddPicture.querySelector('.popup__input_type_picture');
const nameInput = popupEditProfile.querySelector('.popup__input_type_name');
const jobInput = popupEditProfile.querySelector('.popup__input_type_desription');
const editButton = page.querySelector('.profile__button_type_edit');
const plusButton = page.querySelector('.profile__button_type_plus');
const profileName = page.querySelector('.profile__name');
const profileDescription = page.querySelector('.profile__description');
//  объект со всеми селекторами и классами, что используются при валидации
const object = ({
  inputSelector: '.popup__input',  //  инпуты
  submitButtonSelector: '.popup__button-save',  //  кнопка
  submitButtonClassDisabled: 'popup__button-save_disabled',  //  кнопка отключенная
  inputErrorClass: 'popup__input_type_error',  //  инпут с ошибкой
  spanErrorClassActive: 'popup__input-error_active',  //  спан с ошибкой
  spanErrorClass: '.popup__input-error',
});
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
  createCard(item.name, item.link, '.element__template')
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
  if (e.key === "Escape") {
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
  popupAddPicture.querySelector('.popup__form').reset();  //  сбрасываем инпуты
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
    };
  });
});