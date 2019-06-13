// @flow

import { enhanceActionTypes } from 'redux-async-actions-factory';

export const storeName = 'CITIES';
export const asyncActionsNames = ['GET_CITIES'];

const SELECT_CITY = 'SELECT_CITY';
const TOGGLE_CITY_NOTIFICATION = 'TOGGLE_CITY_NOTIFICATION';
// const SELECT_AROUND_ME = 'SELECT_AROUND_ME';
const OPEN_MODAL = 'OPEN_MODAL';
const CLOSE_MODAL = 'CLOSE_MODAL';

export default {
  ...enhanceActionTypes(storeName, asyncActionsNames),
  SELECT_CITY,
  // SELECT_AROUND_ME,
  OPEN_MODAL,
  CLOSE_MODAL,
  TOGGLE_CITY_NOTIFICATION,
};
