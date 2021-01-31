const paintIcon = document.querySelector("#paint"),
  paintContainer = document.querySelector(".paint-container"),
  closePaintButton = paintContainer.querySelector(".js-close_paint");

const paintColors = document.querySelectorAll("#paint-colors");

console.log(paintIcon);
console.log(paintColors);

paintColors[0].innerHTML = `
  <span class="color" aria-label="black"></span>
  <span class="color" aria-label="dark grey"></span>
  <span class="color" aria-label="dark red"></span>
  <span class="color" aria-label="olive"></span>
  <span class="color" aria-label="green"></span>
  <span class="color" aria-label="green blue"></span>
  <span class="color" aria-label="navy"></span>
  <span class="color" aria-label="purple"></span>
`;

paintColors[1].innerHTML = `
  <span class="color" aria-label="white"></span>
  <span class="color" aria-label="light grey"></span>
  <span class="color" aria-label="red"></span>
  <span class="color" aria-label="yellow"></span>
  <span class="color" aria-label="light green"></span>
  <span class="color" aria-label="light blue"></span>
  <span class="color" aria-label="blue"></span>
  <span class="color" aria-label="pink"></span>
`;

const OPEN_PAINT = "open_paint";

/* running app */
const runningApp_paint = document.querySelector(".taskbar-running-app");

function addPaintApp() {
  const paintApp = document.createElement("button");
  paintApp.setAttribute("id", "run-app");
  paintApp.innerText = "🎨 Paint";
  runningApp_paint.appendChild(paintApp);
}

function deletePaintApp() {
  const paintApp_created = document.querySelector("#run-app");
  paintApp_created && runningApp_paint.removeChild(paintApp_created);
}

/* Open & Close paint window */
function openPaint() {
  paintIcon.addEventListener("click", () => {
    paintContainer.classList.add(OPEN_PAINT);
    addPaintApp();
  });
}

function closePaint() {
  closePaintButton.addEventListener("click", () => {
    paintContainer.classList.remove(OPEN_PAINT);
    deletePaintApp();
  });
}

function closePaintBlur() {
  window.addEventListener("click", (e) => {
    if (e.target === paintContainer) {
      paintContainer.classList.remove(OPEN_PAINT);
      deletePaintApp();
    }
  });
}

function init() {
  openPaint();
  closePaint();
  closePaintBlur();
}

init();
