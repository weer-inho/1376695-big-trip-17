import {nanoid} from 'nanoid';
import dayjs from 'dayjs';
import {description, cities, offerTypes, offers} from './data';
import {getRandomInteger} from '../utils';

export const generatePictures = () => ([
  {
    src: `https://picsum.photos/id/${getRandomInteger(1, 1000)}/300/200`,
    description: 'Event Photo'
  },
  {
    src: `https://picsum.photos/id/${getRandomInteger(1, 1000)}/300/200`,
    description: 'Event Photo'
  },
  {
    src: `https://picsum.photos/id/${getRandomInteger(1, 1000)}/300/200`,
    description: 'Event Photo'
  },
  {
    src: `https://picsum.photos/id/${getRandomInteger(1, 1000)}/300/200`,
    description: 'Event Photo'
  },
  {
    src: `https://picsum.photos/id/${getRandomInteger(1, 1000)}/300/200`,
    description: 'Event Photo'
  },
]);

export const generateDestination = () => ({
  destination: description[getRandomInteger(1, description.length)],
  name: cities[getRandomInteger(1, cities.length)],
  pictures: generatePictures(),
});

export const generatePoint = () => {
  const typePoint =  offerTypes[getRandomInteger(1, offerTypes.length)];

  return {
    basePrice: getRandomInteger(500, 10000),
    dateFrom: dayjs()/*.add(- Math.floor(Math.random()*10000), 'minute')*/.toDate(),
    dateTo: dayjs().add(+ Math.floor(Math.random()*10000), 'minute').toDate(),
    destination: generateDestination(),
    id: nanoid(),
    isFavorite: getRandomInteger(0,1),
    type: typePoint,
    offer: offers[typePoint],
  };
};
