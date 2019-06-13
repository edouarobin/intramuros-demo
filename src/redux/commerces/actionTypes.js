// @flow

import { enhanceActionTypes } from 'redux-async-actions-factory';

export const storeName = 'COMMERCES';
export const asyncActionsNames = ['GET_COMMERCES'];
const ADD_FAVORITE_COMMERCE = 'ADD_FAVORITE_COMMERCE';
const REMOVE_FAVORITE_COMMERCE = 'REMOVE_FAVORITE_COMMERCE';

export default {
  ...enhanceActionTypes(storeName, asyncActionsNames),
  ADD_FAVORITE_COMMERCE,
  REMOVE_FAVORITE_COMMERCE,
};
