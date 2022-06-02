import BoardPresenter from './presenter/board-presenter';
import FilterPresenter from './presenter/filter-presenter';
import TripsModel from './model/trips-model';
import FilterModel from './model/filter-model';

const filterModel = new FilterModel();
const tripsModel = new TripsModel();

const body = document.querySelector('.page-body');

const filterPresenter = new FilterPresenter(body, filterModel, tripsModel);
const boardPresenter = new BoardPresenter(body, tripsModel);

filterPresenter.init();
boardPresenter.init();
