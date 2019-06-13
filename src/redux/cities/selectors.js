// @flow
import { find, toNumber } from 'lodash';
import { enhanceSelectors } from 'redux-async-actions-factory';

import { asyncActionsNames, storeName } from './actionTypes';

export default {
  ...enhanceSelectors(storeName, asyncActionsNames),
  cities: (rootState: RootStateType): CitiesDisplayableType | null => {
    if (rootState.cities.orderedAZCities.length !== 0) {
      return rootState.cities.orderedAZCities.map(
        cityID => rootState.cities.citiesList[cityID]
      );
    }
    return null;
  },
  selectedCity: (rootState: RootStateType): CityType | null => {
    const selectedCity = rootState.cities.selectedCity;
    if (selectedCity && rootState.cities.citiesList) {
      return rootState.cities.citiesList[selectedCity];
    }
    return null;
  },
  selectedCitiesNotification: (rootState: RootStateType): number[] | null => {
    return rootState.cities.citiesNotification;
  },
  cityFromID: (rootState: RootStateType, cityID: number): string =>
    rootState.cities.citiesList && rootState.cities.citiesList[cityID]
      ? rootState.cities.citiesList[cityID].name
      : null,
  aggloFromID: (rootState: RootStateType, aggloID: number): string => {
    const city = find(rootState.cities.citiesList, {
      agglo_id: toNumber(aggloID),
    });
    return city ? city.agglo_name : null;
  },
  cityDetailsFromID: (rootState: RootStateType, cityID: number): CityType =>
    rootState.cities.citiesList ? rootState.cities.citiesList[cityID] : null,
  modalVisible: (rootState: RootStateType): boolean =>
    rootState.cities.modalVisible,
  isAroundMeSelected: ({ cities }: RootStateType): boolean =>
    !!cities.aroundMe.latitude && !!cities.aroundMe.longitude,
  citiesLoading: ({ cities }: RootStateType): boolean => {
    return cities.citiesLoading;
  },
};
