import Component from "../Component.js";

export default class Todo extends Component {
  initailize () {
    this.state = { 
      data: [
        { id: 0, item: "todo0" },
        { id: 1, item: "todo1" }
      ] 
    };
  }

  template () {
    const { data } = this.state;
    return `
      <div class="window">
        <div class="title-bar">
          <div class="title-bar-text" aria-label="Todo List">ToDo List</div>
          <div class="title-bar-controls">
            <button aria-label="Minimize"></button>
            <button aria-label="Maximize"></button>
            <button aria-label="Close" class="js-close todolist"></button>
          </div>
        </div>
        <div class="window-body">
          <div class="field-row todo-input-container">
            <label for="todo-input">Todo</label>
            <input type="text" id="todo-input" />
          </div>
          
          <ul class="todo-lists">
            <li class="field-row todo-list todo-example">
              <input type="checkbox" id="todo" />
              <label for="todo">(ex) Write down Todos</label>
            </li>
          ${data.map((todo, key) => `
            <li class="field-row">
              <input type="checkbox" id="todo" />
              <label for="todo">${todo.item}</label>
              <span class="delete-todo">❌</span>
            </li>
          `).join("")}
          </ul>
        </div>
      </div>
  `
  }

  setEvent () {
    const { data } = this.state;
    const TODOS_STORAGE = "todos";

    // remove todos
    this.target.addEventListener("click", ({ target }) => {
      if(target.classList.contains("delete-todo")) {
        const ul = target.parentNode.parentNode;
        const li = target.parentNode;
        return ul && ul.removeChild(li);
      }
    })

    // add todos
    const todoInput = this.target.querySelector("#todo-input");
    todoInput.addEventListener("keydown", (e) => {
      const { value } = e.target;
      if(e.key === "Enter") {
        this.setState({ data: [...data, { id: data.length + 1, item: value }]});
        localStorage.setItem(TODOS_STORAGE, JSON.stringify({ data: [...data, 
          { id: data.length + 1, item: value }]
        }));
      }
    })

    // set todos
    window.addEventListener("load", (e) => {
      e.preventDefault();
      const storedTodos = localStorage.getItem(TODOS_STORAGE);
      if (storedTodos !== null) {
        const parsedTodos = JSON.parse(storedTodos);
        this.setState(parsedTodos);
      }
    });
  }
}