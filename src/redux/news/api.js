// @flow

import request from 'superagent';

import ENV from 'Intramuros/src/environment';

export const getNews: () => ApiNewsType = () =>
  request
    .get(`${ENV.API_URL}/news/`)
    .set('Accept', 'application/json')
    .then(res => res.body);
