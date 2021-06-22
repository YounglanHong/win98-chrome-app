import Component from "../Component.js";

export default class Startup extends Component {
  initailize () {
    this.state = {
      IMAGE_URL: "https://guidebookgallery.org/pics/gui/startupshutdown/splash/win98-1-1.png"
    };
  }
  

  template () {
    const { IMAGE_URL } = this.state;
    return `
    <img
      src=${IMAGE_URL}
      alt="Window 98 Startup"
    />
  `
  }

  setEvent () {
    const windowStartup = document.querySelector(".startup");

    /* startup */
    const HIDE_STARTUP = "hide";

    const hideStartup = () => {
      setTimeout(() => {
        const startupTimeout = windowStartup.classList.add(HIDE_STARTUP);
        clearTimeout(startupTimeout);
      }, 2500); /* win98 starts after 2.5s */
    }

    document.addEventListener("DOMContentLoaded", hideStartup);
  }
}