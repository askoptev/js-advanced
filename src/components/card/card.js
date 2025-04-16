import { DivComponent } from "../../common/div-component";
import "./card.css";

export class Card extends DivComponent {
  constructor(appState, cardState) {
    super();
    this.appState = appState;
    this.cardState = cardState;
  }

  #addToFavorites() {
    this.appState.favorites.push(this.cardState);
  }

  #deleteFromFavorites() {
    this.appState.favorites = this.appState.favorites.filter((e) => e.key !== this.cardState.key);
  }

  #onCard(event) {
    const button = event.target.classList.contains("button__add");
    const img = event.target.classList.contains("button__img");
    const existInFavorites = this.appState.favorites.find((b) => b.key == this.cardState.key);
    if (button || img) {
      if (existInFavorites) {
        this.#deleteFromFavorites();
      } else {
        this.#addToFavorites();
      }
      return;
    }
    const queryString = new URLSearchParams({ key: this.cardState.cover_edition_key }).toString();
    window.location.hash = "book"; // тригерит прослушку по хэш
    const newUrl = `?${queryString}#${"book"}`;
    window.history.pushState(null, "", newUrl); // меняет адрес без релода страницы
  }

  render() {
    this.el.classList.add("card");
    const existInFavorites = this.appState.favorites.find((b) => b.key == this.cardState.key);
    this.el.innerHTML = `
      <div class="card__image">
        <img src="https://covers.openlibrary.org/b/olid/${this.cardState.cover_edition_key}-M.jpg" alt="Обложка">
      </div>
      <div class="card__info">        
        <div class="card__tag">
          ${this.cardState.subject ? this.cardState.subject[0] : "Не задано"}
        </div>       
        <div class="card__name">
          ${this.cardState.title}
        </div>   
        <div class="card__author">
          ${this.cardState.author_name[0]}
        </div>
        <div class="card__footer">
        <button class="button__add ${existInFavorites ? "button__active" : ""}">
        ${existInFavorites ? '<img class="button__img" src="/static/favorite.svg">' : '<img class="button__img" src="/static/favorite-white.svg">'}
        </button>
        </div>
      </div>
    `;

    this.el.addEventListener("click", (event) => {
      this.#onCard(event);
    });

    return this.el;
  }
}
