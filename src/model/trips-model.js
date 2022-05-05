import {generatePoint} from '../mock/point';

export default class TripsModel {
  #trips = Array.from({length: 22}, generatePoint);

  get trips() {
    return this.#trips;
  }
}
