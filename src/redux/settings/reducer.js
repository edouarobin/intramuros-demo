// @flow

import {
  enhanceReducer,
  enhanceDefaultState,
} from 'redux-async-actions-factory';
import actionTypes, { apiActionsNames, storeName } from './actionTypes.js';
import { distanceMaxForDisplay } from 'Intramuros/src/services/GeoLocation';

export const defaultState: SettingsStoreType = {
  ...enhanceDefaultState(apiActionsNames),
  eventDistance: distanceMaxForDisplay,
};

const settingsReducer = (state: SettingsStoreType, action: *) => {
  switch (action.type) {
    case actionTypes.CHANGE_EVENT_DISTANCE:
      console.log(
        'Change event distance. New value is :' + action.payload.distance
      );
      return {
        ...state,
        eventDistance: action.payload.distance,
      };
    default:
      return state;
  }
};

export default (
  state: SettingsStoreType = defaultState,
  action: any
): SettingsStoreType =>
  enhanceReducer(storeName, state, action, defaultState, settingsReducer);
