import {replace, render, remove} from '../framework/render';
import {UserAction, UpdateType} from '../const';
import RoutePointView from '../view/route-point';
import NewFormView from '../view/new-form';

const Mode = {
  'DEFAULT': 'DEFAULT',
  'EDITING': 'EDITING',
};

export default class TripPresenter {
  #tripListContainer = null;
  #tripComponent = null;
  #tripEditComponent = null;
  #trip = null;
  #changeData = null;
  #changeMode = null;
  #destinations = null;

  #mode = Mode.DEFAULT;

  constructor(tripListContainer, changeData, changeMode, destinations) {
    this.#tripListContainer = tripListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
    this.#destinations = destinations;
  }

  init = (trip) => {
    this.#trip = trip;

    const prevTripComponent = this.#tripComponent;
    const prevTripEditComponent = this.#tripEditComponent;

    this.#tripComponent = new RoutePointView(trip);
    this.#tripEditComponent = new NewFormView(trip, this.#destinations);

    this.#tripComponent.setEditClickHandler(this.#handleEditClick);
    this.#tripComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#tripEditComponent.setSaveFormHandler(this.#handleSaveForm);
    this.#tripEditComponent.setDeleteClickHandler(this.#handleDeleteClick);
    this.#tripEditComponent.setOffersChangeHandler();

    if (prevTripComponent === null || prevTripEditComponent === null) {
      render(this.#tripComponent, this.#tripListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#tripComponent, prevTripComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#tripComponent, prevTripEditComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevTripComponent);
    remove(prevTripEditComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToRoute();
    }
  };

  setSaving = () => {
    if (this.#mode === Mode.EDITING) {
      this.#tripEditComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  };

  setDeleting = () => {
    if (this.#mode === Mode.EDITING) {
      this.#tripEditComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  };

  destroy = () => {
    remove(this.#tripComponent);
    remove(this.#tripEditComponent);
  };

  setAborting = () => {
    if (this.#mode === Mode.DEFAULT) {
      this.#tripComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#tripEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#tripEditComponent.shake(resetFormState);
  };

  #replaceRouteToForm = () => {
    replace(this.#tripEditComponent, this.#tripComponent);
    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToRoute = () => {
    replace(this.#tripComponent, this.#tripEditComponent);
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#mode = Mode.DEFAULT;
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToRoute();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #handleDeleteClick = (trip) => {
    this.#changeData(
      UserAction.DELETE_TRIP,
      UpdateType.MINOR,
      trip
    );
  };

  #handleEditClick = () => {
    this.#replaceRouteToForm();
  };

  #handleSaveForm = (trip) => {
    this.#changeData(
      UserAction.UPDATE_TRIP,
      UpdateType.MINOR,
      trip,
    );
  };

  #handleFavoriteClick = () => {
    this.#changeData(
      UserAction.UPDATE_TRIP,
      UpdateType.MINOR,
      {...this.#trip, isFavorite: !this.#trip.isFavorite},
    );
  };
}
