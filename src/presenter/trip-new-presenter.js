import {remove, render, RenderPosition} from '../framework/render.js';
import NewFormView from '../view/new-form-view';
import {UserAction, UpdateType} from '../const.js';
import {BLANK_TRIP} from '../const.js';

export default class TripNewPresenter {
  #tripListContainer = null;
  #changeData = null;
  #tripEditComponent = null;
  #destroyCallback = null;
  #destinations = null;

  constructor(tripListContainer, changeData, destinations) {
    this.#tripListContainer = tripListContainer;
    this.#changeData = changeData;
    this.#destinations = destinations;
  }

  init = (callback) => {
    this.#destroyCallback = callback;

    if (this.#tripEditComponent !== null) {
      return;
    }


    this.#tripEditComponent = new NewFormView(BLANK_TRIP, this.#destinations);
    this.#tripEditComponent.setSaveFormHandler(this.#handleFormSubmit);
    this.#tripEditComponent.setDeleteClickHandler(this.#handleDeleteClick);
    this.#tripEditComponent.setPriceChangeHandler();


    render(this.#tripEditComponent, this.#tripListContainer.querySelector('.trip-events__list'), RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  destroy = () => {
    if (this.#tripEditComponent === null) {
      return;
    }
    this.#destroyCallback?.();

    remove(this.#tripEditComponent);
    this.#tripEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  setSaving = () => {
    this.#tripEditComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  };

  setAborting = () => {
    const resetFormState = () => {
      this.#tripEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#tripEditComponent.shake(resetFormState);
  };

  #handleFormSubmit = (trip) => {
    this.#changeData(
      UserAction.ADD_TRIP,
      UpdateType.MINOR,
      trip
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
