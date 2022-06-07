import AbstractView from '../framework/view/abstract-view';
import {FilterType} from '../const';

const NoTripsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.FUTURE]: 'There are no future events now',
};

const createEmptyTemplate = (filterType) => {
  const noTripTextValue = NoTripsTextType[filterType];

  return (`<p class="trip-events__msg">${noTripTextValue}</p>`);
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
