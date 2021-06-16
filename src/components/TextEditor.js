/* eslint-disable no-unused-expressions */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
import Component from "../Component.js";

export default class TextEditor extends Component {
  initailize () {
    this.state = { 
      data: [
        
      ] 
    };
  }

  template () {
    const { data } = this.state;
    return `
    <section class="editor-container">
    <div class="window editor-app">
      <div class="title-bar">
        <div class="title-bar-text" aria-label="Text Editor">
          Script - WordPad
        </div>
        <div class="title-bar-controls">
          <button aria-label="Minimize"></button>
          <button aria-label="Maximize"></button>
          <button aria-label="Close" class="js-close_editor"></button>
        </div>
      </div>
      <div class="window-body">
        <ul class="lists header-menu">
          <li>File</li>
          <li>Edit</li>
          <li>View</li>
          <li>Insert</li>
          <li>Format</li>
          <li>Help</li>
        </ul>
        <hr />
        <ul class="lists editor-menu">
          <div class="button-group">
            <select data-cmd="fontName">
              <option value="Arial">Arial</option>
              <option value="Courier">Courier</option>
              <option value="Georgia">Georgia</option>
              <option value="Tahoma">Tahoma</option>
              <option value="Verdana">Verdana</option>
              <option value="Helvetica Neue">Helvetica Neue</option>
              <option value="Times New Roman">Times New Roman</option>
            </select>
          </div>
          <div class="button-group">
            <select data-cmd="fontSize">
              <option value="1">h1</option>
              <option value="2">h2</option>
              <option value="3">h3</option>
              <option value="4">h4</option>
              <option value="5">h5</option>
              <option value="6">h6</option>
              <option value="7">h7</option>
            </select>
          </div>
          <div class="button-group">
            <button aria-label="bold" data-cmd="bold">
              <i class="fas fa-bold"></i>
            </button>
            <button aria-label="italic" data-cmd="italic">
              <i class="fas fa-italic"></i>
            </button>
            <button aria-label="underline" data-cmd="underline">
              <i class="fas fa-underline"></i>
            </button>
            <button aria-label="strikeThrough" data-cmd="strikeThrough">
              <i class="fas fa-strikethrough"></i>
            </button>
          </div>
          <div class="button-group">
            <button aria-label="align left" data-cmd="justifyLeft">
              <i class="fas fa-align-left"></i>
            </button>
            <button aria-label="align center" data-cmd="justifyCenter">
              <i class="fas fa-align-center"></i>
            </button>
            <button aria-label="align right" data-cmd="justifyRight">
              <i class="fas fa-align-right"></i>
            </button>
          </div>
        </ul>
        <hr />
        <iframe id="text-field"></iframe>
      </div>
    </div>
  </section>

  `
  }

  setEvent () {
    const textField = this.target.querySelector("#text-field");
    const cmdSelect = Array.from(this.target.getElementsByTagName("select"));

    // start editing
    textField.contentDocument.designMode = "On";

    const execCmd = (command, arg) => {
      arg
        ? textField.contentDocument.execCommand(command, false, arg)
        : textField.contentDocument.execCommand(command, false, null);
    }

    // change options
    this.target.addEventListener('click', ({ target }) => {
      // select option
      if(target.dataset.cmd === "fontSize" || target.dataset.cmd === "fontName") {
        cmdSelect.forEach((select) => {
          select.addEventListener("change", () =>
            execCmd(select.dataset.cmd, select.value)
          );
        });
      }
      // button option
      execCmd(target.dataset.cmd)
    })
  }
}