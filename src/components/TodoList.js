import { $ } from "../utils/dom.js"

export default function TodoList({ $target, initialState, onAdd, onRemove, onToggleCheck }) {
  this.$todoList = $("#todolist")
  this.state = initialState

  this.setState = nextState => {
    this.state = nextState
    // console.log(this.state)
    this.render()
  }

  this.render = () => {
    const todoTemplate = `
      <div class="window">
        <div class="title-bar">
        <div class="title-bar-text" aria-label="Todo List">ToDo List</div>
        <div class="title-bar-controls">
          <button aria-label="Minimize"></button>
          <button aria-label="Maximize"></button>
          <button aria-label="Close" class="js-close"></button>
        </div>
      </div>
      <div class="window-body">
        <div class="field-row todo-input-container">
          <label for="todo-input">Todo</label>
          <input type="text" id="todo-input" placeholder="Write down todos" />
        </div>
        
        <ul class="todo-lists">
        ${this.state.map(({ item, isCompleted }, idx) => `
          <li class="field-row" data-todo-id=${idx}>
            <input type="checkbox" id="todo-${idx}" ${isCompleted ? 'checked' : ''}/>
            <label for="todo-${idx}">${item}</label>
            <span class="remove-todo">❌</span>
          </li>
        `).join("")}
        </ul>
      </div>
    </div>
    `
    this.$todoList.innerHTML = todoTemplate
  }

  this.bindEvents = () => {
    this.$todoList.addEventListener("keyup", ({ key, target: { value }}) => {
      if(key === "Enter" && value.length) {
        onAdd(value)
      }
    })

    this.$todoList.addEventListener("click", ({ target }) => {
      if(target.classList.contains("remove-todo")) {
        const todoId = Number(target.parentNode.dataset.todoId)
        onRemove(todoId)
      }
      const targetId = Number(target.id[target.id.length - 1])
      const todoId = Number(target.parentNode.dataset.todoId)
      if(targetId === todoId) {
        onToggleCheck(todoId)
      }
    })
  }

  this.render()
  this.bindEvents()
  
}


