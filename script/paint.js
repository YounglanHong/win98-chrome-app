const paintIcon = document.querySelector("#paint"),
  paintContainer = document.querySelector(".paint-container"),
  closePaintButton = paintContainer.querySelector(".js-close_paint");

const paintColors = document.querySelectorAll("#paint-colors"),
  paintTools = document.querySelector("#paint-tools");

const paintCanvas = document.querySelector("#paint-canvas"),
  ctx = paintCanvas.getContext("2d"); // Context variable

/* Painting canvas style(default) */
paintCanvas.width = 350;
paintCanvas.height = 350;

ctx.strokeStyle = "#000000";
ctx.lineWidth = 1.5;

/* Add color & tools */
function addPaintColors() {
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
}

function addPaintTools() {
  paintTools.innerHTML = `
  <button aria-label="save"><i class="fas fa-save"></i></i></button>
  <button aria-label="open"><i class="fas fa-folder-open"></i></button>
  <button aria-label="share"><i class="fas fa-share-square"></i></button>
  <button aria-label="brush"><i class="fas fa-paint-brush"></i></button>
  <button aria-label="line"><i class="fas fa-signature"></i></button>
  <button aria-label="rectangle"><i class="far fa-square"></i></i></button>
  <button aria-label="circle"><i class="far fa-circle"></i></button>
`;
}

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

/* Painting canvas events */
let isPainting = false;

function startPainting() {
  isPainting = true;
}

function stopPainting() {
  isPainting = false;
}

function onMouseMove(e) {
  const x = e.offsetX;
  const y = e.offsetY;
  if (!isPainting) {
    console.log("path", x, y);
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    console.log("line", x, y);
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function onMouseDown(e) {
  isPainting = true;
}

function onMouseUp(e) {
  painting = false;
}

if (paintCanvas) {
  paintCanvas.addEventListener("mousemove", onMouseMove);
  paintCanvas.addEventListener("mousedown", startPainting);
  paintCanvas.addEventListener("mouseup", stopPainting);
  paintCanvas.addEventListener("mouseleave", stopPainting);
}

function init() {
  openPaint();
  closePaint();
  closePaintBlur();
  addPaintColors();
  addPaintTools();
}

init();
