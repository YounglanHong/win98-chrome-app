const icons = document.querySelectorAll(".icon");
const modal = document.querySelector(".window");
const closeButton = document.querySelector(".js-close");
console.log(closeButton);

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

function init() {
  showModal();
  closeModal();
}
init();
