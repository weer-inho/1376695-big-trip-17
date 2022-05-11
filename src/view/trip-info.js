import AbstractView from '../framework/view/abstract-view';

const createInfoTemplate = (titles) => {
  const tripInfo = titles.join([' &mdash; ']);

  return (`<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">
        ${tripInfo}
      </h1>

      <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
    </p>
  </section>`
  )
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
