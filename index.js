/* eslint-disable no-param-reassign */
const winStartup = document.querySelector(".startup");
const windowElements = Array.from(document.querySelectorAll(".window"));

/* startup */
const HIDE_STARTUP = "hide";

const hideStartup = () => {
  setTimeout(() => {
    const startupTimeout = winStartup.classList.add(HIDE_STARTUP);
    clearTimeout(startupTimeout);
  }, 2500); /* hides win98 startup after 2.5s */
}

/* draggable elements */
const dragElement = (el) => {
  let pos1 = 0; let pos2 = 0; let pos3 = 0; let pos4 = 0;

  // stop dragging
  const stopElementDrag = () => {
    document.onmouseup = null;
    document.onmousemove = null;
  }

  // start dragging
  const elementDrag = (e) => {
    e = e || window.event;
    e.preventDefault();
    // new cursor position
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    // new element position
    el.style.top = `${el.offsetTop - pos2  }px`;
    el.style.left = `${el.offsetLeft - pos1  }px`;
  }

  const dragMouseDown = (e) => {
    e = e || window.event;
    e.preventDefault();

    pos3 = e.clientX;
    pos4 = e.clientY;
    
    document.onmouseup = stopElementDrag;
    // Call function when cursor moves
    document.onmousemove = elementDrag;
  }
  el.onmousedown = dragMouseDown;
}

document.addEventListener("DOMContentLoaded", hideStartup);
windowElements.forEach(el => dragElement(el));
