// объявляю переменные
let page = document.querySelector('.page');
let editButton = page.querySelector('.profile__button-edit');
let closeButtonEditProfile = page.querySelector('.popup__button-close_type_edit-profile');
let closeButtonAddPicture = page.querySelector('.popup__button-close_type_add-picture');
let formElementEditProfile = page.querySelector('.popup_type_edit-profile');
let formElementAddPicture = page.querySelector('.popup_type_add-picture');
let profileName = page.querySelector('.profile__name');
let profileDescription = page.querySelector('.profile__description');
let nameInput = formElementEditProfile.querySelector('.popup__input_type_name');
let jobInput = formElementEditProfile.querySelector('.popup__input_type_desription');
let plusButton = page.querySelector('.profile__button-plus');

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

// функция отрытия попапа добавления карточек
function showPopupAddPicture () {
  formElementAddPicture.classList.add('popup_opened');
}

// функция закрытия попапа добавления карточек
function closePopupAddPicture () {
  formElementAddPicture.classList.remove('popup_opened');
}

// функция редактирования и сохранения имени пользователя и описания профиля
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopupEditProfile ();
}
// функция поставить и убрать лайк

// обработчики событий
editButton.addEventListener('click', showPopupEditProfile);
plusButton.addEventListener('click', showPopupAddPicture);
closeButtonEditProfile.addEventListener('click', closePopupEditProfile);
closeButtonAddPicture.addEventListener('click', closePopupAddPicture);
formElementEditProfile.addEventListener('submit', formSubmitHandler);
