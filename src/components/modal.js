function handleClosePopup(evt) {
  const openedPopup = document.querySelector(".popup_is-opened");
  if (openedPopup) {
    const closeButton = openedPopup.querySelector(".popup__close");

    if (
      evt.target === closeButton ||
      evt.target === openedPopup ||
      evt.key === "Escape"
    ) {
      closePopup(openedPopup);
    }
  }
}

function handleOpenPopup(popup) {
  document.addEventListener("click", handleClosePopup);
  document.addEventListener("keydown", handleClosePopup);
  popup.classList.add("popup_is-opened");
}

function closePopup(popup) {
  document.removeEventListener("click", handleClosePopup);
  document.removeEventListener("keydown", handleClosePopup);
  popup.classList.remove("popup_is-opened");
}

export { handleClosePopup, handleOpenPopup, closePopup };
