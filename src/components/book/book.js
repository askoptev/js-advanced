import { DivComponent } from "../../common/div-component";
import "./book.css";

export class Book extends DivComponent {
  state = {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    category: "Action & Adventure",
    publication: "1954",
    pages: "1193",
    key: "OL22856696M",
  };
  constructor(appState) {
    super();
    this.appState = appState;
  }

  #getBook() {}

  render() {
    console.log(this.appState.favorites[0].cover_edition_key);
    
    const existInFavorites = this.appState.favorites.find((b) => b.key == this.state.key);
    this.el.classList.add("book");
    this.el.innerHTML = `
      <h1>${this.state.title}</h1>
      <div class="book__card">
        <img src="https://covers.openlibrary.org/b/olid/${this.appState.keyBook}-M.jpg" alt="Обложка">
        <div class="book__data">
          <div class="book__data-text"><span>Автор:</span><span>${this.state.author}</span></div>
          <div class="book__data-text"><span>Category:</span><span>${this.state.category}</span></div>
          <div class="book__data-text"><span>Первая публикация:</span><span>${this.state.publication}</span></div>
          <div class="book__data-text"><span>Число страниц:</span><span>${this.state.pages}</span></div>
          <button class="book__favorites-add">${existInFavorites ? "Из избранного" : "В избранное"}</button>
          </div>
      </div>
    `;
    return this.el;
  }
}