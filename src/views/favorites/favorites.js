import { AbstractView } from "../../common/view"
import onChange from "on-change";
import { Header } from "../../components/header/header";
import { CardList } from "../../components/card-list/card-list";

export class FavoritesView extends AbstractView {
  state = {
    list: [],
    loading: false,
    searchQuery: undefined,
    offset: 0,
    numFound: 0,
  };

  constructor(appState) {
    super();
    this.setTitle("Избранное");
    this.appState = appState;
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
  }

  destroy() {
    onChange.unsubscribe(this.appState);
  }

  appStateHook(path) {
    if (path === "favorites") {
      this.render();
    }
  }

  render() {
    const favorites = document.createElement("div");    
    favorites.innerHTML = `<h1>Избранные книги</h1>`;
    favorites.append(new CardList(this.appState, { list: this.appState.favorites }).render());
    this.app.innerHTML = "";
    this.app.append(favorites);
    this.renderHeader();
  }

  renderHeader() {
    const header = new Header(this.appState).render();
    this.app.prepend(header);
  }
}