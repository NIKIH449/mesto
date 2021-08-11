//  объявляю переменные
const page = document.querySelector('.page');
const formElementEditProfile = page.querySelector('.popup_type_edit-profile');
const formElementAddPicture = page.querySelector('.popup_type_add-picture');
const formElementBigPicture = page.querySelector('.popup_type_picture');
const closeButtonEditProfile = page.querySelector('.popup__button-close_type_edit-profile');
const closeButtonAddPicture = page.querySelector('.popup__button-close_type_add-picture');
const closeButtonBigPicture = page.querySelector('.popup__button-close_type_picture');
const buttonSaveEditProfile = formElementEditProfile.querySelector('.popup__button-save_type_edit-profile');
const placeInput = formElementAddPicture.querySelector('.popup__input_type_place');
const pictureInput = formElementAddPicture.querySelector('.popup__input_type_picture');
const nameInput = formElementEditProfile.querySelector('.popup__input_type_name');
const jobInput = formElementEditProfile.querySelector('.popup__input_type_desription');
const bigPicture = formElementBigPicture.querySelector('.popup__image');
const pictureDescription = formElementBigPicture.querySelector('.popup__picture-description')
const editButton = page.querySelector('.profile__button_type_edit');
const plusButton = page.querySelector('.profile__button_type_plus');
const profileName = page.querySelector('.profile__name');
const profileDescription = page.querySelector('.profile__description');
const cardList = page.querySelector('.elements__list');
const cardTemplate = document.querySelector('#element__template').content;


//  возможности страницы
//  функция поставить и убрать карточкам лайк
function toggleLike (element) {
  element.querySelector('.element__button-like').addEventListener('click', (e) => {
    e.target.classList.toggle('element__button-like_active');
  });
};

//  функция удаления карточек
function removeCard (element) {
  const cardElement = document.querySelector('.element__button-remove');
  element.querySelector('.element__button-remove').addEventListener('click', (e) => {
    const cardItem = e.target.closest('.element');
    cardItem.remove(cardElement);
  });
};

//  функцонал попапа с картинкой
function openBigPicture (element) {
  element.querySelector('.element__picture').addEventListener('click', (e) => {
    openPopup(formElementBigPicture);
    bigPicture.src = e.target.getAttribute('src');
    bigPicture.alt = e.target.getAttribute('alt');
    pictureDescription.textContent = element.textContent; //  описание картинки
  });
};

//  функция создания карточки
function createCard(name, link) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardName = cardElement.querySelector('.element__place-name');
  const cardPicture = cardElement.querySelector('.element__picture');
  cardName.textContent =  name;
  cardPicture.src = link;
  cardPicture.alt = name;
  toggleLike(cardElement);       // лайки
  removeCard(cardElement);       //  удаление карточки
  openBigPicture(cardElement);   //  открытие картинки
  return cardElement;
};

//  загрузки карточек
//  функция загруки карточек из массива
initialCards.forEach(element => {
  const cardElement = createCard(element.name, element.link);
  cardList.append(cardElement);  //  добавить карточки в конец списка
});

//  функция добавления карточки через попап
function renderCard(e) {
  e.preventDefault();
  const cardElement = createCard(placeInput.value, pictureInput.value);
  cardList.prepend(cardElement);  //  добавляем карточки в начало
  closePopup(formElementAddPicture);
};

//  функция открытия попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
};

//  функции закрытия попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

//  обработчики событий
//  кнопка редактирования профиля
editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(formElementEditProfile);
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

function keyHandler(e) {
  if (e.key === "q") {
    console.log('q')
  }
  closePopup(formElementEditProfile);
  closePopup(formElementAddPicture);
  closePopup(formElementBigPicture);
}

function closeOverlay(e) {
  if (e.target.classList.contains('popup')) {
  }
  e.target.classList.remove('popup_opened')
}

//  кнопка добавить картинку
plusButton.addEventListener('click', () => {
  formElementAddPicture.querySelector('.popup__form').reset();  //  сбрасываем инпуты
  openPopup(formElementAddPicture);
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
document.addEventListener('click', closeOverlay);
document.addEventListener('keydown', keyHandler);
