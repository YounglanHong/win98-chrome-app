// DOM nodes made by javascript
const paintIcon = document.querySelector("#paint");
const paintContainer = document.querySelector(".paint-container-new");
const paintAppNew = document.querySelector(".paint-app-new");
const paintAppBody = document.querySelector(".window-body-new")
const closePaintButton = paintContainer.querySelector(".js-close_paint");

const OPEN_PAINT = "open_paint";
const BUTTON_CLICKED = "button_clicked";

/* Open & Close paint window */
const openPaint = () => {
  paintIcon.addEventListener("click", () => {
    console.log(paintIcon)
    paintIcon.classList.add(ICON_CLICKED);
    paintContainer.classList.add(OPEN_PAINT);
    // addPaintApp();
  });
  paintIcon.addEventListener("keypress", (e) => {
    if (e.code === "Enter") {
      paintContainer.classList.add(OPEN_PAINT);
      // addPaintApp();
    }
  });
}

const closePaint = () => {
  closePaintButton.addEventListener("click", () => {
    paintIcon.classList.remove(ICON_CLICKED);
    paintContainer.classList.remove(OPEN_PAINT);
    // deletePaintApp();
  });
}

const closePaintBlur = () => {
  window.addEventListener("click", (e) => {
    if (e.target === paintContainer) {
      paintIcon.classList.remove(ICON_CLICKED);
      paintContainer.classList.remove(OPEN_PAINT);
      // deletePaintApp();
    }
  });
}

function init() {
  openPaint();
  closePaint();
  closePaintBlur();
}

init();

/********************* Painting App ***************************/
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes

// canvas
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 300;


let isPainting = false;

const startPainting = () => {
  isPainting = true;
}

const stopPainting = () => {
  isPainting = false;
}

let pos = {}; // (x, y) position
const setPosition = (e) => {
  pos.x = e.offsetX;
  pos.y = e.offsetY;
}

const drawLine = (e) => {
  setPosition(e);
  const x = pos.x;
  const y = pos.y;
  if (!isPainting) {
    ctx.beginPath(); // start new path
    ctx.moveTo(x, y); // move to (x, y)
    ctx.lineCap = "round";
  } else {
    ctx.lineTo(x, y); // draw line to (x, y)
    ctx.stroke(); // render the path
  }
}

canvas.addEventListener("mousemove", (e) => drawLine(e));

if (canvas) {
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
}

// Append child
paintAppBody.appendChild(canvas);