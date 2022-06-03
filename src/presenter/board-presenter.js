import InfoView from '../view/trip-info';
import SortView from '../view/sort';
import EmptyView from '../view/empty';
import TripEventsListView from '../view/trip-events-list';
import TripPresenter from './trip-presenter';
import {render, RenderPosition, remove} from '../framework/render';
import {updateItem, sortPrice, sortTime, filter} from '../utils';
import {SortType, UpdateType, UserAction, FilterType} from '../const';

export default class BoardPresenter {
  #tripsModel = null;
  #boardContainer = null;
  #tripControls = null;
  #tripControlsFilters = null;
  #tripEvents = null;
  #tripEventsList = null;
  #filterModel = null;

  #sortComponent = null;
  #emptyComponent = new EmptyView();
  #listComponent = new TripEventsListView();

  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.EVERYTHING;
  #tripPresenter = new Map();

  constructor(boardContainer, tripsModel, filterModel) {
    this.#boardContainer = boardContainer;
    this.#tripsModel = tripsModel;
    this.#filterModel = filterModel;

    this.#tripsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get trips() {
    this.#filterType = this.#filterModel.filter;
    const trips = this.#tripsModel.trips;
    const filteredTrips = filter[this.#filterType](trips);

    switch (this.#currentSortType) {
      case SortType.PRICE:
        return filteredTrips.sort(sortPrice);
      case SortType.TIME:
        return filteredTrips.sort(sortTime);
      case SortType.DEFAULT:
        return filteredTrips;
    }
    return this.#tripsModel.trips;
  }

  init = () => {
    this.#renderBoard();
  };

  #renderEventsList = () => {
    render(this.#listComponent, this.#tripEvents);
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#tripEvents, RenderPosition.AFTERBEGIN);
  };

  #renderEmpty = () => {
    render(this.#emptyComponent, this.#tripEvents);
  };

  #renderTrip = (trip) => {
    const tripPresenter = new TripPresenter(
      this.#tripEventsList,
      this.#handleViewAction,
      this.#handleModeChange,
    );
    tripPresenter.init(trip);
    this.#tripPresenter.set(trip.id, tripPresenter);
  };

  #renderTrips = () => {
    if (!(document.contains(document.querySelector('.trip-events__list')))) {
      this.#renderEventsList();
    }
    this.#tripEventsList = this.#tripEvents.querySelector('.trip-events__list');
    for (let i = 0; i < this.trips.length; i++) {
      this.#renderTrip(this.trips[i]);
    }
  };

  #renderBoard = () => {
    this.#tripControls = this.#boardContainer.querySelector('.trip-main');
    this.#tripControlsFilters = this.#tripControls.querySelector('.trip-controls__filters');
    this.#tripEvents = this.#boardContainer.querySelector('.trip-events');

    if (this.trips.length === 0) {
      this.#renderEmpty();
      return;
    }

    render(new InfoView(this.trips), this.#tripControls, RenderPosition.AFTERBEGIN);
    this.#renderSort();
    this.#renderTrips();
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_TRIP:
        this.#tripsModel.updateTrip(updateType, update);
        break;
      case UserAction.ADD_TRIP:
        this.#tripsModel.addTrip(updateType, update);
        break;
      case UserAction.DELETE_TRIP:
        this.#tripsModel.deleteTrip(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#tripPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderSort();
        if (this.trips.length === 0) {
          this.#renderEmpty();
        } else {
          this.#renderTrips();
        }
        break;
      case UpdateType.MAJOR:
        this.#clearBoard();
        this.#renderSort();
        if (this.trips.length === 0) {
          this.#renderEmpty();
        } else {
          this.#renderTrips();
        }
        break;
    }
  };

  #handleTripChange = (updatedTrip) => {
    this.trips = updateItem(this.trips, updatedTrip);
    this.#tripPresenter.get(updatedTrip.id).init(updatedTrip);
  };

  #handleModeChange = () => {
    this.#tripPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearTripList();
    this.#renderTrips();
  };

  #clearTripList = () => {
    this.#tripPresenter.forEach((presenter) => presenter.destroy());
    this.#tripPresenter.clear();
  };

  #clearBoard = () => {
    this.#tripPresenter.forEach((presenter) => presenter.destroy());
    this.#tripPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#emptyComponent);
    this.#currentSortType = SortType.DEFAULT;
  };
}
