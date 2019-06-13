// @flow

import request from 'superagent';

import ENV from 'Intramuros/src/environment';

export const getPointsOfInterest: () => ApiPointOfInterestType = () =>
  request.get(`${ENV.API_URL}/poi/`).then(res => res.body);
