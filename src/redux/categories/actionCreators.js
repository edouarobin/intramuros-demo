// @flow

import { enhanceActionCreators } from 'redux-async-actions-factory';

import actionTypes, { storeName, asyncActionsNames } from './actionTypes';

export const selectFilter = (id: number, isDelete: boolean) => ({
  type: actionTypes.SELECT_FILTER,
  payload: {
    id,
    isDelete,
  },
});

export default {
  ...enhanceActionCreators(storeName, asyncActionsNames, actionTypes),
  selectFilter,
};
