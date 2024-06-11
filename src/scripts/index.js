import "../pages/index.css";
import initialCards from "./cards";
import { createCard, deleteCard, likeCard } from "../components/card.js";
import { handleOpenPopup, closePopup } from "../components/modal.js";

//DOM узлы
const cardContainer = document.querySelector(".places__list");
const addMestoPopup = document.querySelector(".popup_type_new-card");
const editProfilePopup = document.querySelector(".popup_type_edit");
const addMestoButton = document.querySelector(".profile__add-button");
const editProfileButton = document.querySelector(".profile__edit-button");
const popupImage = document.querySelector(".popup_type_image");
const popupImageLink = popupImage.querySelector(".popup__image");
const popupCaption = popupImage.querySelector(".popup__caption");

// Находим форму в DOM
const editFormElement = document.forms["edit-profile"];
const newCardFormElement = document.forms["new-place"];
// Находим поля формы в DOM
const nameInput = editFormElement.name;
const jobInput = editFormElement.description;
const cardNameInput = newCardFormElement["place-name"];
const cardLinkInput = newCardFormElement.link;
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

//Открытие Попапов
function openEditPopup() {
  const name = profileName.textContent;
  const job = profileJob.textContent;
  nameInput.value = name;
  jobInput.value = job;
  handleOpenPopup(editProfilePopup);
}

function openAddMestoPopup() {
  handleOpenPopup(addMestoPopup);
}

function openImagePopup(evt) {
  popupImageLink.src = evt.target.src;
  popupCaption.textContent = evt.target.alt;
  popupImageLink.alt = evt.target.alt;
  handleOpenPopup(popupImage);
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;

  profileName.textContent = name;
  profileJob.textContent = job;
  closePopup(editProfilePopup);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const cardName = cardNameInput.value;
  const link = cardLinkInput.value;
  cardContainer.prepend(
    createCard(
      { name: cardName, link: link },
      {
        deleteFunc: deleteCard,
        likeFunc: likeCard,
        openPopupFunc: openImagePopup,
      }
    )
  );
  cardNameInput.value = "";
  cardLinkInput.value = "";
  closePopup(addMestoPopup);
}

editFormElement.addEventListener("submit", handleFormSubmit);
newCardFormElement.addEventListener("submit", handleCardFormSubmit);

editProfileButton.addEventListener("click", openEditPopup);
addMestoButton.addEventListener("click", openAddMestoPopup);

//Вывести карточки на страницу
initialCards.forEach((item) => {
  cardContainer.append(
    createCard(item, {
      deleteFunc: deleteCard,
      likeFunc: likeCard,
      openPopupFunc: openImagePopup,
    })
  );
});