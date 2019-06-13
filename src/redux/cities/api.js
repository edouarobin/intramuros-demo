// @flow

import request from 'superagent';

import ENV from 'Intramuros/src/environment';

export const getCities: () => ApiCityType = () =>
  request.get(`${ENV.API_URL}/locations/cities`).then(res => res.body);
