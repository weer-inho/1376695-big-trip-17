import FilterView from '../view/filters';
import InfoView from '../view/trip-info';
import SortView from '../view/sort';
import RoutePointView from '../view/route-point';
import NewFormView from '../view/new-form';
import TripEventsListView from '../view/trip-events-list';
import {render, RenderPosition} from '../render';

export default class BoardPresenter {
  #tripsModel = null;
  #boardTrips = null;
  #boardContainer = null;
  #tripControls = null;
  #tripControlsFilters = null;
  #tripEvents = null;
  #tripEventsList = null;

  init = (boardContainer, tripsModel) => {
    this.#tripsModel = tripsModel;
    this.#boardTrips = [...this.#tripsModel.trips];

    this.#boardContainer = boardContainer;
    this.#tripControls = this.#boardContainer.querySelector('.trip-main');
    this.#tripControlsFilters = this.#tripControls.querySelector('.trip-controls__filters');
    this.#tripEvents = this.#boardContainer.querySelector('.trip-events');

    render(new InfoView(), this.#tripControls, RenderPosition.AFTERBEGIN);
    render(new FilterView(), this.#tripControlsFilters);
    render(new SortView(), this.#tripEvents);
    render(new TripEventsListView(), this.#tripEvents);
    this.#tripEventsList = this.#tripEvents.querySelector('.trip-events__list');

    for (let i = 1; i < this.#boardTrips.length; i++) {
      this.#renderTrip(this.#boardTrips[i]);
    }
  };

  #renderTrip = (trip) => {
    const tripComponent = new RoutePointView(trip);

    render(tripComponent, this.#tripEventsList);
  }
}
