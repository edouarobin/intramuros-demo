// @flow
/* eslint-disable no-undef */

declare type NormalizedCategoriesType = {
  entities: { categoriesList: { [number]: CategoryType } },
  result: number[],
};
declare type CategoriesListType = {
  [number]: CategoryType,
};
declare type CategoriesStoreType = {
  categoriesList: { [number]: CategoryType },
  defaultCategoryIDs: number[],
  categoryIDs: number[], //Tous les Ids des catégories
  selectedFilters: number[], //Les catégories sélectionnées par l'utilisateur à afficher sur la page des événements.
  isDefaultCategoriesEnabled: boolean,
};

declare type CategoriesDisplayableType = CategoryType[];
