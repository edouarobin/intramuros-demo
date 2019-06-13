// @flow

import {
  enhanceReducer,
  enhanceDefaultState,
} from 'redux-async-actions-factory';

import actionTypes, { asyncActionsNames, storeName } from './actionTypes.js';

export const defaultState: NewsStoreType = {
  ...enhanceDefaultState(asyncActionsNames),
  newsList: {},
  newsIDs: [],
};

const newsReducer = (state: NewsStoreType, action: *) => {
  switch (action.type) {
    case actionTypes.REQUEST.GET_NEWS.SUCCESS:
      return {
        ...state,
        newsList: action.payload.newsList,
        newsIDs: action.payload.newsIDs,
      };
    default:
      return state;
  }
};

export default (
  state: NewsStoreType = defaultState,
  action: any
): NewsStoreType =>
  enhanceReducer(storeName, state, action, defaultState, newsReducer);
