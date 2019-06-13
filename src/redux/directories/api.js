// @flow

import request from 'superagent';

import ENV from 'Intramuros/src/environment';

export const getDirectories: () => ApiDirectoryType = () =>
  request.get(`${ENV.API_URL}/services/directories/`).then(res => res.body);
