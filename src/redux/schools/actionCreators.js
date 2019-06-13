// @flow

import { enhanceActionCreators } from 'redux-async-actions-factory';

import actionTypes, { storeName, asyncActionsNames } from './actionTypes';

export const saveFavoriteSchoolId = (id: number) => ({
  type: actionTypes.ADD_FAVORITE_SCHOOL,
  payload: {
    id,
  },
});

export const removeFavoriteSchoolId = (id: number) => ({
  type: actionTypes.REMOVE_FAVORITE_SCHOOL,
  payload: {
    id,
  },
});

export default {
  ...enhanceActionCreators(storeName, asyncActionsNames, actionTypes),
  saveFavoriteSchoolId,
  removeFavoriteSchoolId,
};
