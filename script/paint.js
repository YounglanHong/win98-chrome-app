const paintIcon = document.querySelector("#paint"),
  paintContainer = document.querySelector(".paint-container"),
  closePaintButton = paintContainer.querySelector(".js-close_paint");

const paintColor = Array.from(document.getElementsByClassName("color"));

const paintCanvas = document.querySelector("#paint-canvas"),
  ctx = paintCanvas.getContext("2d"); // Context variable

/* Painting canvas style(default) */
paintCanvas.width = 350;
paintCanvas.height = 350;

ctx.strokeStyle = "#000000";
ctx.lineWidth = 1.5;

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
    // console.log("path", x, y);
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    // console.log("line", x, y);
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorChange(color) {
  // console.log(e.target.style)  // CSSStyleDeclaration
  // console.log(e.target.style.backgrounColor)
  // console.log(this.getAttribute("aria-label"));
  ctx.strokeStyle = color;
}

if (paintCanvas) {
  paintCanvas.addEventListener("mousemove", onMouseMove);
  paintCanvas.addEventListener("mousedown", startPainting);
  paintCanvas.addEventListener("mouseup", stopPainting);
  paintCanvas.addEventListener("mouseleave", stopPainting);
}

/* Change Color */
paintColor.forEach((color) => {
  let targetColor = window
    .getComputedStyle(color)
    .getPropertyValue("background-color");
  color.addEventListener("click", () => handleColorChange(targetColor));
});

function init() {
  openPaint();
  closePaint();
  closePaintBlur();
}

init();
