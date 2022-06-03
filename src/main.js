import BoardPresenter from './presenter/board-presenter';
import FilterPresenter from './presenter/filter-presenter';
import TripsModel from './model/trips-model';
import FilterModel from './model/filter-model';
import NewTripButtonView from './view/new-trip-button';
import {render} from './framework/render';

const filterModel = new FilterModel();
const tripsModel = new TripsModel();

const body = document.querySelector('.page-body');

const filterPresenter = new FilterPresenter(body, filterModel, tripsModel);
const boardPresenter = new BoardPresenter(body, tripsModel, filterModel);
const newTripButtonComponent = new NewTripButtonView();

render(newTripButtonComponent, body.querySelector('.trip-main'));

filterPresenter.init();
boardPresenter.init();
