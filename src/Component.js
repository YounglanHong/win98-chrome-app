/* eslint-disable class-methods-use-this */
export default class Component {
  constructor(target) {
    this.target = target;  // event target
    this.initailize();
    this.render(); 
  }

  initailize() {}

  template() {
    return "";
  }



  render() {
    this.target.innerHTML += this.template();
    this.setEvent();
  }

  // event functions
  setEvent() {}

  // update states
  setState(newState) {
    this.state = {...this.state, ...newState};
    // this.render();
  }
}