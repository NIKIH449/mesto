const page = document.querySelector('.page');
const popupEditProfile = page.querySelector('.popup_type_edit-profile');
const popupAddPicture = page.querySelector('.popup_type_add-picture');
const popupBigPicture = document.querySelector('.popup_type_picture');
const nameInput = popupEditProfile.querySelector('.popup__input_type_name');
const jobInput = popupEditProfile.querySelector('.popup__input_type_desription');
const editButton = page.querySelector('.profile__button_type_edit');
const plusButton = page.querySelector('.profile__button_type_plus');
const profileName = page.querySelector('.profile__name');
const profileDescription = page.querySelector('.profile__description');

//  объект со всеми селекторами и классами, что используются при валидации
const object = {
  inputSelector: '.popup__input', //  инпуты
  submitButtonSelector: '.popup__button-save', //  кнопка
  submitButtonClassDisabled: 'popup__button-save_disabled', //  кнопка отключенная
  inputErrorClass: 'popup__input_type_error', //  инпут с ошибкой
  spanErrorClassActive: 'popup__input-error_active', //  спан с ошибкой
};

export {
  page,
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
};
