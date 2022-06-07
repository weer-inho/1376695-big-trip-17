import ApiService from './framework/api-service';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class TripsApiService extends ApiService {
  get trips() {
    return this._load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  updateTrip = async (trip) => {
    const response = await this._load({
      url: `points/${trip.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(trip)),
      headers: new Headers({'Content-type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  };

  #adaptToServer = (trip) => {
    const adaptedTrip = {
      ...trip,
      'date_from': trip['dateFrom'],
      'date_to': trip['dateTo'],
      'base_price': trip['basePrice'],
      'is_favorite': trip['isFavorite'],
    };

    delete adaptedTrip['dateFrom'];
    delete adaptedTrip['dateTo'];
    delete adaptedTrip['basePrice'];
    delete adaptedTrip['isFavorite'];

    return adaptedTrip;
  };
}

