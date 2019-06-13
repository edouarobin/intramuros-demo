// @flow

import { enhanceActionTypes } from 'redux-async-actions-factory';

export const storeName = 'DIRECTORIES';
export const asyncActionsNames = ['GET_DIRECTORIES'];

export default {
  ...enhanceActionTypes(storeName, asyncActionsNames),
};
