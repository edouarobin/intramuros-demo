// @flow

import { enhanceActionCreators } from 'redux-async-actions-factory';

import actionTypes, { storeName, asyncActionsNames } from './actionTypes';

export const saveAnsweredSurveyId = (id: number) => ({
  type: actionTypes.ANSWER_SURVEY,
  payload: {
    id,
  },
});

export default {
  ...enhanceActionCreators(storeName, asyncActionsNames, actionTypes),
  saveAnsweredSurveyId,
};
