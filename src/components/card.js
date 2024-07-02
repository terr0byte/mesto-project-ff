import { deleteCardFromServer, putLike, deleteLike } from "./api";

//Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

//Функция создания карточки
function createCard(item, { deleteFunc, likeFunc, openPopupFunc, ownerID }) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const likeCount = cardElement.querySelector(".card__like-count");

  cardImage.src = item.link;
  cardImage.alt = item.name;
  likeCount.textContent = item.likes.length;
  cardElement.querySelector(".card__title").textContent = item.name;

  const isOwned = ownerID === item.owner._id;

  item.likes.forEach((item) => {
    if (ownerID === item._id) {
      likeButton.classList.add("card__like-button_is-active");
    }
  })

  if (!isOwned) {
    deleteButton.classList.add("card__delete-button_hidden");
  } else {
    deleteButton.addEventListener("click", () => {
      deleteFunc(cardElement, item);
    });
  }

  likeButton.addEventListener("click", (evt) => {
    likeFunc(evt, item, likeCount);
  });
  cardImage.addEventListener("click", openPopupFunc);
  return cardElement;
}

//Функция удаления карточки
function deleteCard(card, cardData) {
  deleteCardFromServer(cardData._id)
    .then((res) => {
      card.closest(".card").remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

function likeCard(evt, card, likeElement) {
  const likeMethod = evt.target.classList.contains(
    "card__like-button_is-active"
  )
    ? deleteLike
    : putLike;
  likeMethod(card._id)
    .then((res) => {
      evt.target.classList.toggle("card__like-button_is-active");
      likeElement.textContent = res.likes.length;
    })
    .catch((err) => console.log(err));
}

export { createCard, deleteCard, likeCard };
