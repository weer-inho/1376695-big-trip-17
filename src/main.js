import BoardPresenter from './presenter/board-presenter';
import TripsModel from './model/trips-model';

const tripsModel = new TripsModel();
const body = document.querySelector('.page-body');
const boardPresenter = new BoardPresenter(body, tripsModel);
boardPresenter.init();
