// @flow

import {
  enhanceReducer,
  enhanceDefaultState,
} from 'redux-async-actions-factory';

import actionTypes, { asyncActionsNames, storeName } from './actionTypes.js';

export const defaultState: PointsOfInterestStoreType = {
  ...enhanceDefaultState(asyncActionsNames),
  pointsOfInterestList: {},
  pointsOfInterestIDs: [],
};

const pointsOfInterestReducer = (
  state: PointsOfInterestStoreType,
  action: *
): PointsOfInterestStoreType => {
  switch (action.type) {
    case actionTypes.REQUEST.GET_POINTS_OF_INTEREST.SUCCESS:
      return {
        ...state,
        pointsOfInterestList: action.payload.pointsOfInterestList,
        pointsOfInterestIDs: action.payload.pointsOfInterestIDs,
      };
    default:
      return state;
  }
};

export default (
  state: PointsOfInterestStoreType = defaultState,
  action: any
): PointsOfInterestStoreType =>
  enhanceReducer(
    storeName,
    state,
    action,
    defaultState,
    pointsOfInterestReducer
  );
