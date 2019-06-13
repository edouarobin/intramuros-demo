// @flow
/* eslint-disable no-undef */

declare type CitiesListType = {
  entities: { citiesList: { [number]: CityType } },
  result: number[],
};
declare type CitiesStoreType = {
  citiesList: { [number]: CityType },
  orderedAZCities: number[],
  selectedCity: number,
  selectedAgglo: number,
  modalVisible: boolean,
  aroundMe: { latitude: number | null, longitude: number | null },
  citiesNotification: number[],
  citiesLoading: boolean,
};
declare type CitiesDisplayableType = CityType[];
