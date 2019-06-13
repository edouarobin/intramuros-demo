// @flow

import request from 'superagent';

import ENV from 'Intramuros/src/environment';

export const getSurveys: () => ApiSurveyType = () =>
  request.get(`${ENV.API_URL}/services/survey/`).then(res => res.body);

export const getSurveyFromId: (id: number) => ApiSurveyType = id =>
  request.get(`${ENV.API_URL}/services/survey/${id}/`).then(res => res.body);
