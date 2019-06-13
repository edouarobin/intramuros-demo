// @flow

import { enhanceSelectors } from 'redux-async-actions-factory';
import { storeName, apiActionsNames } from './actionTypes';
import { distanceMaxForDisplay } from 'Intramuros/src/services/GeoLocation';

export default {
  ...enhanceSelectors(storeName, apiActionsNames),
  selectedEventDistanceLabel: (rootState: RootStateType): number | null => {
    if (rootState.settings && rootState.settings.eventDistance) {
      return `${parseInt(rootState.settings.eventDistance / 1000, 0)} km`;
    }
    return `${parseInt(distanceMaxForDisplay / 1000, 0)} km`;
  },
  selectedEventDistanceValue: (rootState: RootStateType): number | null => {
    if (rootState.settings && rootState.settings.eventDistance) {
      return rootState.settings.eventDistance;
    }
    return distanceMaxForDisplay;
  },
};
