class Theme {
  selectors = {
    button: '[data-js-theme-swap]',
    body: '[data-js-theme]',
  }
  state = {
    currentTheme: "light"
  }
  constructor() {
    this.buttonElement = document.querySelector(this.selectors.button);
    this.bodyElement = document.querySelector(this.selectors.body)
    this.init();
  }

  getPreferredTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      this.state.currentTheme = savedTheme;
      return
    }
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    this.state.currentTheme = systemTheme ? "dark" : "light";
  }

  setTheme() {
    this.bodyElement.classList.toggle("dark", this.state.currentTheme === "dark")
    localStorage.setItem("theme", this.state.currentTheme)
  }

  toggleTheme() { // Добавлен метод для переключения темы
    this.state.currentTheme = this.state.currentTheme === "light" ? "dark" : "light";
    this.setTheme(); // Вызываем setTheme() после переключения
  }

  init() {
    this.getPreferredTheme()
    this.setTheme()
    this.buttonElement.addEventListener("click", () => this.toggleTheme())
  }
}
new Theme()