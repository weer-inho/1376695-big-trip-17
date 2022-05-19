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

    this.#tripComponent = new RoutePointView(trip);
    this.#tripEditComponent = new NewFormView(trip);

    this.#tripComponent.setEditClickHandler(this.#handleEditClick);
    this.#tripEditComponent.setSaveFormHandler(this.#handleSaveForm);

    render(this.#tripComponent, this.#tripListContainer);
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
