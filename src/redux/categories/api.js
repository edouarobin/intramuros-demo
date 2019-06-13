// @flow

import request from 'superagent';

import ENV from 'Intramuros/src/environment';

export const getCategories: () => ApiCategoryType = () =>
  request.get(`${ENV.API_URL}/categories/`).then(res => res.body);
