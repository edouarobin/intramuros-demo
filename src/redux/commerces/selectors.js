// @flow

import { enhanceSelectors } from 'redux-async-actions-factory';
import { orderBy, map, isEqual, reduce, deburr, lowerCase } from 'lodash';
import { isAfter, isToday } from 'date-fns';
import { asyncActionsNames, storeName } from './actionTypes';
import memoizeOne from 'memoize-one';
import { fastDistanceConverter } from 'Intramuros/src/services/GeoLocation';

const getCommerces = (
  commercesList: { [number]: CommercesType },
  cities: CitiesStoreType
) => {
  if (commercesList && cities) {
    const citiesList = cities.citiesList;
    const selectedCity = citiesList ? citiesList[cities.selectedCity] : null;
    if (selectedCity) {
      //Ajoute pour chaque commerce le nom de la commune et la distance par rapport à la commune sélectionnée. Max 40km
      commercesList = reduce(
        commercesList,
        function(result, commerce) {
          if (commerce.city === selectedCity.id) {
            commerce.cityName = selectedCity.name;
            commerce.distanceToSelectedCity = 0;
            commerce.distanceDisplay = '';
          } else {
            const cityOfCommerce =
              citiesList && citiesList[commerce.city]
                ? citiesList[commerce.city]
                : null;
            if (cityOfCommerce) {
              const distance = fastDistanceConverter(cityOfCommerce, {
                longitude: selectedCity.longitude,
                latitude: selectedCity.latitude,
              });
              commerce.distanceToSelectedCity = distance;
              commerce.distanceDisplay = ` - ${parseInt(
                distance / 1000,
                0
              )} km`;
              commerce.cityName = cityOfCommerce ? cityOfCommerce.name : '';
            }
          }
          result.push(commerce);
          return result;
        },
        []
      );
    }

    const sortedCommerces = orderBy(
      commercesList,
      [item => lowerCase(deburr(item.name))],
      'asc'
    );
    return sortedCommerces;
  }
  return [];
};

const getCommercesMemoization = memoizeOne(getCommerces, isEqual);

export default {
  ...enhanceSelectors(storeName, asyncActionsNames),
  commerces: ({
    commerces,
    cities,
  }: RootStateType): CommercesDisplayableType | null => {
    return getCommercesMemoization(commerces.commercesList, cities);
  },
  favoriteCommerces: ({ commerces }: RootStateType): number[] | null => {
    return commerces ? commerces.favoriteCommerces : null;
  },
  selectCommerceFromID: ({ commerces }: RootStateType, commerceID: number) => {
    if (
      commerces &&
      commerces.commercesList &&
      commerces.commercesList[commerceID]
    ) {
      let commerce = commerces.commercesList[commerceID];
      return commerce;
    } else {
      return null;
    }
  },
};
