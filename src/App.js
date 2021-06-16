/* eslint-disable no-new */
// eslint-disable-next-line import/extensions
import Todo from "./components/Todo.js"

class App {
  constructor() {
    const app = document.querySelector("#root");

    new Todo(app);
  }
}

new App();