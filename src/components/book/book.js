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
    desc: "A Game of Thrones is the first novel in A Song of Ice and Fire, a series of fantasy novels by the American author George R. R. Martin. It was first published on August 1, 1996. The novel won the 1997 Locus Award and was nominated for both the 1997 Nebula Award and the 1997 World Fantasy Award. The novella Blood of the Dragon, comprising the Daenerys Targaryen chapters from the novel, won the 1997 Hugo Award for Best Novella. In January 2011, the novel became a New York Times Bestseller and reached No. 1 on the list in July 2011.",
    tags: ["Fiction", "Fantasy fiction", "English Fantasy fiction", "Wizards"],
  };
  constructor(appState) {
    super();
    this.appState = appState;
    this.#getBook(this.appState.keyBook);
  }

  // Функция имиитрирует загрузку данных о книге
  async #getBook(keyBook) {
    const result = await fetch(`https://${keyBook}`);
    if (result.ok) {
      this.state.fetchData = await result.json();
      this.render();
    }
  }

  render() {
    const existInFavorites = this.appState.favorites.find((b) => b.cover_edition_key.includes(this.state.key));
    this.el.classList.add("book");
    this.el.innerHTML = `
      <h1>${this.state.title}</h1>
      <div class="book__card">
        <img src="https://covers.openlibrary.org/b/olid/${this.appState.keyBook}-M.jpg" alt="Обложка">
        <div class="book__data">
          <div class="book__data-text"><span class="book__data-text-title">Автор:</span><span class="book__data-text-text">${
            this.state.author
          }</span></div>
          <div class="book__data-text"><span class="book__data-text-title">Category:</span><span class="book__data-text-text">${
            this.state.category
          }</span></div>
          <div class="book__data-text"><span class="book__data-text-title">Первая публикация:</span><span class="book__data-text-text">${
            this.state.publication
          }</span></div>
          <div class="book__data-text"><span class="book__data-text-title">Число страниц:</span><span class="book__data-text-text">${
            this.state.pages
          }</span></div>
          <button class="book__favorites-add">${existInFavorites ? "Из избранного" : "В избранное"}</button>
        </div>
      </div>
      <div class="book__desc">
        <h2 class="book__desc-title">Описание:</h2>
        <p class="book__desc-text">${this.state.desc}</p>
      </div>
      <div class="book__chips">        
        <h2 class="book__chips-title">Теги:</h2>
        <ui class="book__chips-list">
        ${this.state.tags.map((item) => `<li><button class="book__chip-button">${item}</button></li>`).join("")}          
        </ui>
      </div>
    `;
    return this.el;
  }
}
