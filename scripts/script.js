let main = document.querySelector('.main');
let openPopup = main.querySelector('.popup_opened');
let editButton = main.querySelector('.profile__button-edit');
let closeButton = main.querySelector('.popup__button-close');
let formElement = main.querySelector('.popup');
let profileName = main.querySelector('.profile__name');
let profiledescription = main.querySelector('.profile__description');
let nameInput = formElement.querySelector('.popup__name');
let jobInput = formElement.querySelector('.popup__desription');

formElement.querySelector('.popup__name').value = 'Жак-Ив Кусто';
formElement.querySelector('.popup__desription').value = 'Исследователь океана';

function showPopup () {

  openPopup.classList.remove('popup_opened');
}
editButton.addEventListener('click', showPopup);

function closePopup () {
  openPopup.classList.add('popup_opened');
}
closeButton.addEventListener('click', closePopup);

function formSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profiledescription.textContent = jobInput.value;

  closePopup ();
  }

formElement.addEventListener('submit', formSubmitHandler);

