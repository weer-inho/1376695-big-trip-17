import {replace, render, remove} from '../framework/render';
import RoutePointView from '../view/route-point';
import NewFormView from '../view/new-form';

export default class TripPresenter {
  #tripListContainer = null;
  #tripComponent = null;
  #tripEditComponent = null;
  #trip = null;
  #changeData = null;

  constructor(tripListContainer, changeData) {
    this.#tripListContainer = tripListContainer;
    this.#changeData = changeData;
  }

  init = (trip) => {
    this.#trip = trip;

    const prevTripComponent = this.#tripComponent;
    const prevTripEditComponent = this.#tripEditComponent;

    this.#tripComponent = new RoutePointView(trip);
    this.#tripEditComponent = new NewFormView(trip);

    this.#tripComponent.setEditClickHandler(this.#handleEditClick);
    this.#tripComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
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

  #handleSaveForm = (trip) => {
    this.#changeData(trip);
    this.#replaceFormToRoute();
  };

  #handleFavoriteClick = () => {
    this.#changeData({...this.#trip, isFavorite: !this.#trip.isFavorite});
  };
}
