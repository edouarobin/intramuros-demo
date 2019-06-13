// @flow

import { enhanceActionCreators } from 'redux-async-actions-factory';

import actionTypes, { storeName, asyncActionsNames } from './actionTypes';

export const saveFavoriteCommerceId = (id: number) => ({
  type: actionTypes.ADD_FAVORITE_COMMERCE,
  payload: {
    id,
  },
});

export const removeFavoriteCommerceId = (id: number) => ({
  type: actionTypes.REMOVE_FAVORITE_COMMERCE,
  payload: {
    id,
  },
});

export default {
  ...enhanceActionCreators(storeName, asyncActionsNames, actionTypes),
  saveFavoriteCommerceId,
  removeFavoriteCommerceId,
};
