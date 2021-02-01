const paintIcon = document.querySelector("#paint"),
  paintContainer = document.querySelector(".paint-container"),
  closePaintButton = paintContainer.querySelector(".js-close_paint");

const paintColor = Array.from(document.getElementsByClassName("color")),
  paintEraser = document.querySelector(".paint-eraser"),
  paintEraseAll = document.querySelector(".paint-eraseAll");

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
    paintIcon.classList.add(ICON_CLICKED);
    paintContainer.classList.add(OPEN_PAINT);
    addPaintApp();
  });
  paintIcon.addEventListener("keypress", (e) => {
    if (e.code === "Enter") {
      paintContainer.classList.add(OPEN_PAINT);
      addPaintApp();
    }
  });
}

function closePaint() {
  closePaintButton.addEventListener("click", () => {
    paintIcon.classList.remove(ICON_CLICKED);
    paintContainer.classList.remove(OPEN_PAINT);
    deletePaintApp();
  });
}

function closePaintBlur() {
  window.addEventListener("click", (e) => {
    if (e.target === paintContainer) {
      paintIcon.classList.remove(ICON_CLICKED);
      paintContainer.classList.remove(OPEN_PAINT);
      deletePaintApp();
    }
  });
}

/* Painting canvas events */
let isPainting = false;
let isErasing = false;

function startErasing() {
  isErasing = true;
}

function stopErasing() {
  isErasing = false;
}

function startPainting(e) {
  isPainting = true;
  isErasing = false;
}

function stopPainting() {
  if (isErasing) {
    stopErasing();
  }
  isPainting = false;
}

function onMouseMove(e) {
  const x = e.offsetX;
  const y = e.offsetY;
  if (isErasing) {
    erasePainting(x, y);
  } else {
    if (!isPainting) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  }
}

if (paintCanvas) {
  paintCanvas.addEventListener("mousemove", onMouseMove);
  paintCanvas.addEventListener("mousedown", startPainting);
  paintCanvas.addEventListener("mouseup", stopPainting);
  paintCanvas.addEventListener("mouseleave", stopPainting);
}

/* Change Color */
function handleColorChange(color) {
  // console.log(e.target.style)  // CSSStyleDeclaration
  // console.log(e.target.style.backgrounColor)
  // console.log(this.getAttribute("aria-label"));
  ctx.strokeStyle = color;
}

paintColor.forEach((color) => {
  let targetColor = window
    .getComputedStyle(color)
    .getPropertyValue("background-color");
  color.addEventListener("click", () => {
    stopErasing();
    handleColorChange(targetColor);
  });
});

/* Erase(all) Painting */
function erasePainting(x, y) {
  ctx.clearRect(x, y, 30, 30);
}

function eraseAllPainting() {
  ctx.clearRect(0, 0, 350, 350);
}

paintEraser.addEventListener("click", startErasing);
paintEraseAll.addEventListener("click", eraseAllPainting);

function init() {
  openPaint();
  closePaint();
  closePaintBlur();
}

init();
