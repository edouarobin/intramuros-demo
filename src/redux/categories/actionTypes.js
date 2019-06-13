// @flow

import { enhanceActionTypes } from 'redux-async-actions-factory';

export const storeName = 'CATEGORIES';
export const asyncActionsNames = ['GET_CATEGORIES'];
const SELECT_FILTER = 'SELECT_FILTER';

export default {
  ...enhanceActionTypes(storeName, asyncActionsNames),
  SELECT_FILTER,
};
