import { deleteCardFromServer, putLike, deleteLike } from "./api";

//Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

//Функция создания карточки
function createCard(item, { deleteFunc, likeFunc, openPopupFunc, isOwned }) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const likeCount = cardElement.querySelector(".card__like-count");

  cardImage.src = item.link;
  cardImage.alt = item.name;
  likeCount.textContent = item.likes.length;
  cardElement.querySelector(".card__title").textContent = item.name;

  if (!isOwned) {
    deleteButton.classList.add("card__delete-button_hidden");
  }

  deleteButton.addEventListener("click", () => {
    deleteFunc(cardElement, item);
  });

  likeButton.addEventListener("click", (evt) => {
    likeFunc(evt, item, likeCount);
  });
  cardImage.addEventListener("click", openPopupFunc);
  return cardElement;
}

//Функция удаления карточки
function deleteCard(card, cardData) {
  deleteCardFromServer(cardData)
    .then((res) => {
      card.closest(".card").remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

function likeCard(evt, card, likeElement) {
  if (evt.target.classList.contains("card__like-button_is-active")) {
    deleteLike(card)
      .then((res) => {
        evt.target.classList.toggle("card__like-button_is-active");
        likeElement.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    putLike(card)
      .then((res) => {
        evt.target.classList.toggle("card__like-button_is-active");
        likeElement.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export { createCard, deleteCard, likeCard };
