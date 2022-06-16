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
    },
    {
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
    },
    {
      'id' : 2,
      'title': 'Add meal',
      'price': getRandomInteger(0, 100),
      'selected' : Boolean(getRandomInteger(0, 1))
    },
    {
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
    },
    {
      'id' : 2,
      'title': 'Choose the radio station',
      'price': getRandomInteger(0, 100),
      'selected' : Boolean(getRandomInteger(0, 1))
    },
    {
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
    },
    {
      'id' : 2,
      'title': 'Add meal',
      'price': getRandomInteger(0, 100),
      'selected' : Boolean(getRandomInteger(0, 1))
    },
    {
      'id' : 3,
      'title': 'Choose seats',
      'price': getRandomInteger(0, 100),
      'selected' : Boolean(getRandomInteger(0, 1))
    },
    {
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
    },
    {
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

export const BLANK_TRIP = {
  'id': '0',
  'type': 'drive',
  'destination': {
    'name': 'Amsterdam',
    'description': 'Amsterdam, a true asian pearl, middle-eastern paradise.',
    'pictures': [
      {
        'src': 'http://picsum.photos/300/200?r=0.28199525209031395',
        'description': 'Amsterdam kindergarten'
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.5060534212671977',
        'description': 'Amsterdam parliament building'
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.7306487415267351',
        'description': 'Amsterdam kindergarten'
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.3019096014896243',
        'description': 'Amsterdam street market'
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.3500851895159094',
        'description': 'Amsterdam park'
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.8134527657175938',
        'description': 'Amsterdam embankment'
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.3725166438245062',
        'description': 'Amsterdam city centre'
      }
    ]
  },
  'offers': [
    1,
    2,
    3
  ],
  'offer': [
    {
      'id': 1,
      'title': 'Choose seats',
      'price': 19,
      'selected': false
    },
    {
      'id': 2,
      'title': 'Choose the radio station',
      'price': 10,
      'selected': true
    },
    {
      'id': 3,
      'title': 'Switch to comfort',
      'price': 43,
      'selected': true
    }
  ],
  'dateFrom': '2022-06-06T21:00:00.000Z',
  'dateTo': '2022-06-07T13:14:49.289Z',
  'basePrice': 300,
  'isFavorite': false
};
