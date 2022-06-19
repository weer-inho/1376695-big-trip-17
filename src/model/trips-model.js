import {offers} from '../mock/data';
import Observable from '../framework/observable';
import {UpdateType} from '../const';

export default class TripsModel extends Observable {
  #tripsApiService = null;
  #trips = [];
  #offers = [];
  #destinations = [];

  constructor(tripsApiService) {
    super();
    this.#tripsApiService = tripsApiService;
  }

  get trips() {
    return this.#trips;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  init = async () => {
    try {
      const trips = await this.#tripsApiService.trips;
      this.#trips = trips.map(this.#adaptToClient);
      this.#offers = await this.#tripsApiService.serverOffers;
      this.#destinations = await this.#tripsApiService.serverDestinations;
    } catch (err) {
      this.#trips = [];
      this.#destinations = [];
      this.#offers = [];
    }

    this._notify(UpdateType.INIT);
  };

  updateTrip = async (updateType, update) => {
    const index = this.#trips.findIndex((trip) => trip.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting trip');
    }

    try {
      const response = await this.#tripsApiService.updateTrip(update);
      const updatedTrip = this.#adaptToClient(response);
      this.#trips = [
        ...this.#trips.slice(0, index),
        updatedTrip,
        ...this.#trips.slice(index + 1),
      ];
      this._notify(updateType, update);
    } catch (err) {
      throw new Error('Can\'t update trip');
    }
  };

  addTrip = async (updateType, update) => {
    try {
      const response = await this.#tripsApiService.addTrip(update);
      const newTrip = this.#adaptToClient(response);
      this.#trips = [newTrip, ...this.#trips];
      this._notify(updateType, newTrip);
    } catch(err) {
      throw new Error('Can\'t add trip');
    }
  };

  deleteTrip = async (updateType, update) => {
    const index = this.#trips.findIndex((trip) => trip.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting trip');
    }

    try {
      await this.#tripsApiService.deleteTrip(update);
      this.#trips = [
        ...this.#trips.slice(0, index),
        ...this.#trips.slice(index + 1),
      ];
      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\'t delete trip');
    }
  };

  #adaptToClient = (trip) => {
    const adaptedTrip = {
      ...trip,
      dateFrom: trip['date_from'],
      dateTo: trip['date_to'],
      basePrice: trip['base_price'],
      isFavorite: trip['is_favorite'],
      offer: offers[trip.type],
    };

    delete adaptedTrip['date_from'];
    delete adaptedTrip['date_to'];
    delete adaptedTrip['base_price'];
    delete adaptedTrip['is_favorite'];

    return adaptedTrip;
  };
}
