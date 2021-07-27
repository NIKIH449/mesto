// объявляю переменные
const page = document.querySelector('.page');

const closeButtonEditProfile = page.querySelector('.popup__button-close_type_edit-profile');
const closeButtonAddPicture = page.querySelector('.popup__button-close_type_add-picture');
const formElementEditProfile = page.querySelector('.popup_type_edit-profile');
const formElementAddPicture = page.querySelector('.popup_type_add-picture');

const editButton = page.querySelector('.profile__button-edit');
const profileName = page.querySelector('.profile__name');
const profileDescription = page.querySelector('.profile__description');

const nameInput = formElementEditProfile.querySelector('.popup__input_type_name');
const jobInput = formElementEditProfile.querySelector('.popup__input_type_desription');
const placeInput = page.querySelector('.popup__input_type_place');
const pictureInput = page.querySelector('.popup__input_type_picture');

const plusButton = page.querySelector('.profile__button-plus');
const cardList = page.querySelector('.elements__list');
const cardTemplate = document.querySelector('.element__template').content;



//добавление карточек при загрузке страници
const initialCards  = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//функция загруки 6 карточек
initialCards.forEach(function (element) {
  const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.element__place-name').textContent = element.name;
    cardElement.querySelector('.element__picture').src = element.link;
    cardList.append(cardElement)
})

//функция добавления карточки
function cardSabmitHandler (evt) {
  evt.preventDefault();
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__place-name').textContent = placeInput.value;
  cardElement.querySelector('.element__picture').src = pictureInput.value;
  cardList.prepend(cardElement);
  placeInput.value = '';
  pictureInput.value = '';
  closePopupAddPicture ();
}

// функция открытия попапа редактирования профиля и передачи значений имени пользователя с описанием профиля в попап
function showPopupEditProfile () {
  nameInput.value = profileName.textContent
  jobInput.value = profileDescription.textContent
  formElementEditProfile.classList.add('popup_opened');
}

// функция закрытия попапа редактирования профиля
function closePopupEditProfile () {
  formElementEditProfile.classList.remove('popup_opened');
}

// функция редактирования и сохранения имени пользователя и описания профиля
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopupEditProfile ();
}

// функция отрытия попапа добавления карточек
function showPopupAddPicture () {
  formElementAddPicture.classList.add('popup_opened');
}

// функция закрытия попапа добавления карточек
function closePopupAddPicture () {
  formElementAddPicture.classList.remove('popup_opened');
}

// функция поставить и убрать лайк

// обработчики событий
editButton.addEventListener('click', showPopupEditProfile);
plusButton.addEventListener('click', showPopupAddPicture);
closeButtonEditProfile.addEventListener('click', closePopupEditProfile);
closeButtonAddPicture.addEventListener('click', closePopupAddPicture);
formElementEditProfile.addEventListener('submit', formSubmitHandler);
formElementAddPicture.addEventListener('submit', cardSabmitHandler);
