// @flow

import { enhanceActionTypes } from 'redux-async-actions-factory';

export const storeName = 'NEWS';
export const asyncActionsNames = ['GET_NEWS'];

export default {
  ...enhanceActionTypes(storeName, asyncActionsNames),
};
