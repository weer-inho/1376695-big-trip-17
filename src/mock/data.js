import {getRandomInteger} from '../utils';

export const description = [
  'Families pleasant observe hoped led',
  'Temper discovery family great remaining message enjoy seemed cause order extent sincerity stanhill child fulfilled son',
  'Middletons poor put if share fortune exercise excuse. Conveying determine limited impossible daughters passage had above respect',
  'Change minuter margaret years place whom remarkably should piqued interest demesne fulfilled entirely',
  'Advantages order something winding friends reached defective favour invited difficult roof abilities declared applauded.',
  'Elegance had furnished which whatever surrounded appearance spot jokes manor aware understood order have lose.',
  'Talked chapter pain felicity direct year felt busy admire another.',
  'Those children beloved distrusts humanity offices dashwoods walls.',
];

export const cities = [
  'Bangkok',
  'Paris',
  'London',
  'Dubai',
  'Singapore',
  'Kuala Lumpur',
  'New York',
  'Tokyo',
];

export const offerTypes = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

export const offers = {
  'taxi': [
    {
      'id' : 1,
      'title': 'Switch to comfort',
      'price': getRandomInteger(0, 100),
      'selected' : Boolean(getRandomInteger(0, 1)),
    }, {
      'id' : 2,
      'title': 'Choose the radio station',
      'price': getRandomInteger(0, 100),
      'selected' : Boolean(getRandomInteger(0, 1))
    }
  ],
  'check-in': [],
  'train': [
    {
      'id' : 1,
      'title': 'Switch to comfort',
      'price': getRandomInteger(0, 100),
      'selected' : Boolean(getRandomInteger(0, 1))
    }, {
      'id' : 2,
      'title': 'Add meal',
      'price': getRandomInteger(0, 100),
      'selected' : Boolean(getRandomInteger(0, 1))
    }, {
      'id' : 3,
      'title': 'Choose seats',
      'price': getRandomInteger(0, 100),
      'selected' : Boolean(getRandomInteger(0, 1))
    }
  ],
  'ship': [
    {
      'id' : 1,
      'title': 'Travel by train',
      'price': getRandomInteger(0, 100),
      'selected' : Boolean(getRandomInteger(0, 1))
    }
  ],
  'drive': [
    {
      'id' : 1,
      'title': 'Choose seats',
      'price': getRandomInteger(0, 100),
      'selected' : Boolean(getRandomInteger(0, 1))
    }, {
      'id' : 2,
      'title': 'Choose the radio station',
      'price': getRandomInteger(0, 100),
      'selected' : Boolean(getRandomInteger(0, 1))
    }, {
      'id' : 3,
      'title': 'Switch to comfort',
      'price': getRandomInteger(0, 100),
      'selected' : Boolean(getRandomInteger(0, 1))
    }
  ],
  'flight': [
    {
      'id' : 1,
      'title': 'Switch to comfort',
      'price': getRandomInteger(0, 100),
      'selected' : Boolean(getRandomInteger(0, 1))
    }, {
      'id' : 2,
      'title': 'Add meal',
      'price': getRandomInteger(0, 100),
      'selected' : Boolean(getRandomInteger(0, 1))
    }, {
      'id' : 3,
      'title': 'Choose seats',
      'price': getRandomInteger(0, 100),
      'selected' : Boolean(getRandomInteger(0, 1))
    }, {
      'id' : 4,
      'title': 'Add luggage',
      'price': getRandomInteger(0, 100),
      'selected' : Boolean(getRandomInteger(0, 1))
    }
  ],
  'bus': [
    {
      'id' : 1,
      'title': 'Switch to comfort',
      'price': getRandomInteger(0, 100),
      'selected' : Boolean(getRandomInteger(0, 1))
    }, {
      'id' : 2,
      'title': 'Add meal',
      'price': getRandomInteger(0, 100),
      'selected' : Boolean(getRandomInteger(0, 1))
    }
  ],
  'sightseeing': [
    {
      'id' : 1,
      'title': 'Add meal',
      'price': getRandomInteger(0, 100),
      'selected' : Boolean(getRandomInteger(0, 1))
    }
  ],
  'restaurant': [
    {
      'id' : 1,
      'title': 'Choose seats',
      'price': getRandomInteger(0, 100),
      'selected' : Boolean(getRandomInteger(0, 1))
    }
  ],
};
