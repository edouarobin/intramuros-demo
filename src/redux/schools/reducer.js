// @flow

import {
  enhanceReducer,
  enhanceDefaultState,
} from 'redux-async-actions-factory';

import actionTypes, { asyncActionsNames, storeName } from './actionTypes.js';
import { forEach, cloneDeep } from 'lodash';

export const defaultState: SchoolsStoreType = {
  ...enhanceDefaultState(asyncActionsNames),
  schoolsList: {},
  schoolsIDs: [],
  mapSchoolsToCities: {},
  favoriteSchools: [],
};

const schoolsReducer = (state: SchoolsStoreType, action: *) => {
  let localFavoriteSchools = [];
  switch (action.type) {
    case actionTypes.REQUEST.GET_SCHOOLS.SUCCESS:
      let favoriteSchools = cloneDeep(state.favoriteSchools);
      if (favoriteSchools) {
        //Clean des ecoles sélectionnés obsolètes
        favoriteSchools = favoriteSchools.reduce(function(result, id) {
          if (action.payload.schoolsIDs.indexOf(id) > -1) {
            result.push(id);
          }
          return result;
        }, []);
      }
      return {
        ...state,
        schoolsList: action.payload.schoolsList,
        schoolsIDs: action.payload.schoolsIDs,
        mapSchoolsToCities: action.payload.mapSchoolsToCities,
        favoriteSchools: favoriteSchools,
      };

    case actionTypes.ADD_FAVORITE_SCHOOL:
      //IMPORTANT: Make a real copy of the state. Sinon ça met directement à jour le state courant, et le store ne détecte pas le changement.
      localFavoriteSchools = state.favoriteSchools
        ? cloneDeep(state.favoriteSchools)
        : [];
      const isExisting = localFavoriteSchools.indexOf(action.payload.id) > -1;

      if (!isExisting) {
        console.log(
          'adding id: ' + action.payload.id + ' to favoriteSchools map'
        );
        localFavoriteSchools.push(action.payload.id);
      }
      return {
        ...state,
        favoriteSchools: localFavoriteSchools,
      };

    case actionTypes.REMOVE_FAVORITE_SCHOOL:
      //IMPORTANT: Make a real copy of the state. Sinon ça met directement à jour le state courant, et le store ne détecte pas le changement.
      forEach(state.favoriteSchools, schoolId => {
        if (schoolId !== action.payload.id) {
          localFavoriteSchools.push(schoolId);
        }
      });
      return {
        ...state,
        favoriteSchools: localFavoriteSchools,
      };

    default:
      return state;
  }
};

export default (
  state: SchoolsStoreType = defaultState,
  action: any
): SchoolsStoreType =>
  enhanceReducer(storeName, state, action, defaultState, schoolsReducer);
