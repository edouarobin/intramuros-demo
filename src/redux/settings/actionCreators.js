// @flow

import { enhanceActionCreators } from 'redux-async-actions-factory';

import actionTypes, { apiActionsNames, storeName } from './actionTypes';

export const changeEventDistance = (distance: number) => ({
  type: actionTypes.CHANGE_EVENT_DISTANCE,
  payload: {
    distance,
  },
});

export default {
  ...enhanceActionCreators(storeName, apiActionsNames, actionTypes),
  changeEventDistance,
};
