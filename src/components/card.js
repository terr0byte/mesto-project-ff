//Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

//Функция создания карточки
function createCard(item, { deleteFunc, likeFunc, openPopupFunc }) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardElement.querySelector(".card__title").textContent = item.name;

  deleteButton.addEventListener("click", () => {
    deleteFunc(cardElement);
  });

  likeButton.addEventListener("click", likeFunc);
  cardImage.addEventListener("click", openPopupFunc);
  return cardElement;
}

//Функция удаления карточки
function deleteCard(card) {
  card.closest(".card").remove();
}

function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

export { createCard, deleteCard, likeCard };
