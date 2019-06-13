// @flow
/* eslint-disable no-undef */

declare type NormalizedCommerceType = {
  entities: { commercesList: { [number]: CommercesType } },
  result: number[],
};

declare type CommercesStoreType = {
  commercesList: { [number]: CommercesType },
  commercesIDs: number[],
  mapCommercesToCities: { [number]: number[] },
  favoriteCommerces: number[],
};

declare type CommercesDisplayableType = CommercesType[];
