// @flow

import {
  enhanceReducer,
  enhanceDefaultState,
} from 'redux-async-actions-factory';
import { forEach, indexOf, reduce, filter, cloneDeep } from 'lodash';
import actionTypes, { asyncActionsNames, storeName } from './actionTypes.js';

export const defaultState: CategoriesStoreType = {
  ...enhanceDefaultState(asyncActionsNames),
  categoriesList: {},
  defaultCategoryIDs: [],
  categoryIDs: [],
  selectedFilters: [],
  isDefaultCategoriesEnabled: true,
};

const categoriesReducer = (state: CategoriesStoreType, action: *) => {
  switch (action.type) {
    case actionTypes.REQUEST.GET_CATEGORIES.SUCCESS:
      //Clean des filtres sélectionnés obsolètes (attention à bien faire une copie de l'objet pour que le store se mette à jour)
      mySelectedFilters = reduce(
        state.selectedFilters,
        function(result, id) {
          if (indexOf(action.payload.categoryIDs, id) > -1) {
            result.push(id);
          }
          return result;
        },
        []
      );

      //Si l'utilisateur n'a encore jamais paramétré ses filtres, on lui affiche les filtres par défaut.
      if (state.isDefaultCategoriesEnabled) {
        console.log('isDefaultCategoriesEnabled = true => set default filters');
        mySelectedFilters = action.payload.defaultCategoryIDs;
      }

      return {
        ...state,
        categoriesList: action.payload.categoriesList,
        defaultCategoryIDs: action.payload.defaultCategoryIDs,
        categoryIDs: action.payload.categoryIDs,
        selectedFilters: mySelectedFilters,
      };

    case actionTypes.SELECT_FILTER:
      //IMPORTANT: Make a real copy of the state. Sinon ça met directement à jour le state courant, et le store ne détecte pas le changement.
      let localSelectedFilters = state.selectedFilters
        ? cloneDeep(state.selectedFilters)
        : [];

      if (action.payload.isDelete) {
        localSelectedFilters = filter(
          localSelectedFilters,
          id => id !== action.payload.id
        );
      } else {
        if (indexOf(localSelectedFilters, action.payload.id) > -1) {
          //Nothing. Item already exists
        } else {
          localSelectedFilters.push(action.payload.id);
        }
      }

      return {
        ...state,
        selectedFilters: localSelectedFilters,
        isDefaultCategoriesEnabled: false,
      };
    default:
      return state;
  }
};

export default (
  state: CategoriesStoreType = defaultState,
  action: any
): CategoriesStoreType =>
  enhanceReducer(storeName, state, action, defaultState, categoriesReducer);
