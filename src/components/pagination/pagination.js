import { DivComponent } from "../../common/div-component";
import "./pagination.css";

export class Pagination extends DivComponent {
  constructor(state) {
    super();
    this.state = state;
  }
  nextPage() {
    if (this.state.numFound === 0) {
      return;
    }
    this.state.offset = ++this.state.offset;
  }
  previousPage() {
    if (this.state.numFound === 0 || this.state.offset === 0) {
      return;
    }
    this.state.offset = --this.state.offset;
  }
  render() {
    this.el.classList.add("pagination");
    this.el.innerHTML = `
      <div class="pagination__block pagination__block_prev">
        <img src="/static/arrow-back.svg" alt="Стрелка предыдущая страница загрузки"/>
        <div class="pagination__text">Предыдущая страница</div>
      </div>
      <div class="pagination__block pagination__block_next">
      <div class="pagination__text">Следующая страница</div>
      <img src="/static/arrow-next.svg" alt="Стрелка новая страница загрузки"/>
      </div>
    `;

    this.el.querySelector(".pagination__block_prev").addEventListener("click", this.previousPage.bind(this));
    this.el.querySelector(".pagination__block_next").addEventListener("click", this.nextPage.bind(this));

    return this.el;
  }
}
