import { AbstractView } from "../../common/view"
import onChange from "on-change";
import { Header } from "../../components/header/header";
import { Book } from "../../components/book/book";

export class BookView extends AbstractView {

  constructor(appState) {
    super();
    this.setTitle("Книга");
    this.appState = appState;
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
  }

  destroy() {
    onChange.unsubscribe(this.appState);
  }

  appStateHook(path) {
    if (path === "keyBook") {
      this.render();
    }
  }

  render() {
    const book = document.createElement("div");    
    book.append(new Book(this.appState).render());
    this.app.innerHTML = "";
    this.app.append(book);
    this.renderHeader();
  }

  renderHeader() {
    const header = new Header(this.appState).render();
    this.app.prepend(header);
  }
}