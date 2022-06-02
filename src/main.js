import BoardPresenter from './presenter/board-presenter';
import TripsModel from './model/trips-model';
import FilterModel from './model/filter-model';

const filterModel = new FilterModel();
const tripsModel = new TripsModel();
const body = document.querySelector('.page-body');
const boardPresenter = new BoardPresenter(body, tripsModel);
boardPresenter.init();
