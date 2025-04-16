"use strict";

import { BookView } from "./views/book/bookView";
import { FavoritesView } from "./views/favorites/favorites";
import { MainView } from "./views/main/main";

class App {
  routes = [
    { path: "", view: MainView },
    { path: "#favorites", view: FavoritesView },
    { path: "#book", view: BookView },
  ];
  appState = {
    favorites: [],
    keyBook: null,
  };
  constructor() {
    window.addEventListener("hashchange", this.route.bind(this));
    this.route();
  }

  route() {
    if (this.currentView) {
      this.currentView.destroy();
    }
    console.log(location.hash);
    const params = new URLSearchParams(window.location.search);

    this.appState.keyBook = params.get("key");

    const view = this.routes.find((r) => r.path == location.hash).view;
    this.currentView = new view(this.appState);
    this.currentView.render();
  }
}

new App();
