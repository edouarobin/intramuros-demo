// @flow

import {
  enhanceDefaultState,
  enhanceReducer,
} from 'redux-async-actions-factory';

import { apiActionsNames, storeName } from './actionTypes';

const defaultState: ReportsStoreType = {
  ...enhanceDefaultState(apiActionsNames),
};

const reducer = (state: ReportsStoreType) => state;

export default (state: ReportsStoreType = defaultState, action: *) =>
  enhanceReducer(storeName, state, action, defaultState, reducer);
