import { AbstractView } from "../../common/view"
import { MainView } from "../main/main";

export class Favorites extends AbstractView {
  constructor(appState) {
    super();
    this.setTitle("Избранное");
    this.appState = appState;
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
  }

  appStateHook(path) {
    if (path === "favorites") {
      this.render();
    }
  }

  render() {
      const favorites = document.createElement("div");
      // favorites.append(new CardList(this.appState, this.state).render());
      this.app.innerHTML = "";
      this.app.append(favorites);
      this.renderHeader();
    }
  
    renderHeader() {
      const header = new Header(this.appState).render();
      this.app.prepend(header);
    }
}