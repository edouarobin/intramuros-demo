// @flow

import { enhanceActionTypes } from 'redux-async-actions-factory';

export const storeName = 'ASSOCIATIONS';
export const asyncActionsNames = ['GET_ASSOS', 'GET_ASSOS_FROM_CITY'];

const TOGGLE_ASSOS_NOTIFICATION = 'TOGGLE_ASSOS_NOTIFICATION';

export default {
  ...enhanceActionTypes(storeName, asyncActionsNames),
  TOGGLE_ASSOS_NOTIFICATION,
};
