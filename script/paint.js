const paintIcon = document.querySelector("#paint");
  const paintContainer = document.querySelector(".paint-container");
  const closePaintButton = paintContainer.querySelector(".js-close_paint");

const paintColor = Array.from(document.getElementsByClassName("color"));
  const paintTools = Array.from(document.getElementsByClassName("tool"));

// const lineIcon = document.querySelector(".line"),
//   eraseIcon = document.querySelector(".eraser");

const paintCanvas = document.querySelector("#paint-canvas");
  const ctx = paintCanvas.getContext("2d"); // Context variable

/* Painting canvas style(default) */
paintCanvas.width = 350;
paintCanvas.height = 350;

ctx.strokeStyle = "#000000";
ctx.lineWidth = 1.5;

const OPEN_PAINT = "open_paint";
// const BUTTON_CLICKED = "button_clicked";

/* running app */
const runningAppPaint = document.querySelector(".taskbar-running-app");

function addPaintApp() {
  const paintApp = document.createElement("button");
  paintApp.setAttribute("id", "run-app");
  paintApp.innerText = "🎨 Paint";
  runningAppPaint.appendChild(paintApp);
}

function deletePaintApp() {
  const paintAppCreated = document.querySelector("#run-app");
  // eslint-disable-next-line no-unused-expressions
  paintAppCreated && runningAppPaint.removeChild(paintAppCreated);
}

/* Open & Close paint window */
function openPaint() {
  paintIcon.addEventListener("click", () => {
    // paintIcon.classList.add(ICON_CLICKED);
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
    // paintIcon.classList.remove(ICON_CLICKED);
    paintContainer.classList.remove(OPEN_PAINT);
    deletePaintApp();
  });
}

function closePaintBlur() {
  window.addEventListener("click", (e) => {
    if (e.target === paintContainer) {
      // paintIcon.classList.remove(ICON_CLICKED);
      paintContainer.classList.remove(OPEN_PAINT);
      deletePaintApp();
    }
  });
}

/** ****************************************************** */

/* Painting Canvas */

/* Change Tools */
const pos = {}; // (x, y) position
let isPainting = false;
let isErasing = false;

function startErasing() {
  isErasing = true;
}

function stopErasing() {
  isErasing = false;
}

function startPainting() {
  stopErasing();
  if (!isErasing) {
    isPainting = true;
  }
}

function stopPainting() {
  isPainting = false;
}

function setPosition(e) {
  pos.x = e.offsetX;
  pos.y = e.offsetY;
}

function drawLine(e) {
  setPosition(e);
  const {x} = pos;
  const {y} = pos;
  if (!isPainting) {
    ctx.beginPath(); // start new path
    ctx.moveTo(x, y); // move to (x, y)
    ctx.lineCap = "round";
  } else {
    ctx.lineTo(x, y); // draw line to (x, y)
    ctx.stroke(); // render the path
  }
}

/* Erase(all) Painting */
function eraseDrawing(e) {
  if (isErasing) {
    setPosition(e);
    ctx.clearRect(pos.x, pos.y, 30, 30);
  }
}

// function eraseAll() {
//   if(isErasing) {
//     ctx.clearRect(0, 0, 350, 350);
//   }
// }

function draw(tool) {
  paintCanvas.addEventListener("mousemove", (e) => {
    switch (tool) {
      case "line":
        drawLine(e);
        break;
      case "rect":
        drawRect(e);
        break;
      case "circle":
        drawCircle(e);
        break;
      case "eraser":
        startErasing();
        eraseDrawing(e);
        break;
      default:
        break;
    }
  });
}

paintTools.forEach((tool) => {
  tool.addEventListener("click", (e) => draw(e.target.name));
});

if (paintCanvas) {
  paintCanvas.addEventListener("mousedown", startPainting);
  paintCanvas.addEventListener("mouseup", stopPainting);
  paintCanvas.addEventListener("mouseleave", stopPainting);
}

/* Change Colors */
function handleColorChange(color) {
  // console.log(this.getAttribute("aria-label"));
  ctx.strokeStyle = color;
}

paintColor.forEach((color) => {
  const targetColor = window
    .getComputedStyle(color)
    .getPropertyValue("background-color");
  color.addEventListener("click", () => {
    stopErasing();
    handleColorChange(targetColor);
  });
});

function init() {
  openPaint();
  closePaint();
  closePaintBlur();
}

init();
