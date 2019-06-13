// @flow

import { enhanceActionTypes } from 'redux-async-actions-factory';

export const storeName = 'EVENTS';
export const asyncActionsNames = ['GET_EVENTS'];

export default {
  ...enhanceActionTypes(storeName, asyncActionsNames),
};
