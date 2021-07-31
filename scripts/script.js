//  объявляю переменные
const page = document.querySelector('.page');
const formElementEditProfile = page.querySelector('.popup_type_edit-profile');
const formElementAddPicture = page.querySelector('.popup_type_add-picture');
const formElementBigPicture = page.querySelector('.popup_type_picture');
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

//  массив карточек, которые добавляются при загрузке страницы
const initialCards  = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    alt: 'Архыз'
  },
  {
    name: 'Гора Эльбрус',
    link: 'https://images.unsplash.com/photo-1626518139514-65676cf25bac?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    alt: 'Гора Эльбрус'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    alt: 'Иваново'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    alt: 'Камчатка'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    alt: 'Холмогорский район'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    alt: 'Байкал'
  }
];

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

//  функция создания карточки
function createCard(name, link) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__place-name').textContent =  name;
  cardElement.querySelector('.element__picture').src =  link;
  cardElement.querySelector('.element__picture').alt = name;
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
  cardList.prepend(cardElement);  // добавляем карточки в начало
  formElementAddPicture.querySelector('.popup__form').reset();  // сбрасываем инпуты
  savePopup(e);  // сохраняем
};

//  открытие, редактирование, сохранине, закрытие
//  функция открытия попапов
function openPopup(popup) {
  if (popup.classList.contains('popup_opened') === false);
    popup.classList.add('popup_opened');
};

//  функция редактирования и сохранения имени пользователя и описания профиля
function formSubmitHandler (e) {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  savePopup(e);  // сохраняем
};

//  функция сохранения попапов
function savePopup (e) {
  e.target.closest('.popup').classList.remove('popup_opened');
};

//  функции закрытия попапов
function closePopup(popup) {
  popup.querySelector('.popup__button-close').addEventListener('click', (e) => {
    const closeButton = e.target.closest('.popup');
    closeButton.classList.remove('popup_opened');
  });
};

// функционал попапов
//  функционал попапа добавления карточки
function showPopupAddPicture () {
  openPopup(formElementAddPicture);
  closePopup(formElementAddPicture);
};

//  функционал попапа редактирования
function showPopupEditProfile () {
  openPopup(formElementEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  closePopup(formElementEditProfile);
};

//  функцонал попапа с картинкой
function openBigPicture (element) {
  element.querySelector('.element__picture').addEventListener('click', (e) => {
    openPopup(formElementBigPicture);
    bigPicture.src = e.target.getAttribute('src');
    bigPicture.alt = e.target.getAttribute('alt');
    pictureDescription.textContent = element.textContent; //  описание картинки
    formElementBigPicture.setAttribute('style', 'background-color: rgb(0, 0, 0, .9)'); // затемняем фон
    closePopup(formElementBigPicture);
  });
};

//  обработчики событий
formElementEditProfile.addEventListener('submit', formSubmitHandler);
formElementAddPicture.addEventListener('submit', renderCard);
editButton.addEventListener('click', showPopupEditProfile);
plusButton.addEventListener('click', showPopupAddPicture);