import FilterView from './view/filters';
import InfoView from './view/trip-info';
import SortView from './view/sort';
import RoutePointView from './view/route-point';
import NewFormView from './view/new-form';
import TripEventsListView from './view/trip-events-list';
import {render, RenderPosition} from './render';

const body = document.querySelector('.page-body');
const tripControls = body.querySelector('.trip-main');
const tripControlsFilters = tripControls.querySelector('.trip-controls__filters');
const tripEvents = body.querySelector('.trip-events');

render(new InfoView(), tripControls, RenderPosition.AFTERBEGIN);
render(new FilterView(), tripControlsFilters);
render(new SortView(), tripEvents);
render(new TripEventsListView(), tripEvents);
const tripEventsList = tripEvents.querySelector('.trip-events__list');
render(new NewFormView(), tripEventsList);
render(new RoutePointView(), tripEventsList);
// console.log(tripEvents);

