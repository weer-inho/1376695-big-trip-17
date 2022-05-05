import {createElement} from '../render';

const createEmptyTemplate = () => '<p class="trip-events__msg">Click New Event to create your first point</p>';

export default class EmptyView {
  #element = null;

  get template() {
    return createEmptyTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
