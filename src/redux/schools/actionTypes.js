// @flow

import { enhanceActionTypes } from 'redux-async-actions-factory';

export const storeName = 'SCHOOLS';
export const asyncActionsNames = ['GET_SCHOOLS'];
const ADD_FAVORITE_SCHOOL = 'ADD_FAVORITE_SCHOOL';
const REMOVE_FAVORITE_SCHOOL = 'REMOVE_FAVORITE_SCHOOL';

export default {
  ...enhanceActionTypes(storeName, asyncActionsNames),
  ADD_FAVORITE_SCHOOL,
  REMOVE_FAVORITE_SCHOOL,
};
