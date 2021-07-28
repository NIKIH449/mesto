// объявляю переменные
const page = document.querySelector('.page');

const closeButtonEditProfile = page.querySelector('.popup__button-close_type_edit-profile');
const closeButtonAddPicture = page.querySelector('.popup__button-close_type_add-picture');
const closeButtonPicture = page.querySelector('.popup__button-close_type_picture');
const formElementEditProfile = page.querySelector('.popup_type_edit-profile');
const formElementAddPicture = page.querySelector('.popup_type_add-picture');
const formElementBigPicture = page.querySelector('.popup_type_picture');

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
const removeButton = cardList.querySelector('.element__button-remove')
const bigPicture = document.querySelector('.popup__image');

//добавление карточек при загрузке страници
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

//функция загруки 6 карточек
initialCards.forEach(function (element) {
  const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.element__place-name').textContent = element.name;
    cardElement.querySelector('.element__picture').src = element.link;
    cardElement.querySelector('.element__picture').alt = element.alt;
    cardElement.querySelector('.element__button-like').addEventListener('click', function (evt) {  //возможность поставить карточкам лайк
      evt.target.classList.toggle('element__button-like_active') });
    cardElement.querySelector('.element__button-remove').addEventListener('click', function (evt) {  //удаление карточек
      const cardItem = evt.target.closest('.element');
      cardItem.remove();
    });
    cardElement.querySelector('.element__picture').addEventListener('click', function (evt) {  //открытие попапа с картинками карточек
      const popupPicture = page.querySelector('.popup_type_picture');
      popupPicture.classList.add('popup_opened');
      const sourcePiture = evt.target.getAttribute('src');
      bigPicture.src = sourcePiture;
    });
    cardList.append(cardElement);  //добавить карточки в конец массива
});

//функция добавления карточки
function cardSabmitHandler (evt) {
  evt.preventDefault();
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__place-name').textContent = placeInput.value;
  cardElement.querySelector('.element__picture').src = pictureInput.value;
  cardElement.querySelector('.element__picture').alt = placeInput.value;
  cardElement.querySelector('.element__button-like').addEventListener('click', function (evt) {  //возможность поставить новым карточкам лайк
    evt.target.classList.toggle('element__button-like_active') })
    cardElement.querySelector('.element__button-remove').addEventListener('click', function (evt) {  //удаление карточек
      const cardItem = evt.target.closest('.element');
      cardItem.remove();
    });
  cardElement.querySelector('.element__picture').addEventListener('click', function (evt) {  //открытие попапа с картинками у новых карточек
    const popupPicture = page.querySelector('.popup_type_picture');
    const sourcePiture = evt.target.getAttribute('src')
    bigPicture.src = sourcePiture;
    popupPicture.classList.add('popup_opened')
  });
  cardList.prepend(cardElement); //добавить карточки в начало массива
  placeInput.value = ''; //обмнулить значения инпутов
  pictureInput.value = '';
  closePopupAddPicture ();
};

function like (evt) {
  const removeButton = document.querySelector('.element__button-remove');
      const cardItem = removeButton.closest('.element')
      cardItem.remove();
}
// функция открытия попапа редактирования профиля и передачи значений имени пользователя с описанием профиля в попап
function showPopupEditProfile () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  formElementEditProfile.classList.add('popup_opened');
};

// функция закрытия попапа редактирования профиля
function closePopupEditProfile () {
  formElementEditProfile.classList.remove('popup_opened');
};

// функция редактирования и сохранения имени пользователя и описания профиля
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopupEditProfile ();
};

// функция отрытия попапа добавления карточек
function showPopupAddPicture () {
  formElementAddPicture.classList.add('popup_opened');
};

// функция закрытия попапа добавления карточек
function closePopupAddPicture () {
  formElementAddPicture.classList.remove('popup_opened');
};

//функция удаления карточки
page.querySelector('.element__button-remove').addEventListener('click', function (evt) {
  evt.target.remove('.element__button-remove');
});

// функция отрытия попапа c картинкой


// функция закрытия попапа c картинкой
function closePopipBigPicture() {
  formElementBigPicture.classList.remove('popup_opened');
};

// обработчики событий
editButton.addEventListener('click', showPopupEditProfile);
plusButton.addEventListener('click', showPopupAddPicture);
closeButtonEditProfile.addEventListener('click', closePopupEditProfile);
closeButtonAddPicture.addEventListener('click', closePopupAddPicture);
formElementEditProfile.addEventListener('submit', formSubmitHandler);
formElementAddPicture.addEventListener('submit', cardSabmitHandler);
formElementBigPicture.addEventListener('click', closePopipBigPicture);
