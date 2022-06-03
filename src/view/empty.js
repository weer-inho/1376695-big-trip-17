import AbstractView from '../framework/view/abstract-view';
import {FilterType} from '../const';

const NoTasksTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.FUTURE]: 'There are no future events now',
};

const createEmptyTemplate = (filterType) => {
  const noTaskTextValue = NoTasksTextType[filterType];

  return (`<p class="trip-events__msg">${noTaskTextValue}</p>`);
};

export default class EmptyView extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEmptyTemplate(this.#filterType);
  }
}
