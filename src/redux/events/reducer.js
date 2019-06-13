// @flow

import {
  enhanceReducer,
  enhanceDefaultState,
} from 'redux-async-actions-factory';

import actionTypes, { asyncActionsNames, storeName } from './actionTypes.js';

export const defaultState: EventsStoreType = {
  ...enhanceDefaultState(asyncActionsNames),
  eventsList: {},
};

const eventsReducer = (state: EventsStoreType, action: *) => {
  switch (action.type) {
    case actionTypes.REQUEST.GET_EVENTS.SUCCESS:
      return {
        ...state,
        eventsList: action.payload.eventsList,
      };
    default:
      return state;
  }
};

export default (
  state: EventsStoreType = defaultState,
  action: any
): EventsStoreType =>
  enhanceReducer(storeName, state, action, defaultState, eventsReducer);
