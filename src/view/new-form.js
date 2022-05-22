import AbstractView from '../framework/view/abstract-view';
import dayjs from 'dayjs';

const BLANK_TRIP = {
  'basePrice': 1653,
  'dateFrom': '2022-05-09T13:36:02.139Z',
  'dateTo': '2022-05-15T03:43:02.139Z',
  'destination': {
    'destinationDescription': 'Middletons poor put if share fortune exercise excuse. Conveying determine limited impossible daughters passage had above respect',
    'name': 'Tokyo',
    'pictures': [
      {
        'src': 'https://picsum.photos/id/883/300/200',
        'description': 'Event Photo'
      },
      {
        'src': 'https://picsum.photos/id/958/300/200',
        'description': 'Event Photo'
      },
      {
        'src': 'https://picsum.photos/id/498/300/200',
        'description': 'Event Photo'
      },
      {
        'src': 'https://picsum.photos/id/299/300/200',
        'description': 'Event Photo'
      },
      {
        'src': 'https://picsum.photos/id/340/300/200',
        'description': 'Event Photo'
      }
    ]
  },
  'id': '3elIVoOMRAfaTa4bdg_MH',
  'isFavorite': 1,
  'type': 'drive',
  'offer': [
    {
      'id': 1,
      'title': 'Choose seats',
      'price': 19,
      'selected': true
    },
    {
      'id': 2,
      'title': 'Choose the radio station',
      'price': 50,
      'selected': true
    },
    {
      'id': 3,
      'title': 'Switch to comfort',
      'price': 21,
      'selected': true
    }
  ]
};

const createEventOffers = (offers) => (`<section class='event__section  event__section--offers'>
  ${(offers.length === 0) ? '' : `
    <h3 class='event__section-title  event__section-title--offers'>Offers</h3>
    <div class='event__available-offers'>
      ${offers.map((offer) => `<div class='event__offer-selector'>
        <input class='event__offer-checkbox  visually-hidden' id='event-offer' type='checkbox' name='event-offer-${offer.id}'
        ${(offer.selected) ? 'checked' : ''}>
        <label class='event__offer-label' for='event-offer-${offer.id}'>
          <span class='event__offer-title'>${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class='event__offer-price'>${offer.price}</span>
        </label>
      </div>`).join('')}
    </div>`}
  </section>`
);

const createEventPhotos = (photos) => (`
${photos.map((photo) => `<img class='event__photo' src='${photo.src}' alt='${photos.destination}'>`)}
`);

const createNewFormTemplate = (trip) => {
  const {type, destination, dateFrom, dateTo, basePrice, offer} = trip;

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
                  <input id='event-type-taxi-1' class='event__type-input  visually-hidden' type='radio' name='event-type' value='taxi'>
                  <label class='event__type-label  event__type-label--taxi' for='event-type-taxi-1'>Taxi</label>
                </div>

                <div class='event__type-item'>
                  <input id='event-type-bus-1' class='event__type-input  visually-hidden' type='radio' name='event-type' value='bus'>
                  <label class='event__type-label  event__type-label--bus' for='event-type-bus-1'>Bus</label>
                </div>

                <div class='event__type-item'>
                  <input id='event-type-train-1' class='event__type-input  visually-hidden' type='radio' name='event-type' value='train'>
                  <label class='event__type-label  event__type-label--train' for='event-type-train-1'>Train</label>
                </div>

                <div class='event__type-item'>
                  <input id='event-type-ship-1' class='event__type-input  visually-hidden' type='radio' name='event-type' value='ship'>
                  <label class='event__type-label  event__type-label--ship' for='event-type-ship-1'>Ship</label>
                </div>

                <div class='event__type-item'>
                  <input id='event-type-drive-1' class='event__type-input  visually-hidden' type='radio' name='event-type' value='drive'>
                  <label class='event__type-label  event__type-label--drive' for='event-type-drive-1'>Drive</label>
                </div>

                <div class='event__type-item'>
                  <input id='event-type-flight-1' class='event__type-input  visually-hidden' type='radio' name='event-type' value='flight' checked>
                  <label class='event__type-label  event__type-label--flight' for='event-type-flight-1'>Flight</label>
                </div>

                <div class='event__type-item'>
                  <input id='event-type-check-in-1' class='event__type-input  visually-hidden' type='radio' name='event-type' value='check-in'>
                  <label class='event__type-label  event__type-label--check-in' for='event-type-check-in-1'>Check-in</label>
                </div>

                <div class='event__type-item'>
                  <input id='event-type-sightseeing-1' class='event__type-input  visually-hidden' type='radio' name='event-type' value='sightseeing'>
                  <label class='event__type-label  event__type-label--sightseeing' for='event-type-sightseeing-1'>Sightseeing</label>
                </div>

                <div class='event__type-item'>
                  <input id='event-type-restaurant-1' class='event__type-input  visually-hidden' type='radio' name='event-type' value='restaurant'>
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
              <option value='Amsterdam'></option>
              <option value='Geneva'></option>
              <option value='Chamonix'></option>
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
            <input class='event__input  event__input--price' id='event-price-1' type='text' name='event-price' value=''>
          </div>

          <button class='event__save-btn  btn  btn--blue' type='submit'>Save</button>
          <button class='event__reset-btn' type='reset'>Cancel</button>
        </header>
        <section class='event__details'>
          <section class='event__section  event__section--offers'>
              ${createEventOffers(offer)}
          </section>

          <section class='event__section  event__section--destination'>
            <h3 class='event__section-title  event__section-title--destination'>Destination</h3>
            <p class='event__destination-description'>
              ${destination.destinationDescription}
            </p>

            <div class='event__photos-container'>
              <div class='event__photos-tape'>
                  ${createEventPhotos(destination.pictures)}
              </div>
            </div>
          </section>
        </section>
      </form>
    </li>`
  );
};

export default class NewFormView extends AbstractView {
  #trip = null;

  constructor(trip = BLANK_TRIP) {
    super();
    this.#trip = trip;
  }

  get template() {
    return createNewFormTemplate(this.#trip);
  }

  setSaveFormHandler = (callback) => {
    this._callback.saveForm = callback;
    this.element.querySelector('form').
      addEventListener('submit', this.#saveFormHandler);
  };

  #saveFormHandler = (evt) => {
    evt.preventDefault();
    this._callback.saveForm(this.#trip);
  };
}
