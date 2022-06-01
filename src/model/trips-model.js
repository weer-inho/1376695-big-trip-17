import {generatePoint} from '../mock/point';
import Observable from '../framework/observable';

export default class TripsModel extends Observable {
  #trips = Array.from({length: 5}, generatePoint);

  get trips() {
    return this.#trips;
  }
}
