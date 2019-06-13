// @flow

import {
  enhanceReducer,
  enhanceDefaultState,
} from 'redux-async-actions-factory';

import actionTypes, { asyncActionsNames, storeName } from './actionTypes.js';

export const defaultState: DirectoriesStoreType = {
  ...enhanceDefaultState(asyncActionsNames),
  directoriesList: {},
  directoriesIDs: [],
  mapDirectoriesToCities: {},
};

const directoriesReducer = (state: DirectoriesStoreType, action: *) => {
  switch (action.type) {
    case actionTypes.REQUEST.GET_DIRECTORIES.SUCCESS:
      return {
        ...state,
        directoriesList: action.payload.directoriesList,
        directoriesIDs: action.payload.directoriesIDs,
        mapDirectoriesToCities: action.payload.mapDirectoriesToCities,
      };
    default:
      return state;
  }
};

export default (
  state: DirectoriesStoreType = defaultState,
  action: any
): DirectoriesStoreType =>
  enhanceReducer(storeName, state, action, defaultState, directoriesReducer);
