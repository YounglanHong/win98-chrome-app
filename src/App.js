import Component from "./Component.js"
import Startup from "./components/Startup.js"  
import Todo from "./components/Todo.js"
import TextEditor from "./components/TextEditor.js"

export default class App extends Component {
  initailize () {
    this.state = { 
      data: [
        { id: 0, icon: "My Computer" },
        { id: 1, icon: "My Briefcase" },
        { id: 2, icon: "My Documents" },
        { id: 3, icon: "Recycle Bin" },
        { id: 4, icon: "ToDo List" },
        { id: 5, icon: "Text Editor" },
        { id: 6, icon: "Paint" },
      ] 
    };
  }

  template () {
    const { data } = this.state;
    return `
      <div class="icon-group">
      ${data.map((list, key) => `
        <div class="icon">
          <strong class="icon-name">${list.icon}</strong>
        </div>
      `
      ).join("")}
      </div>
      <section id="todolist" class="container"></section>
      <section id="texteditor" class="container"></section>
      <div class="startup"></div>
  `
  }

  didMount() {
    const todoList = this.target.querySelector("#todolist");
    const textEditor = this.target.querySelector("#texteditor");
    const startUp = this.target.querySelector(".startup");

    new Todo(todoList, {})
    new TextEditor(textEditor, {})
    new Startup(startUp, {})
  }



  setEvent() {
    // Open app
    const { data } = this.state;
    const OPEN = "open";
    const iconGroup = this.target.querySelector(".icon-group");
    const containers = Array.from(this.target.querySelectorAll(".container"));
  
    iconGroup.addEventListener("click", ({target}) => {
      if(target.classList.contains("icon-name")) {
        data.forEach(item => {
          if(target.innerText === item.icon) {
            const iconId = item.icon.toLowerCase().replace(" ", "");
            containers.forEach(container => {
              const containerId = container.id;
              if(iconId === containerId) {
                container.classList.add(OPEN);
              }
            })
          }
        })
      }     
    })

  // Close app
  const closeBtns = Array.from(this.target.querySelectorAll(".js-close"));

    closeBtns.forEach(closeBtn => {
      closeBtn.addEventListener("click", () => {
        containers.forEach(container => {
          if(closeBtn.classList.contains(container.id)) {
            container.classList.remove(OPEN);
          }
        })
      })
    })
  }
}