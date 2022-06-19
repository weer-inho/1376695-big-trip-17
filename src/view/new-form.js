import dayjs from 'dayjs';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import flatpickr from 'flatpickr';
import {BLANK_TRIP} from '../const';

import 'flatpickr/dist/flatpickr.min.css';

const createEventOffers = (offersArray, offersIds) => {
  return (`<section class="event__section  event__section--offers">
${(offersArray.offers.length === 0) ? '' : `<h3 class="event__section-title  event__section-title--offers">Offers</h3>
<div class="event__available-offers">
  ${offersArray.offers.map((offer) => `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}" type="checkbox" name="event-offer-${offer.id}"
    ${(offersIds.find((offerId) => offerId === offer.id)) ? 'checked' : ''}>
    <label class="event__offer-label" for="event-offer-${offer.id}">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </label>
  </div>`).join('')}
</div>`}
</section>`);
};

const createEventPhotos = (photos) => (`
${photos.map((photo) => `<img class='event__photo' src='${photo.src}' alt='${photos.destination}'>`)}
`);

const createDestinationList = (destinations) => (`
${destinations.map((destination) => `<option value="${destination.name}"></option>`)}
`);

const createNewFormTemplate = (trip, destinations) => {
  const {type, destination, dateFrom, dateTo, basePrice, isSaving, isDeleting, offers, offersArray} = trip;
  const offerForRender = offersArray.find((array) => array.type === type);
  const serverDestinationObject = destinations.find((element) => element.name === destination.name);

  return (
    `<li class='trip-events__item'>
      <form class='event event--edit' action='#' method='post'>
        <header class='event__header'>
          <div class='event__type-wrapper'>
            <label class='event__type  event__type-btn' for='event-type-toggle-1'>
              <span class='visually-hidden'>Choose event type</span>
              <img class='event__type-icon' width='17' height='17' src='img/icons/${type}.png' alt='Event type icon'>
            </label>
            <input class='event__type-toggle  visually-hidden' id='event-type-toggle-1' type='checkbox'>

            <div class='event__type-list'>
              <fieldset class='event__type-group'>
                <legend class='visually-hidden'>Event type</legend>

                <div class='event__type-item'>
                  <input id='event-type-taxi-1' class='event__type-input  visually-hidden' type='radio' name='event-type' value='taxi' ${type === 'taxi' ? 'checked' : ''}>
                  <label class='event__type-label  event__type-label--taxi' for='event-type-taxi-1'>Taxi</label>
                </div>

                <div class='event__type-item'>
                  <input id='event-type-bus-1' class='event__type-input  visually-hidden' type='radio' name='event-type' value='bus' ${type === 'bus' ? 'checked' : ''}>
                  <label class='event__type-label  event__type-label--bus' for='event-type-bus-1'>Bus</label>
                </div>

                <div class='event__type-item'>
                  <input id='event-type-train-1' class='event__type-input  visually-hidden' type='radio' name='event-type' value='train' ${type === 'train' ? 'checked' : ''}>
                  <label class='event__type-label  event__type-label--train' for='event-type-train-1'>Train</label>
                </div>

                <div class='event__type-item'>
                  <input id='event-type-ship-1' class='event__type-input  visually-hidden' type='radio' name='event-type' value='ship' ${type === 'ship' ? 'checked' : ''}>
                  <label class='event__type-label  event__type-label--ship' for='event-type-ship-1'>Ship</label>
                </div>

                <div class='event__type-item'>
                  <input id='event-type-drive-1' class='event__type-input  visually-hidden' type='radio' name='event-type' value='drive' ${type === 'drive' ? 'checked' : ''}>
                  <label class='event__type-label  event__type-label--drive' for='event-type-drive-1'>Drive</label>
                </div>

                <div class='event__type-item'>
                  <input id='event-type-flight-1' class='event__type-input  visually-hidden' type='radio' name='event-type' value='flight' ${type === 'flight' ? 'checked' : ''}>
                  <label class='event__type-label  event__type-label--flight' for='event-type-flight-1'>Flight</label>
                </div>

                <div class='event__type-item'>
                  <input id='event-type-check-in-1' class='event__type-input  visually-hidden' type='radio' name='event-type' value='check-in' ${type === 'check-in' ? 'checked' : ''}>
                  <label class='event__type-label  event__type-label--check-in' for='event-type-check-in-1'>Check-in</label>
                </div>

                <div class='event__type-item'>
                  <input id='event-type-sightseeing-1' class='event__type-input  visually-hidden' type='radio' name='event-type' value='sightseeing' ${type === 'sightseeing' ? 'checked' : ''}>
                  <label class='event__type-label  event__type-label--sightseeing' for='event-type-sightseeing-1'>Sightseeing</label>
                </div>

                <div class='event__type-item'>
                  <input id='event-type-restaurant-1' class='event__type-input  visually-hidden' type='radio' name='event-type' value='restaurant' ${type === 'restaurant' ? 'checked' : ''}>
                  <label class='event__type-label  event__type-label--restaurant' for='event-type-restaurant-1'>Restaurant</label>
                </div>
              </fieldset>
            </div>
          </div>

          <div class='event__field-group  event__field-group--destination'>
            <label class='event__label  event__type-output' for='event-destination-1'>
              ${type}
            </label>
            <input class='event__input  event__input--destination' id='event-destination-1' type='text' name='event-destination' value='${destination.name}' list='destination-list-1'>
            <datalist id='destination-list-1'>
                ${createDestinationList(destinations)}
            </datalist>
          </div>

          <div class='event__field-group  event__field-group--time'>
            <label class='visually-hidden' for='event-start-time-1'>From</label>
            <input class='event__input  event__input--time' id='event-start-time-1' type='text' name='event-start-time' value='${dayjs(dateFrom).format('M/D/YYYY h:mm')}'>
            &mdash;
            <label class='visually-hidden' for='event-end-time-1'>To</label>
            <input class='event__input  event__input--time' id='event-end-time-1' type='text' name='event-end-time' value='${dayjs(dateTo).format('M/D/YYYY h:mm')}'>
          </div>

          <div class='event__field-group  event__field-group--price'>
            <label class='event__label' for='event-price-1'>
              <span class='visually-hidden'>Price</span>
              &euro; ${basePrice}
            </label>
            <input class='event__input  event__input--price' id='event-price-1' type='number' name='event-price' value=''>
          </div>

          <button class='event__save-btn  btn  btn--blue' type='submit'
          >
            ${isSaving ? 'saving...' : 'save'}
          </button>
          <button class='event__reset-btn' type='reset'
          >
            ${isDeleting ? 'deleting...' : 'delete'}
          </button>
        </header>
        <section class='event__details'>
          <section class='event__section  event__section--offers'>
              ${createEventOffers(offerForRender, offers)}
          </section>

          <section class='event__section  event__section--destination'>
            <h3 class='event__section-title  event__section-title--destination'>Destination</h3>
            <p class='event__destination-description'>
              ${serverDestinationObject.description}
            </p>

            <div class='event__photos-container'>
              <div class='event__photos-tape'>
                  ${createEventPhotos(serverDestinationObject.pictures)}
              </div>
            </div>
          </section>
        </section>
      </form>
    </li>`
  );
};

