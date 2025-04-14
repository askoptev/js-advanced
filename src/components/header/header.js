import { DivComponent } from "../../common/div-component";
import "./header.css";

export class Header extends DivComponent {
  constructor(AppState) {
    super();
    this.AppState = AppState;
  }

  render() {
    this.el.innerHTML = "";
    this.el.classList.add("header");
    this.el.innerHTML = `
      <div>
        <img src="/static/logo.svg" alt="Logo">
      </div>
      <div class="menu">
        <a class="menu__item" href="#">
          <img src="/static/search.svg" alt="Поиск иконка"/>
          Поиск книг
        </a>
        <a class="menu__item" href="#favorites">
          <img src="/static/favorite.svg" alt="Избранное иконка"/>
          Избранное
        </a>
        <div class="menu__counter">
          ${this.AppState.favorites.length}
        </div>
      </div>
    `;
    return this.el;
  }
}
