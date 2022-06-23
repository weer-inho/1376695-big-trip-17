import InfoView from '../view/info-view';
import SortView from '../view/sort-view';
import EmptyView from '../view/empty-view';
import TripEventsListView from '../view/trip-events-list-view';
import TripPresenter from './trip-presenter';
import LoadingView from '../view/loading-view';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import {render, RenderPosition, remove} from '../framework/render';
import {updateItem, sortPrice, sortTime, sortDay, filter} from '../utils';
import {SortType, UpdateType, UserAction, FilterType} from '../const';
import TripNewPresenter from './trip-new-presenter';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class BoardPresenter {
  #tripsModel = null;
  #boardContainer = null;
  #tripControls = null;
  #tripControlsFilters = null;
  #tripEvents = null;
  #tripEventsList = null;
  #filterModel = null;

  #sortComponent = null;
  #tripNewPresenter = null;
  #listComponent = new TripEventsListView();
  #loadingComponent = new LoadingView();
  #uiBlocker = new UiBlocker(TimeLimit.LOWER_LIMIT, TimeLimit.UPPER_LIMIT);

  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.EVERYTHING;
  #tripPresenter = new Map();
  #isLoading = true;

  constructor(boardContainer, tripsModel, filterModel) {
    this.#boardContainer = boardContainer;
    this.#tripsModel = tripsModel;
    this.#filterModel = filterModel;


    this.#tripsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get destinations() {
    return this.#tripsModel.destinations;
  }

  get offers() {
    return this.#tripsModel.offers;
  }

  get trips() {
    this.#filterType = this.#filterModel.filter;
    const trips = this.#tripsModel.trips;
    const filteredTrips = filter[this.#filterType](trips);

    switch (this.#currentSortType) {
      case SortType.PRICE:
        return [...filteredTrips].sort(sortPrice);
      case SortType.TIME:
        return [...filteredTrips].sort(sortTime);
      case SortType.DEFAULT:
        return [...filteredTrips].sort(sortDay);
    }
    return this.#tripsModel.trips;
  }

  init = () => {
    this.#renderBoard();
  };

  createTrip = (callback) => {
    this.#currentSortType = SortType.DEFAULT;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#tripNewPresenter = new TripNewPresenter(this.#boardContainer, this.#handleViewAction, this.destinations);
    this.#tripNewPresenter.init(callback);
  };

  #renderEventsList = () => {
    render(this.#listComponent, this.#tripEvents);
  };

  #renderSort = () => {
    if (this.#sortComponent !== null) {
      this.#sortComponent = null;
      if (this.#boardContainer.querySelector('.trip-events__trip-sort')) {
        this.#boardContainer.querySelector('.trip-events__trip-sort').remove();
      }
    }
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#tripEvents, RenderPosition.AFTERBEGIN);
  };

  #renderEmpty = (filterType) => {
    render(new EmptyView(filterType), this.#tripEvents);
  };

  #renderTrip = (trip) => {
    const tripPresenter = new TripPresenter(
      this.#tripEventsList,
      this.#handleViewAction,
      this.#handleModeChange,
      this.destinations,
      this.offers
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

  #renderLoading = () => {
    render(this.#loadingComponent, this.#tripEvents, RenderPosition.AFTERBEGIN);
  };

  #renderInfoView = () => {
    render(new InfoView(this.trips), this.#tripControls, RenderPosition.AFTERBEGIN);
  };

  #renderBoard = () => {
    this.#tripControls = this.#boardContainer.querySelector('.trip-main');
    this.#tripControlsFilters = this.#tripControls.querySelector('.trip-controls__filters');
    this.#tripEvents = this.#boardContainer.querySelector('.trip-events');

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    this.#renderInfoView();
    this.#renderSort();
    this.#renderTrips();
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_TRIP:
        this.#tripPresenter.get(update.id).setSaving();
        try {
          await this.#tripsModel.updateTrip(updateType, update);
        } catch(err) {
          this.#tripPresenter.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_TRIP:
        this.#tripNewPresenter.setSaving();
        try {
          await this.#tripsModel.addTrip(updateType, update);
        } catch(err) {
          this.#tripNewPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_TRIP:
        this.#tripPresenter.get(update.id).setDeleting();
        try {
          await this.#tripsModel.deleteTrip(updateType, update);
        } catch(err) {
          this.#tripPresenter.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#tripPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderSort();

        this.#currentSortType = SortType.DEFAULT;
        if (this.trips.length === 0) {
          this.#renderEmpty(this.#filterType);
        } else {
          this.#renderTrips();
          this.#renderInfoView();
        }
        break;
      case UpdateType.MAJOR:
        this.#clearBoard();
        this.#renderSort();

        this.#currentSortType = SortType.DEFAULT;
        if (this.trips.length === 0) {
          this.#renderEmpty(this.#filterType);
        } else {
          this.#renderTrips();
          this.#renderInfoView();
        }
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
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
    this.#renderSort();
    this.#renderTrips();
  };

  #clearTripList = () => {
    this.#tripPresenter.forEach((presenter) => presenter.destroy());
    this.#tripPresenter.clear();
  };

  #clearBoard = () => {
    this.#tripPresenter.forEach((presenter) => presenter.destroy());
    this.#tripPresenter.clear();

    if (this.#boardContainer.querySelector('.trip-main__trip-info.trip-info')) {
      this.#boardContainer.querySelector('.trip-main__trip-info.trip-info').remove();
    }
    if (this.#boardContainer.querySelector('.trip-events__msg')) {
      this.#boardContainer.querySelector('.trip-events__msg').remove();
    }

    remove(this.#sortComponent);
    this.#currentSortType = SortType.DEFAULT;
  };
}
