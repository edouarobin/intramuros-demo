// @flow

import { enhanceActionTypes } from 'redux-async-actions-factory';

export const storeName = 'ANECDOTES';
export const asyncActionsNames = ['GET_ANECDOTES'];

export default {
  ...enhanceActionTypes(storeName, asyncActionsNames),
};
