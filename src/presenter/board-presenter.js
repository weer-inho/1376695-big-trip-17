import FilterView from '../view/filters';
import InfoView from '../view/trip-info';
import SortView from '../view/sort';
import EmptyView from '../view/empty';
import TripEventsListView from '../view/trip-events-list';
import TripPresenter from './trip-presenter';
import {render, RenderPosition} from '../framework/render';
import {updateItem, sortPrice, sortTime} from '../utils';
import {SortType} from '../const';

export default class BoardPresenter {
  #tripsModel = null;
  #boardTrips = null;
  #sourcedBoardTrips = null;
  #boardContainer = null;
  #tripControls = null;
  #tripControlsFilters = null;
  #tripEvents = null;
  #tripEventsList = null;

  #sortComponent = new SortView();
  #emptyComponent = new EmptyView();
  #filterComponent = new FilterView();
  #listComponent = new TripEventsListView();

  #currentSortType = SortType.DEFAULT;
  #tripPresenter = new Map();

  constructor(boardContainer, tripsModel) {
    this.#boardContainer = boardContainer;
    this.#tripsModel = tripsModel;
  }

  init = () => {
    this.#boardTrips = [...this.#tripsModel.trips];
    this.#sourcedBoardTrips = [...this.#tripsModel.trips];

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
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderEmpty = () => {
    render(this.#emptyComponent, this.#tripEvents);
  };

  #renderTrip = (trip) => {
    const tripPresenter = new TripPresenter(this.#tripEventsList, this.#handleTripChange, this.#handleModeChange);
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

  #sortTrips = (sortType) => {
    switch (sortType) {
      case SortType.PRICE:
        this.#boardTrips.sort(sortPrice);
        break;
      case SortType.TIME:
        this.#boardTrips.sort(sortTime);
        break;
      case SortType.DEFAULT:
        this.#boardTrips = [...this.#sourcedBoardTrips];
        break;
      default:
    }
  };

  #handleTripChange = (updatedTrip) => {
    this.#boardTrips = updateItem(this.#boardTrips, updatedTrip);
    this.#tripPresenter.get(updatedTrip.id).init(updatedTrip);
  };

  #handleModeChange = () => {
    this.#tripPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortTrips(sortType);
    this.#clearTripList();
    this.#renderTrips();
    this.#currentSortType = sortType;
  };

  #clearTripList = () => {
    this.#tripPresenter.forEach((presenter) => presenter.destroy());
    this.#tripPresenter.clear();
  };
}
