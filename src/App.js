/* eslint-disable import/extensions */
/* eslint-disable no-new */
// eslint-disable-next-line import/extensions
import Todo from "./components/Todo.js"
import TextEditor from "./components/TextEditor.js"

class App {
  constructor() {
    const app = document.querySelector("#root");

    new Todo(app);
    new TextEditor(app);
  }
}

new App();