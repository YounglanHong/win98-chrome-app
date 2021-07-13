import Clock from "./Clock.js"

export default function Taskbar({ $target }) {
  this.$target = $target

  this.init = () => {
    const clock = new Clock()
  }
  
  this.render = () => {
    const taskbarTemplate = `
      <div id="taskbar">
        <button>
          <div>Start</div>
        </button>
        <button>
          <div>Welcome to Windows 98</div>
        </button>
        <div class="taskbar-running-app"></div>
        <button id="date-time">
          <div class="js-clock">
            <h1 aria-label="Date Time Clock"></h1>
          </div>
        </button>
      </div>
    `
    this.$target.insertAdjacentHTML("beforeend", taskbarTemplate)
  }
  this.render()
  this.init()
}
