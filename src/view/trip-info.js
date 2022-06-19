import AbstractView from '../framework/view/abstract-view';
import {generateInfoDates, generateInfoTitles, generateInfoCost} from '../utils';

const createInfoTemplate = (trips) => {
  console.log(trips)
  const tripDates = generateInfoDates(trips);
  const tripInfo = generateInfoTitles(trips).join([' &mdash; ']);
  const tripCost = generateInfoCost(trips);

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">
          ${tripInfo}
        </h1>

        <p class="trip-info__dates">${tripDates[0]}&nbsp;&mdash;&nbsp;${tripDates[1]}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripCost}</span>
      </p>
    </section>`
  );
};

export default class InfoView extends AbstractView {
  #titles = null;

  constructor(dates) {
    super();
    this.#titles = dates;
  }

  get template() {
    return createInfoTemplate(this.#titles);
  }
}
