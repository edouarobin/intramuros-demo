// @flow

import request from 'superagent';

import ENV from 'Intramuros/src/environment';

export const getAssos: () => ApiAssosType = () =>
  request.get(`${ENV.API_URL}/actors/associations/`).then(res => res.body);

export const getAssosFromCityId: (id: number) => ApiAssosType = id =>
  request
    .get(`${ENV.API_URL}/actors/associations/`)
    .query({ 'city-id': id })
    .then(res => res.body);
