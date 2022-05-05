import {generatePoint} from '../mock/point';

export default class TripsModel {
  #trips = Array.from({length: 0}, generatePoint);

  get trips() {
    return this.#trips;
  }
}
