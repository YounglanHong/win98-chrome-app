const editorIcon = document.querySelector("#editor"),
  editorContainer = document.querySelector(".editor-container"),
  closeEditorButton = editorContainer.querySelector(".js-close_editor");

const textField = editorContainer.querySelector("#text-field"),
  cmdButton = Array.from(editorContainer.getElementsByTagName("button"));

const cmdSelect = Array.from(editorContainer.getElementsByTagName("select"));
console.log(cmdSelect);

const OPEN_EDITOR = "open";

/* Running App */
const runningApp_editor = document.querySelector(".taskbar-running-app");

function addEditorApp() {
  const textEditorApp = document.createElement("button");
  textEditorApp.setAttribute("id", "run-app");
  textEditorApp.innerText = "⌨️ Text Editor";
  runningApp_editor.appendChild(textEditorApp);
}

function deleteEditorApp() {
  const editorApp_created = document.querySelector("#run-app");
  editorApp_created && runningApp_editor.removeChild(editorApp_created);
}

/* Open & Close text editor window */
function openEditor() {
  editorIcon.addEventListener("click", () => {
    editorContainer.classList.add(OPEN_EDITOR);
    addEditorApp();
  });
}

function closeEditor() {
  closeEditorButton.addEventListener("click", () => {
    editorContainer.classList.remove(OPEN_EDITOR);
    deleteEditorApp();
  });
}

function closeEditorBlur() {
  window.addEventListener("click", (e) => {
    if (e.target === editorContainer) {
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
