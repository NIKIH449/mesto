let main = document.querySelector('.main');
let openPopup = main.querySelector('.popup_opened');
let editButton = main.querySelector('.profile__button-edit');
let formPopup = main.querySelector('.popup_opened');
let closeButton = main.querySelector('.popup__button-close');

function showPopup () {
  formPopup.classList.remove('popup_opened');
}
editButton.addEventListener('click', showPopup);

function closePopup () {
  formPopup.classList.add('popup_opened');
}
closeButton.addEventListener('click', closePopup);
