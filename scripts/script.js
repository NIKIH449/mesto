let page = document.querySelector('.page');
let editButton = page.querySelector('.profile__button-edit');
let closeButton = page.querySelector('.popup__button-close');
let formElement = page.querySelector('.popup');
let profileName = page.querySelector('.profile__name');
let profileDescription = page.querySelector('.profile__description');
let nameInput = formElement.querySelector('.popup__input_name');
let jobInput = formElement.querySelector('.popup__input_description');

function showPopup () {

  nameInput.value = profileName.textContent
  jobInput.value = profileDescription.textContent
  formElement.classList.add('popup_opened');
}

function closePopup () {
  formElement.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup ();
  }

editButton.addEventListener('click', showPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);

