const todoIcon = document.querySelector("#todo");
  const todoContainer = document.querySelector(".todo-container");
  const closeTodoButton = todoContainer.querySelector(".js-close_todo");

const todoInput = document.querySelector("#todo-input");
  const todoLists = document.querySelector(".todo-lists");

const OPEN_TODO = "open";
const TODOS_STORAGE = "todos"; /* localStorage key */
const ICON_CLICKED = "icon-clicked";
let todoListArr = []; /* localStorage value */

/* running app */
const runningApp_todo = document.querySelector(".taskbar-running-app");

function addTodoApp() {
  const todoApp = document.createElement("button");
  todoApp.setAttribute("id", "run-app");
  todoApp.innerText = "🗒 Todo";
  runningApp_todo.appendChild(todoApp);
}

function deleteTodoApp() {
  const todoApp_created = document.querySelector("#run-app");
  todoApp_created && runningApp_todo.removeChild(todoApp_created);
}

/* Open & Close todo window */
function openTodo() {
  todoIcon.addEventListener("click", () => {
    todoIcon.classList.add(ICON_CLICKED);
    todoContainer.classList.add(OPEN_TODO);
    addTodoApp();
  });
  todoIcon.addEventListener("keypress", (e) => {
    if (e.code === "Enter") {
      todoContainer.classList.add(OPEN_TODO);
      addTodoApp();
    }
  });
}

function closeTodo() {
  closeTodoButton.addEventListener("click", () => {
    todoIcon.classList.remove(ICON_CLICKED);
    todoContainer.classList.remove(OPEN_TODO);
    deleteTodoApp();
  });
}

// function closeTodoBlur() {
//   window.addEventListener("click", (e) => {
//     if (e.target === todoContainer) {
//       todoIcon.classList.remove(ICON_CLICKED);
//       todoContainer.classList.remove(OPEN_TODO);
//       deleteTodoApp();
//     }
//   });
// }

/* Todo List */
function saveTodos() {
  // console.log(todoListArr);
  localStorage.setItem(TODOS_STORAGE, JSON.stringify(todoListArr));
}

function deleteTodos(e) {
  /* Delete it from HTML */
  const targetNode = e?.target.parentNode;
  /*  Delete todo from localStroage */
  if (targetNode) {
    todoLists.removeChild(targetNode);
    const targetId = targetNode.id;
    const filteredTodoList = todoListArr.filter((todo) => todo.id !== parseInt(targetId));
    todoListArr = filteredTodoList; /* Replace todos */
    saveTodos(); /* Resave todos */
  }
}

function addTodos(todoItem) {
  const newId = todoListArr.length + 1;

  const li = document.createElement("li");
  li.setAttribute("class", "field-row todo-list");
  li.id = newId;

  const input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  input.setAttribute("id", "todo");

  const label = document.createElement("label");
  label.setAttribute("for", "todo");
  label.innerText = todoItem;

  const deleteBtn = document.createElement("span");
  deleteBtn.setAttribute("class", "deleteBtn");
  deleteBtn.innerText = "❌";
  deleteBtn.addEventListener("click", deleteTodos);

  li.appendChild(input);
  li.appendChild(label);
  li.appendChild(deleteBtn);
  todoLists.appendChild(li);

  const todoListObj = {
    id: newId,
    item: todoItem,
  };
  todoListArr.push(todoListObj);
  saveTodos(); /* Save todos */
}

function getTodos() {
  const storedTodos = localStorage.getItem(TODOS_STORAGE);
  console.log(storedTodos);
  if (storedTodos !== null) {
    const parsedTodos = JSON.parse(storedTodos);
    parsedTodos.forEach((todo) => {
      addTodos(todo.item);
    });
  }
}

function handleTodoInput() {
  todoInput.addEventListener("keydown", (e) => {
    const todoItem = todoInput.value;
    if (e.key === "Enter") {
      addTodos(todoItem);
      todoInput.value = ""; /* initialize */
    }
  });
}

function loadTodos() {
  window.addEventListener("load", () => {
    getTodos();
  });
}

function init() {
  openTodo();
  closeTodo();
  // closeTodoBlur();
  loadTodos();
  handleTodoInput();
  deleteTodos();
}
init();
