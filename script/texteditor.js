const editorIcon = document.querySelector("#editor");
  const editorContainer = document.querySelector(".editor-container");
  const closeEditorButton = editorContainer.querySelector(".js-close_editor");

const textField = editorContainer.querySelector("#text-field");
  const cmdButton = Array.from(editorContainer.getElementsByTagName("button"));

const cmdSelect = Array.from(editorContainer.getElementsByTagName("select"));
// console.log(cmdSelect);

const OPEN_EDITOR = "open";
// const ICON_CLICKED = "icon-clicked";

/* Running App */
const runningAppEditor = document.querySelector(".taskbar-running-app");

function addEditorApp() {
  const textEditorApp = document.createElement("button");
  textEditorApp.setAttribute("id", "run-app");
  textEditorApp.innerText = "⌨️ Text Editor";
  runningAppEditor.appendChild(textEditorApp);
}

function deleteEditorApp() {
  const editorAppCreated = document.querySelector("#run-app");
  // eslint-disable-next-line no-unused-expressions
  editorAppCreated && runningAppEditor.removeChild(editorAppCreated);
}

/* Open & Close text editor window */
function openEditor() {
  editorIcon.addEventListener("click", () => {
    // editorIcon.classList.add(ICON_CLICKED);
    editorContainer.classList.add(OPEN_EDITOR);
    addEditorApp();
  });
  editorIcon.addEventListener("keypress", (e) => {
    if (e.code === "Enter") {
      editorContainer.classList.add(OPEN_EDITOR);
      addEditorApp();
    }
  });
}

function closeEditor() {
  closeEditorButton.addEventListener("click", () => {
    // editorIcon.classList.remove(ICON_CLICKED);
    editorContainer.classList.remove(OPEN_EDITOR);
    deleteEditorApp();
  });
}

function closeEditorBlur() {
  window.addEventListener("click", (e) => {
    if (e.target === editorContainer) {
      // editorIcon.classList.remove(ICON_CLICKED);
      editorContainer.classList.remove(OPEN_EDITOR);
      deleteEditorApp();
    }
  });
}

/* Text Field */
function enableEditMode() {
  textField.contentDocument.designMode = "On";
}

/* Execute Commands */
function execCmd(command, arg) {
  arg
    ? textField.contentDocument.execCommand(command, false, arg)
    : textField.contentDocument.execCommand(command, false, null);
}

function clickCmdBtn() {
  cmdButton.forEach((button) => {
    button.addEventListener("click", () => execCmd(button.dataset.cmd));
  });
}

function clickCmdOpt() {
  cmdSelect.forEach((select) => {
    select.addEventListener("change", () =>
      execCmd(select.dataset.cmd, select.value)
    );
  });
}

function init() {
  openEditor();
  closeEditor();
  closeEditorBlur();
  enableEditMode();
  clickCmdBtn();
  clickCmdOpt();
}

init();
