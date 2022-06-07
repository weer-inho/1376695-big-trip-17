import {offers} from '../mock/data';
import Observable from '../framework/observable';

export default class TripsModel extends Observable {
  #tripsApiService = null;
  #trips = [];

  constructor(tripsApiService) {
    super();
    this.#tripsApiService = tripsApiService;
  }

  get trips() {
    return this.#trips;
  }

  init = async () => {
    try {
      const trips = await this.#tripsApiService.trips;
      this.#trips = trips.map(this.#adaptToClient);
    } catch (err) {
      this.#trips = [];
    }

    console.log(this.#trips);
  };

  updateTrip = (updateType, update) => {
    const index = this.#trips.findIndex((trip) => trip.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting trip');
    }

    this.#trips = [
      ...this.#trips.slice(0, index),
      update,
      ...this.#trips.slice(index+1)
    ];

    this._notify(updateType, update);
  };

  addTrip = (updateType, update) => {
    this.#trips = [
      update,
      ...this.#trips,
    ];

    this._notify(updateType, update);
  };

  deleteTrip = (updateType, update) => {
    const index = this.#trips.findIndex((trip) => trip.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting trip');
    }

    this.#trips = [
      ...this.#trips.slice(0, index),
      ...this.#trips.slice(index + 1),
    ];

    this._notify(updateType);
  };

  #adaptToClient = (trip) => {
    const adaptedTrip = {
      ...trip,
      dateFrom: trip['date_from'],
      dateTo: trip['date_to'],
      basePrice: trip['base_price'],
      isFavorite: trip['is_favorite'],
      offers: offers[trip.type],
    };

    delete adaptedTrip['date_from'];
    delete adaptedTrip['date_to'];
    delete adaptedTrip['base_price'];
    delete adaptedTrip['is_favorite'];

    return adaptedTrip;
  };
}
