import {generatePoint} from '../mock/point';

export default class TripsModel {
  #trips = Array.from({length: 5}, generatePoint);

  get trips() {
    return this.#trips;
  }
}
