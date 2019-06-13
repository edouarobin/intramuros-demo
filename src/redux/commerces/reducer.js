// @flow

import {
  enhanceReducer,
  enhanceDefaultState,
} from 'redux-async-actions-factory';

import actionTypes, { asyncActionsNames, storeName } from './actionTypes.js';
import { forEach, cloneDeep } from 'lodash';

export const defaultState: CommercesStoreType = {
  ...enhanceDefaultState(asyncActionsNames),
  commercesList: {},
  commercesIDs: [],
  mapCommercesToCities: {},
  favoriteCommerces: [],
};

const commercesReducer = (state: CommercesStoreType, action: *) => {
  let localFavoriteCommerces = [];
  switch (action.type) {
    case actionTypes.REQUEST.GET_COMMERCES.SUCCESS:
      let favoriteCommerces = cloneDeep(state.favoriteCommerces);
      if (favoriteCommerces) {
        //Clean des commerces sélectionnés obsolètes
        favoriteCommerces = favoriteCommerces.reduce(function(result, id) {
          if (action.payload.commercesIDs.indexOf(id) > -1) {
            result.push(id);
          }
          return result;
        }, []);
      }
      return {
        ...state,
        commercesList: action.payload.commercesList,
        commercesIDs: action.payload.commercesIDs,
        mapCommercesToCities: action.payload.mapCommercesToCities,
        favoriteCommerces: favoriteCommerces,
      };

    case actionTypes.ADD_FAVORITE_COMMERCE:
      //IMPORTANT: Make a real copy of the state. Sinon ça met directement à jour le state courant, et le store ne détecte pas le changement.
      localFavoriteCommerces = state.favoriteCommerces
        ? cloneDeep(state.favoriteCommerces)
        : [];
      const isExisting = localFavoriteCommerces.indexOf(action.payload.id) > -1;

      if (!isExisting) {
        console.log(
          'adding id: ' + action.payload.id + ' to favoriteCommerces map'
        );
        localFavoriteCommerces.push(action.payload.id);
      }
      return {
        ...state,
        favoriteCommerces: localFavoriteCommerces,
      };

    case actionTypes.REMOVE_FAVORITE_COMMERCE:
      //IMPORTANT: Make a real copy of the state. Sinon ça met directement à jour le state courant, et le store ne détecte pas le changement.
      forEach(state.favoriteCommerces, commerceId => {
        if (commerceId !== action.payload.id) {
          localFavoriteCommerces.push(commerceId);
        }
      });
      return {
        ...state,
        favoriteCommerces: localFavoriteCommerces,
      };

    default:
      return state;
  }
};

export default (
  state: CommercesStoreType = defaultState,
  action: any
): CommercesStoreType =>
  enhanceReducer(storeName, state, action, defaultState, commercesReducer);
