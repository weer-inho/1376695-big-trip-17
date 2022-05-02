import BoardPresenter from './presenter/board-presenter';
import {generatePoint} from './mock/point';
import TripsModel from './model/trips-model';

const tripsModel = new TripsModel();

const body = document.querySelector('.page-body');

const boardPresenter = new BoardPresenter();
boardPresenter.init(body);
