const page = document.querySelector('.page');
const popupEditProfile = page.querySelector('.popup_type_edit-profile');
const popupAddPicture = page.querySelector('.popup_type_add-picture');
const popupDeleteCard = page.querySelector('.popup_type_delete-picture');
const popupChangeAvatar = page.querySelector('.popup_type_change-avatar');
const nameInput = popupEditProfile.querySelector('.popup__input_type_name');
const jobInput = popupEditProfile.querySelector('.popup__input_type_desription');
const editButton = page.querySelector('.profile__button_type_edit');
const plusButton = page.querySelector('.profile__button_type_plus');
const profileName = page.querySelector('.profile__name');
const profileDescription = page.querySelector('.profile__description');
const userAvatar = page.querySelector('.profile__avatar');
const avatarButton = page.querySelector('.profile__button_type_avatar');


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
  nameInput,
  jobInput,
  editButton,
  plusButton,
  profileName,
  profileDescription,
  popupDeleteCard,
  object,
  userAvatar,
  avatarButton,
  popupChangeAvatar,
};