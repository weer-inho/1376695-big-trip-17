export const SortType = {
  DEFAULT: 'default',
  PRICE: 'price',
  TIME: 'time',
};

export const UserAction = {
  UPDATE_TRIP: 'UPDATE_TRIP',
  ADD_TRIP: 'ADD_TRIP',
  DELETE_TRIP: 'DELETE_TRIP',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

export const BLANK_TRIP = {
  'id': '0',
  'type': 'bus',
  'destination': {
    'name': 'Oslo',
    'description': 'Oslo, is a beautiful city, with a beautiful old town, with an embankment of a mighty river as a centre of attraction.',
    'pictures': [
      {
        'src': 'http://picsum.photos/300/200?r=0.8750533234743478',
        'description': 'Oslo central station'
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.9572954093142938',
        'description': 'Oslo city centre'
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.3655219399703036',
        'description': 'Oslo kindergarten'
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.013707734337631061',
        'description': 'Oslo central station'
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.35937290956490875',
        'description': 'Oslo parliament building'
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.23182431683167581',
        'description': 'Oslo central station'
      }
    ]
  },
  'offers': [
    1,
    3,
    5
  ],
  'availableOffers': [
    {
      'type': 'taxi',
      'offers': [
        {
          'id': 1,
          'title': 'Upgrade to a business class',
          'price': 190
        },
        {
          'id': 2,
          'title': 'Choose the radio station',
          'price': 30
        },
        {
          'id': 3,
          'title': 'Choose temperature',
          'price': 170
        },
        {
          'id': 4,
          'title': 'Drive quickly, Im in a hurry',
          'price': 100
        },
        {
          'id': 5,
          'title': 'Drive slowly',
          'price': 110
        }
      ]
    },
    {
      'type': 'bus',
      'offers': [
        {
          'id': 1,
          'title': 'Infotainment system',
          'price': 50
        },
        {
          'id': 2,
          'title': 'Order meal',
          'price': 100
        },
        {
          'id': 3,
          'title': 'Choose seats',
          'price': 190
        }
      ]
    },
    {
      'type': 'train',
      'offers': [
        {
          'id': 1,
          'title': 'Book a taxi at the arrival point',
          'price': 110
        },
        {
          'id': 2,
          'title': 'Order a breakfast',
          'price': 80
        },
        {
          'id': 3,
          'title': 'Wake up at a certain time',
          'price': 140
        }
      ]
    },
    {
      'type': 'flight',
      'offers': [
        {
          'id': 1,
          'title': 'Choose meal',
          'price': 120
        },
        {
          'id': 2,
          'title': 'Choose seats',
          'price': 90
        },
        {
          'id': 3,
          'title': 'Upgrade to comfort class',
          'price': 120
        },
        {
          'id': 4,
          'title': 'Upgrade to business class',
          'price': 120
        },
        {
          'id': 5,
          'title': 'Add luggage',
          'price': 170
        },
        {
          'id': 6,
          'title': 'Business lounge',
          'price': 160
        }
      ]
    },
    {
      'type': 'check-in',
      'offers': [
        {
          'id': 1,
          'title': 'Choose the time of check-in',
          'price': 70
        },
        {
          'id': 2,
          'title': 'Choose the time of check-out',
          'price': 190
        },
        {
          'id': 3,
          'title': 'Add breakfast',
          'price': 110
        },
        {
          'id': 4,
          'title': 'Laundry',
          'price': 140
        },
        {
          'id': 5,
          'title': 'Order a meal from the restaurant',
          'price': 30
        }
      ]
    },
    {
      'type': 'sightseeing',
      'offers': []
    },
    {
      'type': 'ship',
      'offers': [
        {
          'id': 1,
          'title': 'Choose meal',
          'price': 130
        },
        {
          'id': 2,
          'title': 'Choose seats',
          'price': 160
        },
        {
          'id': 3,
          'title': 'Upgrade to comfort class',
          'price': 170
        },
        {
          'id': 4,
          'title': 'Upgrade to business class',
          'price': 150
        },
        {
          'id': 5,
          'title': 'Add luggage',
          'price': 100
        },
        {
          'id': 6,
          'title': 'Business lounge',
          'price': 40
        }
      ]
    },
    {
      'type': 'drive',
      'offers': [
        {
          'id': 1,
          'title': 'With automatic transmission',
          'price': 110
        },
        {
          'id': 2,
          'title': 'With air conditioning',
          'price': 180
        }
      ]
    },
    {
      'type': 'restaurant',
      'offers': [
        {
          'id': 1,
          'title': 'Choose live music',
          'price': 150
        },
        {
          'id': 2,
          'title': 'Choose VIP area',
          'price': 70
        }
      ]
    }
  ],
  'dateFrom': '2022-06-17T15:53:14.224Z',
  'dateTo': '2022-06-18T05:29:50.059Z',
  'basePrice': 900,
  'isFavorite': true
};
