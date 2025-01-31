import "../pages/index.css";
import initialCards from "./cards";
import { createCard, deleteCard, likeCard } from "../components/card.js";
import { handleOpenPopup, closePopup } from "../components/modal.js";
import {
  enableValidation,
  clearValidation,
} from "../components/form-validation.js";
import {
  getInitialCards,
  getUserInfo,
  patchUserInfo,
  postCard,
  patchAvatar,
} from "../components/api.js";

//DOM узлы
const cardContainer = document.querySelector(".places__list");
const addMestoPopup = document.querySelector(".popup_type_new-card");
const editProfilePopup = document.querySelector(".popup_type_edit");
const addMestoButton = document.querySelector(".profile__add-button");
const editProfileButton = document.querySelector(".profile__edit-button");
const popupImage = document.querySelector(".popup_type_image");
const popupImageLink = popupImage.querySelector(".popup__image");
const popupCaption = popupImage.querySelector(".popup__caption");
const editAvatarPopup = document.querySelector(".popup_type_avatar");
const editAvatarButton = document.querySelector(".profile__overlay-button");
const profileImage = document.querySelector(".profile__image");

// Находим форму в DOM
const editFormElement = document.forms["edit-profile"];
const newCardFormElement = document.forms["new-place"];
const editAvatarFormElement = document.forms["edit-avatar"];
// Находим поля формы в DOM
const nameInput = editFormElement.name;
const jobInput = editFormElement.description;
const mestoInput = addMestoPopup.querySelector("#place-name");
const mestoLink = addMestoPopup.querySelector("#link");
const cardNameInput = newCardFormElement["place-name"];
const cardLinkInput = newCardFormElement.link;
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const avatarInput = editAvatarFormElement.avatar;

//конфиг валидации форм
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button-inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error-visible",
};

//Открытие Попапов
function openEditPopup() {
  clearValidation(editFormElement, validationConfig);
  const name = profileName.textContent;
  const job = profileJob.textContent;
  nameInput.value = name;
  jobInput.value = job;
  handleOpenPopup(editProfilePopup);
}

function openAddMestoPopup() {
  clearValidation(newCardFormElement, validationConfig);
  newCardFormElement.reset();
  handleOpenPopup(addMestoPopup);
}

function openImagePopup(evt) {
  popupImageLink.src = evt.target.src;
  popupCaption.textContent = evt.target.alt;
  popupImageLink.alt = evt.target.alt;
  handleOpenPopup(popupImage);
}

function openAvatarPopup() {
  handleOpenPopup(editAvatarPopup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const button = editFormElement.querySelector(".button");
  const buttonText = button.textContent;
  button.textContent = "Сохранение...";

  patchUserInfo(nameInput.value, jobInput.value)
    .then((userData) => {
      profileName.textContent = userData.name;
      profileJob.textContent = userData.about;
      closePopup(editProfilePopup);
    })
    .catch((err) => {
      console.log(err);
      closePopup(editProfilePopup);
    })
    .finally(() => {
      button.textContent = buttonText;
    });
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const button = newCardFormElement.querySelector(".button");
  const buttonText = button.textContent;
  button.textContent = "Сохранение...";
  postCard(cardNameInput.value, cardLinkInput.value)
    .then((cardData) => {
      console.log(cardData);
      cardContainer.prepend(
        createCard(cardData, {
          deleteFunc: deleteCard,
          likeFunc: likeCard,
          openPopupFunc: openImagePopup,
          ownerID: cardData.owner._id,
        })
      );
      closePopup(addMestoPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      button.textContent = buttonText;
    });
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const button = editAvatarFormElement.querySelector(".button");
  let buttonText = button.textContent;
  button.textContent = "Сохранение...";
  patchAvatar(avatarInput.value)
    .then((res) => {
      profileImage.style.backgroundImage = `url(${res.avatar})`;
      avatarInput.value = "";
      closePopup(editAvatarPopup);
    })
    .catch((err) => {
      console.log(err);
      closePopup(editAvatarPopup);
    })
    .finally(() => {
      button.textContent = buttonText;
    });
}

editFormElement.addEventListener("submit", handleProfileFormSubmit);
newCardFormElement.addEventListener("submit", handleCardFormSubmit);
editAvatarFormElement.addEventListener("submit", handleAvatarFormSubmit);

editProfileButton.addEventListener("click", openEditPopup);
addMestoButton.addEventListener("click", openAddMestoPopup);
editAvatarButton.addEventListener("click", openAvatarPopup);

enableValidation(validationConfig);

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userInfo, cards]) => {
    console.log(cards);
    //Обновление имени/статуса пользователя
    profileName.textContent = userInfo.name;
    profileJob.textContent = userInfo.about;
    profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
    //Отрисовка полученных карточек
    cards.forEach((item) => {
      cardContainer.append(
        createCard(item, {
          deleteFunc: deleteCard,
          likeFunc: likeCard,
          openPopupFunc: openImagePopup,
          ownerID: userInfo._id,
        })
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
