import FilterView from '../view/filters';
import InfoView from '../view/trip-info';
import SortView from '../view/sort';
import EmptyView from '../view/empty';
import RoutePointView from '../view/route-point';
import NewFormView from '../view/new-form';
import TripEventsListView from '../view/trip-events-list';
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
    const tripEditComponent = new NewFormView(trip);
    const tripComponent = new RoutePointView(trip);

    const replaceRouteToForm = () => {
      this.#tripEventsList.replaceChild(tripEditComponent.element, tripComponent.element);
    };

    const replaceFormToRoute = () => {
      this.#tripEventsList.replaceChild(tripComponent.element, tripEditComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToRoute();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    tripComponent.setEditClickHandler(() => {
      replaceRouteToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    tripEditComponent.setSaveFormHandler(() => {
      replaceFormToRoute();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(tripComponent, this.#tripEventsList);
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
}
