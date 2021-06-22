export default class Component {
  constructor(target, props) {
    this.target = target;  // 이벤트 타겟(#root)
    this.props = props;  // props(속성)
    this.initailize();
    this.render(); 
    this.setEvent();
  }

  initailize() {}

  // 첫 render 이후 호출
  didMount() {};

  // 마크업
  template() {
    return "";
  }

  render() {
    // 렌더링된 요소 없으면, 추가
    if(!this.target.innerHTML.length) {
      this.target.innerHTML += this.template();
    } else {
    // 렌더링된 요소 있으면, 대체
      this.target.innerHTML = this.template();
    }
    
    
    this.didMount(); // render 이후 호출
    // this.setEvent();
  }

  // 이벤트 함수
  setEvent() {}

  // 상태(state) 업데이트
  setState(newState) {
    this.state = {...this.state, ...newState};
    this.render();
  }
}