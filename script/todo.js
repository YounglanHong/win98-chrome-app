const todoIcon = document.querySelector(".todo-icon"),
  todoContainer = document.querySelector(".todo-container"),
  closeTodoButton = document.querySelector(".js-close_todo");

const todoInput = document.querySelector("#todo-input"),
  todoLists = document.querySelector(".todo-lists"),
  deleteTodoBtn = document.querySelector(".deleteBtn");

const OPEN_TODO = "open";
const TODOS_STORAGE = "todos"; /* localStorage key */
let todoListArr = []; /* localStorage value */

/* Open & Close todo window */
function openTodo() {
  todoIcon.addEventListener("click", () => {
    todoContainer.classList.add(OPEN_TODO);
  });
}

function closeTodo() {
  closeTodoButton.addEventListener("click", () => {
    todoContainer.classList.remove(OPEN_TODO);
  });
  window.addEventListener("click", (e) => {
    e.target === todoContainer && todoContainer.classList.remove(OPEN_TODO);
  });
}

/* Todo List */
function saveTodos() {
  localStorage.setItem(TODOS_STORAGE, JSON.stringify(todoListArr));
}

function deleteTodos(e) {
  /* Delete it from HTML */
  const targetNode = e?.target.parentNode;
  todoLists.removeChild(targetNode);
  /*  Delete todo from localStroage */
  const targetId = targetNode.id;
  const filteredTodoList = todoListArr.filter((todo) => {
    return todo.id !== parseInt(targetId);
  });
  todoListArr = filteredTodoList; /* Replace */
  saveTodos(); /* Resave */
}

function addTodos(todoItem) {
  const newId = todoListArr.length + 1;

  const li = document.createElement("li");
  li.setAttribute("class", "field-row todo-list");
  li.id = newId;

  let input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  input.setAttribute("id", "todo");

  let label = document.createElement("label");
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
  saveTodos();
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
  loadTodos();
  handleTodoInput();
  deleteTodos();
}
init();
