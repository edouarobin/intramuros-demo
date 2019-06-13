// @flow

import {
  enhanceReducer,
  enhanceDefaultState,
} from 'redux-async-actions-factory';

import actionTypes, { asyncActionsNames, storeName } from './actionTypes.js';

export const defaultState: AnecdotesStoreType = {
  ...enhanceDefaultState(asyncActionsNames),
  anecdotesList: {},
  anecdotesIDs: [],
};

const anecdotesReducer = (state: AnecdotesStoreType, action: *) => {
  switch (action.type) {
    case actionTypes.REQUEST.GET_ANECDOTES.SUCCESS:
      return {
        ...state,
        anecdotesList: action.payload.anecdotesList,
        anecdotesIDs: action.payload.anecdotesIDs,
      };
    default:
      return state;
  }
};

export default (
  state: AnecdotesStoreType = defaultState,
  action: any
): AnecdotesStoreType =>
  enhanceReducer(storeName, state, action, defaultState, anecdotesReducer);
