// @flow

import request from 'superagent';

import ENV from 'Intramuros/src/environment';

export const getEvents: () => ApiEventType = () =>
  request
    .get(`${ENV.API_URL}/events/`)
    .set('Accept', 'application/json')
    .then(res => res.body);

export const getEventById: (id: number) => ApiEventType = () =>
  request.get(`${ENV.API_URL}/events/` + id + `/`).then(res => res.body);
