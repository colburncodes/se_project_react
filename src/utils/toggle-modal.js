export default function ToggleModal(modal, isOpen) {
  modal.style.display = isOpen ? "block" : "none";
}

const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".modal__close");

function handleToggleModal() {
  ToggleModal(modal, true);
}

function handleCloseModal() {
  ToggleModal(modal, false);
}

modal.addEventListener("click", handleToggleModal);
closeBtn.addEventListener("click", handleCloseModal);
