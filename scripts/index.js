import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards } from './initialCards.js';

//  объявляю переменные
const page = document.querySelector('.page');
const formElementEditProfile = page.querySelector('.popup_type_edit-profile');
const formElementAddPicture = page.querySelector('.popup_type_add-picture');
const formElementBigPicture = page.querySelector('.popup_type_picture');
const closeButtonEditProfile = page.querySelector('.popup__button-close_type_edit-profile');
const closeButtonAddPicture = page.querySelector('.popup__button-close_type_add-picture');
const closeButtonBigPicture = page.querySelector('.popup__button-close_type_picture');
const buttonSaveEditProfile = formElementEditProfile.querySelector('.popup__button-save_type_edit-profile');
const buttonSaveAddPicture = formElementAddPicture.querySelector('.popup__button-save_type_add-picture');
const placeInput = formElementAddPicture.querySelector('.popup__input_type_place');
const pictureInput = formElementAddPicture.querySelector('.popup__input_type_picture');
const nameInput = formElementEditProfile.querySelector('.popup__input_type_name');
const jobInput = formElementEditProfile.querySelector('.popup__input_type_desription');
const editButton = page.querySelector('.profile__button_type_edit');
const plusButton = page.querySelector('.profile__button_type_plus');
const profileName = page.querySelector('.profile__name');
const profileDescription = page.querySelector('.profile__description');
  //  объект со всеми селекторами и классами, что используются при валидации
const object = ({
  formSelector: '.popup__form',  //  формы
  inputSelector: '.popup__input',  //  инпуты
  submitButtonSelector: '.popup__button-save',  //  кнопка
  submitButtonSelectorDisabled: 'popup__button-save_disabled',  //  кнопка отключенная
  inputErrorClass: 'popup__input_type_error',  //  инпут с ошибкой
  spanErrorClassActive: 'popup__input-error_active',  //  спан с ошибкой
});

//  функция добавления карточки через попап
function renderCard(e) {
  e.preventDefault();
  const card = new Card(placeInput.value, pictureInput.value, '.element__template');
  const cardElement = card.generateCard();
  document.querySelector('.elements__list').prepend(cardElement);
  closePopup(formElementAddPicture);
  buttonSaveAddPicture.setAttribute('disabled', true); //  делаем кнопку неактивной
};

//добавление при загрузке
initialCards.forEach((item) => {
  const card = new Card(item.name, item.link, '.element__template');
  const cardElement = card.generateCard();
  document.querySelector('.elements__list').append(cardElement);
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
    closePopup(openedPopup)
  };
};

// функция закрытия попапа кликом по оверлею
function closeOverlay(e) {
  if (e.target.classList.contains('popup')) {
    closePopup(e.target);
  };
};

//  функцияя сброса значений у инпутов и спанов, срабатывает при открытии попапа
function resetInputError (form) {
  const inputErrorList = Array.from(form.querySelectorAll('.popup__input-error')); //  для каждой формы получаем массив спанов
  inputErrorList.forEach((errorElement) => {
    errorElement.textContent= ' '; //  очищаем каждый спан
  });
  const inputList = Array.from(form.querySelectorAll('.popup__input')); //  получаем массив инпутов
  inputList.forEach((inputSelector) => {
    inputSelector.classList.remove('popup__input_type_error');  // у каждого инпута удаляем класс с ошибкой
  });
};

//  функция отключения кнопки при открытии попапа
function disableSubmitButton (button) {
  button.setAttribute('disabled', true);
};

//  обработчики событий
//  кнопка редактирования профиля
editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  resetInputError(formElementEditProfile);  //  сбрасываем значения спанов
  openPopup(formElementEditProfile);
  disableSubmitButton(buttonSaveEditProfile);
});

//  кнопка закрытия попапа редактирования профиля
closeButtonEditProfile.addEventListener('click', () => {
  closePopup(formElementEditProfile);
});

//  кнопка сохранить попапа редактирования профиля
buttonSaveEditProfile.addEventListener('click', (e) => {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(formElementEditProfile);
});

//  кнопка добавить картинку
plusButton.addEventListener('click', () => {
  formElementAddPicture.querySelector('.popup__form').reset();  //  сбрасываем инпуты
  resetInputError(formElementAddPicture);  //  сбрасываем значения спанов
  openPopup(formElementAddPicture);
  disableSubmitButton(buttonSaveAddPicture);
});

//  кнопка закрытия попапа добавления картинки
closeButtonAddPicture.addEventListener('click', () => {
  closePopup(formElementAddPicture);
});

//  кнопка закрытия попапа большой картинки
closeButtonBigPicture.addEventListener('click', () => {
  closePopup(formElementBigPicture);
});

//  создание карточки
formElementAddPicture.addEventListener('submit', renderCard);

//  закрытие попапа по клику на оверлей
document.addEventListener('mousedown', closeOverlay);

//  создаем экземпляры класса валидации
const formValidatorEditProfile = new FormValidator(object, formElementEditProfile);
formValidatorEditProfile.enableValidation();
const formValidatorAddPicture = new FormValidator(object, formElementAddPicture);
formValidatorAddPicture.enableValidation();