export default class NewFormView extends AbstractStatefulView {
  #datepicker = null;
  #destinations = null;
  #offers = null;

  constructor(trip = BLANK_TRIP, destinations, offers) {
    super();
    this._state = trip;
    this.#destinations = destinations;
    this.#offers = offers;

    this.#setInnerHandlers();
    this.#setDatepicker();
  }

  get template() {
    return createNewFormTemplate(this._state, this.#destinations, this.#offers);
  }

  reset = (trip) => {
    this.updateElement(
      trip,
    );
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setDatepicker();
    this.setSaveFormHandler(this._callback.saveForm);
    this.setDeleteClickHandler(this._callback.deleteClick);
  };

  setSaveFormHandler = (callback) => {
    this._callback.saveForm = callback;
    this.element.querySelector('form').
      addEventListener('submit', this.#saveFormHandler);
  };

  setOffersChangeHandler = () => {
    // this._callback.offersChange = callback;
    if (this.element.querySelector('.event__available-offers'))
      this.element.querySelector('.event__available-offers').addEventListener('change', this.#offersChangeHandler);
  };

  #offersChangeHandler = (evt) => {
    const offerId = Number(evt.target.id.slice(-1));
    if (evt.target.checked === true) {
      this._state.offers.push(offerId);
    } else {
      const newState = this._state.offers.filter(function(f) { return f !== offerId});
      this._state.offers = newState;
    }

    console.log(this._state.offers)
    // const find = this._state.offer.find((item) => item.title === name).selected === !this._state.offer.find((item) => item.title === name).selected;
  };

  removeElement = () => {
    super.removeElement();

    if (this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  };

  #saveFormHandler = (evt) => {
    evt.preventDefault();
    this._callback.saveForm(this._state);
  };

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
  };

  #setDatepicker = () => {
    this.#datepicker = flatpickr(
      this.element.querySelector('.event__input--time[name="event-start-time"]'),
      {
        dateFormat: 'd/m/Y H:i',
        defaultDate: this._state.dateFrom,
        onChange: this.#dateStartChangeHandler,
      },
    );

    this.#datepicker = flatpickr(
      this.element.querySelector('.event__input--time[name="event-end-time"]'),
      {
        dateFormat: 'd/m/Y H:i',
        defaultDate: this._state.dateTo,
        onChange: this.#dateEndChangeHandler,
      },
    );
  };

  #dateStartChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #dateEndChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#cityNameChanged);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typePointChanged);
  };

  #cityNameChanged = (evt) => {
    const serverDestinationObject = this.#destinations.find((element) => element.name === evt.target.value);
    this.updateElement({
      destination: {
        name: evt.target.value,
        description: serverDestinationObject.description,
        pictures: serverDestinationObject.pictures,
      },
    });
  };

  #typePointChanged = (evt) => {
    evt.preventDefault();
    this._state.offers = [];
    this.updateElement({
      type: evt.target.value,
    });
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(this._state);
  };
}
