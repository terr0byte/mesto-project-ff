//Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

//DOM узлы
const cardContainer = document.querySelector('.places__list');

//Функция создания карточки
function createCard(item, { deleteFunc }) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardImage = cardElement.querySelector('.card__image');

    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardElement.querySelector('.card__title').textContent = item.name;

    deleteButton.addEventListener('click', () => {
        deleteFunc(cardElement);
    })

    return cardElement;
    ;
}

//Функция удаления карточки
function deleteCard(card) {
    card.closest('.card').remove();
}

//Вывести карточки на страницу
initialCards.forEach((item) => {
    cardContainer.append(createCard(item, { deleteFunc: deleteCard }));
})