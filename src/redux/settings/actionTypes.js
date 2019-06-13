// @flow

import { enhanceActionTypes } from 'redux-async-actions-factory';

export const storeName = 'SETTINGS';
export const apiActionsNames = [];
const CHANGE_EVENT_DISTANCE = 'CHANGE_EVENT_DISTANCE';

export default {
  ...enhanceActionTypes(storeName, apiActionsNames),
  CHANGE_EVENT_DISTANCE,
};
