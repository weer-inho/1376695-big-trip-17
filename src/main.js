import BoardPresenter from './presenter/board-presenter';

const body = document.querySelector('.page-body');

const boardPresenter = new BoardPresenter();
boardPresenter.init(body);
