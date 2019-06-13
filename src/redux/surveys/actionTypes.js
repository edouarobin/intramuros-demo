// @flow

import { enhanceActionTypes } from 'redux-async-actions-factory';

export const storeName = 'SURVEYS';
export const asyncActionsNames = ['GET_SURVEYS', 'GET_SURVEY_FROM_ID'];
const ANSWER_SURVEY = 'ANSWER_SURVEY';

export default {
  ...enhanceActionTypes(storeName, asyncActionsNames),
  ANSWER_SURVEY,
};
