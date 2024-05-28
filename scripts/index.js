// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardContainer = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(cardImage, cardTitle, deleteFunc) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardElement.querySelector('.card__image').src = cardImage;
    cardElement.querySelector('.card__title').textContent = cardTitle;

    deleteButton.addEventListener('click', () => {
        deleteFunc(cardElement);
    })

    cardContainer.append(cardElement);
}

// @todo: Функция удаления карточки
function deleteCard(card) {
    card.closest('.card').remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((item, i) => {
    createCard(item.link, item.name, deleteCard);
})