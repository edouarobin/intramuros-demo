// @flow

import request from 'superagent';

import ENV from 'Intramuros/src/environment';

export const getSchools: () => ApiSchoolType = () =>
  request.get(`${ENV.API_URL}/locations/schools/`).then(res => res.body);
