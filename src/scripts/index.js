import "../pages/index.css";
import initialCards from "./cards";
import { createCard, deleteCard, likeCard } from "../components/card.js";
import {
  handleOpenPopup,
  closePopup,
} from "../components/modal.js";

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
function openEditPopup(evt) {
  if (evt.target === editProfileButton) {
    const name = profileName.textContent;
    const job = profileJob.textContent;
    nameInput.value = name;
    jobInput.value = job;
    handleOpenPopup(editProfilePopup);
  }
  if (evt.target === addMestoButton) {
    handleOpenPopup(addMestoPopup);
  }
}

function openImagePopup(evt) {
  popupImageLink.src = evt.target.src;
  popupCaption.textContent = evt.target.alt;
  handleOpenPopup(popupImage);
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value
  if (evt.target === editFormElement) {
    const openedPopup = document.querySelector(".popup_is-opened");
    const name = nameInput.value;
    const job = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    profileName.textContent = name;
    profileJob.textContent = job;
    closePopup(openedPopup);
    // Вставьте новые значения с помощью textContent
  } else if (evt.target === newCardFormElement) {
    const openedPopup = document.querySelector(".popup_is-opened");
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
    closePopup(openedPopup);
  }
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
editFormElement.addEventListener("submit", handleFormSubmit);
newCardFormElement.addEventListener("submit", handleFormSubmit);

document.addEventListener("click", openEditPopup);

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
