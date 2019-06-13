// @flow

import { enhanceActionTypes } from 'redux-async-actions-factory';

export const storeName = 'POINTS_OF_INTEREST';
export const asyncActionsNames = ['GET_POINTS_OF_INTEREST'];

export default {
  ...enhanceActionTypes(storeName, asyncActionsNames),
};
