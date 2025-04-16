import { AbstractView } from "../../common/view";
import onChange from "on-change";
import { Header } from "../../components/header/header";
import { Search } from "../../components/search/search";
import { CardList } from "../../components/card-list/card-list";
import { Pagination } from "../../components/pagination/pagination";

export class MainView extends AbstractView {
  state = {
    list: [],
    loading: false,
    searchQuery: undefined,
    offset: 0,
    numFound: 0,
  };

  constructor(appState) {
    super();
    this.appState = appState;
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
    this.state = onChange(this.state, this.stateHook.bind(this));
    this.setTitle("Поиск книг");
  }

  destroy() {
    onChange.unsubscribe(this.appState);
    onChange.unsubscribe(this.state);
  }

  appStateHook(path) {
    if (path === "favorites") {
      this.render();
    }
  }

  async stateHook(path) {
    console.log(path);

    if (path == "searchQuery" || path === "offset") {
      this.state.loading = true;
      const data = await this.loadList(this.state.searchQuery, this.state.offset);
      this.state.loading = false;
      this.state.numFound = data.numFound;
      this.state.list = data.docs;
      
      // const book = await this.loadBook(this.state.list[0].cover_edition_key);
      // console.log(book);
      
    }
    if (path === "list") {
      this.render();
    }
    if (path === "loading") {
      this.render();
    }
  }

  async loadList(q, offset) {
    const res = await fetch(`https://openlibrary.org/search.json?q=${q}&offset=${offset}`);
    return res.json();
  }

  async loadBook(key) {
    const res = await fetch(`https://openlibrary.org/books/${key}`);
    return res.json();
  }

  render() {
    const main = document.createElement("div");
    main.innerHTML = `<h1>Найдено книг - ${this.state.numFound}</h1>`;
    main.prepend(new Search(this.state).render());
    main.append(new CardList(this.appState, this.state).render());
    main.append(new Pagination(this.state).render());
    this.app.innerHTML = "";
    this.app.append(main);
    this.renderHeader();
  }

  renderHeader() {
    const header = new Header(this.appState).render();
    this.app.prepend(header);
  }
}
