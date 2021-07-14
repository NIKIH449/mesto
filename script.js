let main = document.querySelector('.main');
let openPopup = main.querySelector('.popup_opened');
let editButton = main.querySelector('.profile__button-edit');
let closeButton = main.querySelector('.popup__button-close');
let saveButton = main.querySelector('.popup__button-save');


function showPopup () {

  openPopup.classList.remove('popup_opened');
}
editButton.addEventListener('click', showPopup);

function closePopup () {
  openPopup.classList.add('popup_opened');
}
closeButton.addEventListener('click', closePopup);




function formSubmitHandler (evt) {

  let formElement = main.querySelector('.popup__container');
  let nameInput = formElement.querySelector('.popup__name');
  let jobInput = formElement.querySelector('.popup__desription');
  let profileName = main.querySelector('.profile__name');
  let profileDiscription = main.querySelector('.profile__discription');

  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDiscription.textContent = jobInput.value;

  nameInput.textContent = profileName;
  jobInput.textContent = profileDiscription;

  closePopup()
  }

saveButton.addEventListener('click', formSubmitHandler);