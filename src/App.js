import { $ } from "./utils/dom.js"
import { icons } from "../assets/menu.js"
import { storage } from "./utils/localStorage.js"

import TodoList from "./components/TodoList.js"
import Taskbar from "./components/Taskbar.js"


export default function App($target) {
  this.$target = $target
  this.state = {
    todos: storage.getItem('todos'),
    isRunning: ""
  }

  this.init = () => {
    this.taskbar = new Taskbar({
      $target
    })

    const { todos, isRunning } = this.state
    this.todoList = new TodoList({
      $target,
      initialState: todos,
      onAdd: (newTodo) => {
        this.setState({
          todos: [...todos, { item: newTodo, isCompleted: false }],
          isRunning
        })
      },
      onRemove: (todoId) => {
        const filteredTodos = todos.filter(todo => todos.indexOf(todo) !== todoId)
        this.setState({
          todos: filteredTodos,
          isRunning
        })
      },
      onToggleCheck: (todoId) => {
        todos.forEach(todo => {
          if(todos.indexOf(todo) === todoId) {
            todos[todoId].isCompleted = !todos[todoId].isCompleted
            this.setState(this.state)
          }
        })
        
      }
    }) 
  }
  

  this.setState = nextState => {
    this.state = nextState

    this.todoList.setState(this.state.todos)
    storage.setItem('todos', this.state.todos)
  }

  this.render = () => {
    const iconTemplate = `
    <div class="icon-group">
      ${icons.map(({id, icon}) => `
        <div data-icon-id=${id} class="icon">
          <strong class="icon-name">${icon}</strong>
        </div>
      `
      ).join("")
    }
    </div>
    <div class="program-group">
      <article id="todolist" class="container"></article>
      <article id="texteditor" class="container"></article>
    </div>
    `
    this.$target.innerHTML = iconTemplate
  } 
  // <div class="startup"></div>

  this.bindEvents = () => {
    // 프로그램 실행
    const OPEN = "open"
    const $programs = $(".program-group")
    $(".icon-group").addEventListener("click", ({ target }) => {
      if(target.classList.contains("icon-name")) {
        const iconText = target.innerText.toLowerCase().replace(" ", "")
        $programs.childNodes.forEach(program => {
          if(iconText === program.id) {
            program.classList.add(OPEN)
            this.setState({ todos: [...this.state.todos], isRunning: program.id})
          }
        })
      }
      this.bindEvents()
    }, true )
  
    // 프로그램 닫기
    $programs.addEventListener("click", (e) => {
      if(e.target.classList.contains("js-close")) {
        $programs.childNodes.forEach(program => {
          if(program.id ===  this.state.isRunning) {
            program.classList.remove(OPEN)
          }
        })
      }
    })
  }

  this.render()
  this.bindEvents()
  this.init()
}
