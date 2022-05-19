import {replace, render} from '../framework/render';
import RoutePointView from '../view/route-point';
import NewFormView from '../view/new-form';

export default class TripPresenter {
  #tripListContainer = null;
  #tripComponent = null;
  #tripEditComponent = null;
  #trip = null;

  constructor(tripListContainer) {
    this.#tripListContainer = tripListContainer;
  }

  init = (trip) => {
    this.#trip = trip;

    const prevTripComponent = this.#tripComponent;
    const prevTripEditComponent = this.#tripEditComponent;

    this.#tripComponent = new RoutePointView(trip);
    this.#tripEditComponent = new NewFormView(trip);

    this.#tripComponent.setEditClickHandler(this.#handleEditClick);
    this.#tripEditComponent.setSaveFormHandler(this.#handleSaveForm);

    if (prevTripComponent === null || prevTripEditComponent === null) {
      render(this.#tripComponent, this.#tripListContainer);
      return;
    }

    if (this.#tripListContainer.contains(prevTripComponent.element)) {
      replace(this.#tripComponent, prevTripComponent);
    }

    if (this.#tripListContainer.contains(prevTripEditComponent.element)) {
      replace(this.#tripEditComponent, prevTripEditComponent);
    }

    remove(prevTripComponent);
    remove(prevTripEditComponent);

    render(this.#tripComponent, this.#tripListContainer);
  };

  destroy = () => {
    remove(this.#tripComponent);
    remove(this.#tripEditComponent);
  };

  #replaceRouteToForm = () => {
    replace(this.#tripEditComponent, this.#tripComponent);
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #replaceFormToRoute = () => {
    replace(this.#tripComponent, this.#tripEditComponent);
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToRoute();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #handleEditClick = () => {
    this.#replaceRouteToForm();
  };

  #handleSaveForm = () => {
    this.#replaceFormToRoute();
  };
}
