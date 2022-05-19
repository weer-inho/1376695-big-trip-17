import FilterView from '../view/filters';
import InfoView from '../view/trip-info';
import SortView from '../view/sort';
import EmptyView from '../view/empty';
import TripEventsListView from '../view/trip-events-list';
import TripPresenter from './trip-presenter';
import {render, RenderPosition} from '../framework/render';

export default class BoardPresenter {
  #tripsModel = null;
  #boardTrips = null;
  #boardContainer = null;
  #tripControls = null;
  #tripControlsFilters = null;
  #tripEvents = null;
  #tripEventsList = null;

  #sortComponent = new SortView();
  #emptyComponent = new EmptyView();
  #filterComponent = new FilterView();
  #listComponent = new TripEventsListView();

  #tripPresenter = new Map();

  constructor(boardContainer, tripsModel) {
    this.#boardContainer = boardContainer;
    this.#tripsModel = tripsModel;
  }

  init = () => {
    this.#boardTrips = [...this.#tripsModel.trips];

    this.#renderBoard();
  };

  #renderEventsList = () => {
    render(this.#listComponent, this.#tripEvents);
  };

  #renderFilter = () => {
    render(this.#filterComponent, this.#tripControlsFilters);
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#tripEvents);
  };

  #renderEmpty = () => {
    render(this.#emptyComponent, this.#tripEvents);
  };

  #renderTrip = (trip) => {
    const tripPresenter = new TripPresenter(this.#tripEventsList);
    tripPresenter.init(trip);
    this.#tripPresenter.set(trip.id, tripPresenter);
  };

  #renderTrips = () => {
    this.#renderEventsList();
    this.#tripEventsList = this.#tripEvents.querySelector('.trip-events__list');
    for (let i = 0; i < this.#boardTrips.length; i++) {
      this.#renderTrip(this.#boardTrips[i]);
    }
  };

  #renderBoard = () => {
    this.#tripControls = this.#boardContainer.querySelector('.trip-main');
    this.#tripControlsFilters = this.#tripControls.querySelector('.trip-controls__filters');
    this.#tripEvents = this.#boardContainer.querySelector('.trip-events');

    this.#renderFilter();

    if (this.#boardTrips.length === 0) {
      this.#renderEmpty();
      return;
    }
    render(new InfoView(this.#boardTrips), this.#tripControls, RenderPosition.AFTERBEGIN);
    this.#renderSort();
    this.#renderTrips();
  };

  #clearTaskList = () => {
    this.#tripPresenter.forEach((presenter) => presenter.destroy());
    this.#tripPresenter.clear();
  };
}
