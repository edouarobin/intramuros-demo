// @flow

import request from 'superagent';

import ENV from 'Intramuros/src/environment';

export const getAnecdotes: () => ApiAnecdoteType = () =>
  request.get(`${ENV.API_URL}/anecdotes/`).then(res => res.body);
