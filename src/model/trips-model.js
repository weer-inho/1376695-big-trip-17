import {generatePoint} from '../mock/point';

export default class TripsModel {
  trips = Array.from({length: 4}, generatePoint);
  getTrips = () => this.trips;
}
