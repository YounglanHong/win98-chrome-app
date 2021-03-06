# πWindow 98 Chrome App

## νλ‘μ νΈ μ λ³΄

## 0. μκ°

π [Window 98](https://guidebookgallery.org/screenshots/win98)μ μ°Έκ³ ν΄μ HTML, CSS, μλ°μ€ν¬λ¦½νΈλ‘ μΉ μ΄νλ¦¬μΌμ΄μμ λ§λλ νλ‘μ νΈμλλ€.

π λ°°ν¬ λ§ν¬: [win98 chrome app](https://unruffled-brahmagupta-b81ab7.netlify.app/)

![Win 98](./assets/win98_home.png)

## 1. μ€ν λ°©λ²

- CORS μλ¬λ₯Ό λ°©μ§νκΈ° μν΄ [live-server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)λ₯Ό νμ©νμ¬ μ€νν©λλ€.

> Open `index.html` with **Live Server**

## 2. νμΌ κ΅¬μ‘°

```
βββ src/
	 βββ components/          - μ»΄ν¬λνΈ νμΌ
			βββ Startup.js
			βββ Todo.js
			βββ TextEditor.js
	 βββ App.js               - μ»΄ν¬λνΈ μ μ
	 βββ Component.js         - μ»΄ν¬λνΈ κ΅¬ν
   βββ index.js             - entry point
βββ style/                  - css νμΌ
βββ index.html

* eslint, prettier μ€μ  νμΌ

```

## 3. μ£Όμ κΈ°λ₯

### Todo App

![Win 98 Todo](./assets/win98-1.gif)

- ν μΌ μΆκ°/ μ­μ 

### Text Editor

![Win 98 TextEditor](./assets/win98-2.gif)

- νμ€νΈ μλ ₯/ μ­μ 
- νμ€νΈ ν¬κΈ°, μ€νμΌ, ν°νΈ, μμΉ μ‘°μ 

### Painting App(μ§ν μ€)

- μΊλ²μ€ μ , λν κ·Έλ¦¬κΈ°/ μ§μ°κΈ°
- μ  μκΉ λ³κ²½

---

## κΈ°μ‘΄ μ½λμ λ¬Έμ μ  κ°μ 

### 1. HTML μ½λκ° λ°λ³΅λκ³  λ° λ¬΄κ±°μμ§λ λ¬Έμ 

- λ°λ³΅ μμμ `map`μ ν΅ν΄ λ λλ§ν©λλ€.

  ```html
  <!-- κ°μ κ΅¬μ‘° λ°λ³΅ -->
  <div class="icon-group">
    <!-- ... -->
    <div id="todo" class="icon todo" tabindex="0">
      <strong>ToDo List</strong>
    </div>
    <div id="editor" class="icon editor" tabindex="0">
      <strong>Text Editor</strong>
    </div>
    <div id="paint" class="icon paint" tabindex="0">
      <strong>Paint</strong>
    </div>
  </div>

  <!-- λ¦¬ν©ν λ§  -->
  <!-- App.js -->
  const { data } = this.state; return `
  <div class="icon-group">
    ${data.map((list, key) => `
    <div class="icon">
      <strong class="icon-name">${list.icon}</strong>
    </div>
    ` ).join("")}
  </div>
  `
  ```

### 2. `<script>` λ‘ κ°μ Έμ€λ μΈλΆ μλ°μ€ν¬λ¦½νΈ νμΌ μ¦κ°

- `script` νμμ `module`λ‘ μ€μ ν΄μ **λͺ¨λλ λ²¨ μ€μ½ν**λ₯Ό λ§λ­λλ€.

  ```html
  <body>
    <!-- ... -->
    <script src="./index.js"></script>
    <script src="./script/clock.js"></script>
    <script src="./script/modal.js"></script>
    <script src="./script/todo.js"></script>
    <script src="./script/texteditor.js"></script>
    <script src="./script/paint.js"></script>
    <script src="./script/paint-tools.js"></script>
  </body>

  <!-- λ¦¬ν©ν λ§  -->
  <!-- index.html -->

  <body>
    <div id="root"></div>
    <script src="./src/index.js" type="module"></script>
  </body>
  ```

- μλ°μ€ν¬λ¦½νΈ νμΌμ **μ»΄ν¬λνΈ** κ΅¬μ‘°λ‘ λ¦¬ν©ν λ§ νμ΅λλ€.

  ```js
  // Component.js
  export default class Component {
    constructor(target) {
      this.target = target; // event target
      this.initailize();
      this.setEvent();
      this.render();
    }

    // μ΄κΈ°ν
    initailize() {}

    // λ·°(λ§ν¬μ)
    template() {
      return "";
    }

    // λ λλ§
    render() {
      this.target.innerHTML += this.template();
      this.setEvent();
    }

    // μ΄λ²€νΈ ν¨μ
    setEvent() {}

    // μν μλ°μ΄νΈ
    setState(newState) {
      this.state = { ...this.state, ...newState };
      this.render();
    }
  }
  ```

- ES6μ `class` λ¬Έλ²μΌλ‘ μμ±ν΄μ **μ»΄ν¬λνΈ** μ½λμ μ¬μ©λ²μ ν¨ν΄νν©λλ€.

  ```js
  // App.js μμ
  import Todo from "./components/Todo.js";
  import TextEditor from "./components/TextEditor.js";

  class App {
    constructor() {
      const app = document.querySelector("#root");

      new Todo(app);
      new TextEditor(app);
    }
  }

  new App();
  ```

---

### λ νΌλ°μ€

[98.css](https://jdan.github.io/98.css/)
