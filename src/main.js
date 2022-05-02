import BoardPresenter from './presenter/board-presenter';
import {generatePoint} from './mock/point';

console.log(generatePoint());

const body = document.querySelector('.page-body');

const boardPresenter = new BoardPresenter();
boardPresenter.init(body);
