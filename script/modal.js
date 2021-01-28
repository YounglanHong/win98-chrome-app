const icons = document.querySelectorAll(".icon:not(.todo, .editor)");
const modal = document.querySelector(".modal-container");
const closeButton = document.querySelector(".js-close");

const CLICKED_CLASS = "clicked";

function showModal() {
  icons.forEach((icon) => {
    icon.addEventListener("click", () => {
      modal.classList.add(CLICKED_CLASS);
    });
  });
}

function closeModal() {
  closeButton.addEventListener("click", () => {
    modal.classList.remove(CLICKED_CLASS);
  });
}

function hideModal() {
  window.addEventListener("click", (e) => {
    e.target === modal && modal.classList.remove(CLICKED_CLASS);
  });
}

function init() {
  showModal();
  closeModal();
  hideModal();
}
init();
