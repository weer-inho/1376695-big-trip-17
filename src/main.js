import BoardPresenter from './presenter/board-presenter';
import FilterPresenter from './presenter/filter-presenter';
import TripsModel from './model/trips-model';
import FilterModel from './model/filter-model';
import NewTripButtonView from './view/new-trip-button';
import {render} from './framework/render';
import TripsApiService from './trips-api-service';

const END_POINT = 'https://17.ecmascript.pages.academy/big-trip';
const AUTHORIZATION = 'Basic Io1q8u1l5p4tyef';

const filterModel = new FilterModel();
const tripsModel = new TripsModel(new TripsApiService(END_POINT, AUTHORIZATION));

const body = document.querySelector('.page-body');

const filterPresenter = new FilterPresenter(body, filterModel, tripsModel);
const boardPresenter = new BoardPresenter(body, tripsModel, filterModel);
const newTripButtonComponent = new NewTripButtonView();

const handleNewTripFormClose = () => {
  newTripButtonComponent.element.disabled = false;
};

const handleNewTripButtonClick = () => {
  boardPresenter.createTrip(handleNewTripFormClose);
  newTripButtonComponent.element.disabled = true;
};

filterPresenter.init();
boardPresenter.init();
tripsModel.init().finally(() => {
  render(newTripButtonComponent, body.querySelector('.trip-main'));
  newTripButtonComponent.setClickHandler(handleNewTripButtonClick);
});
