// @flow

import { enhanceSelectors } from 'redux-async-actions-factory';
import { asyncActionsNames, storeName } from './actionTypes';
import { orderBy, deburr, lowerCase } from 'lodash';

const getFilters = (categories: CategoriesStoreType) => {
  let categoriesFiltered = [];
  if (!categories) {
    return categoriesFiltered;
  }

  let categoriesList = categories.categoriesList;
  let selectedFilters = categories.selectedFilters;
  let defaultCategoryIDs = categories.defaultCategoryIDs;

  if (categoriesList) {
    if (selectedFilters && selectedFilters.length > 0) {
      selectedFilters.forEach(id => {
        if (categoriesList[id]) {
          categoriesFiltered.push(categoriesList[id]);
        }
      });
    }
  }
  return categoriesFiltered;
};

export default {
  ...enhanceSelectors(storeName, asyncActionsNames),
  filters: ({
    categories,
  }: RootStateType): CategoriesDisplayableType | null => {
    //Tri par ordre alphabétique de la liste des filtres.
    return orderBy(
      categories.categoriesList,
      [item => lowerCase(deburr(item.name))],
      ['asc']
    );
  },
  selectedFilters: (rootState: RootStateType): number[] | null => {
    return rootState.categories.selectedFilters;
  },
  currentFilters: ({
    categories,
  }: RootStateType): CategoriesDisplayableType | null => {
    return getFilters(categories);
  },
};
