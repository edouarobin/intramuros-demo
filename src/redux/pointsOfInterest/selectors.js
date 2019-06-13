// @flow

import { enhanceSelectors } from 'redux-async-actions-factory';
import { orderBy } from 'lodash';

import { fastDistanceConverter } from 'Intramuros/src/services/GeoLocation';
import { asyncActionsNames, storeName } from './actionTypes';
import memoizeOne from 'memoize-one';
import { isEqual, concat } from 'lodash';

const reducePointsOfInterest = (selectedCity, aroundMe) => {
  const reducerWithSelectedCity = (
    sortedPointsOfInterest,
    currentPointOfInterest
  ) => {
    const longitude = aroundMe.longitude || selectedCity.longitude;
    const latitude = aroundMe.latitude || selectedCity.latitude;
    let distanceToSelectedCity = null;

    try {
      distanceToSelectedCity = fastDistanceConverter(currentPointOfInterest, {
        longitude,
        latitude,
      });
    } catch (error) {
      console.log('error in fastDistanceConverter: ' + error);
    }

    if (currentPointOfInterest) {
      try {
        currentPointOfInterest.city === selectedCity.id && !aroundMe.latitude
          ? sortedPointsOfInterest.pointsOfInterestOfMyCity.push({
              ...currentPointOfInterest,
              distanceToSelectedCity: null,
            })
          : sortedPointsOfInterest.otherPointsOfInterest.push({
              ...currentPointOfInterest,
              distanceToSelectedCity: Math.ceil(distanceToSelectedCity / 1000),
            });
      } catch (error) {
        console.log('error in reducerWithSelectedCity: ' + error);
      }
    }
    return sortedPointsOfInterest;
  };
  return reducerWithSelectedCity;
};

const getPOIsMemoization = memoizeOne(reducePointsOfInterest, isEqual);

export default {
  ...enhanceSelectors(storeName, asyncActionsNames),
  pointsOfInterest: ({
    pointsOfInterest,
    cities,
  }: RootStateType): PointsOfInterestDisplayableType | null => {
    const pointsOfInterestIDs = pointsOfInterest.pointsOfInterestIDs;
    const pointsOfInterestList = pointsOfInterest.pointsOfInterestList;
    const selectedCityId = cities.selectedCity;
    const selectedCity = cities.citiesList[selectedCityId];
    if (pointsOfInterestIDs) {
      const allPointsOfInterest = pointsOfInterestIDs.map(
        pointsOfInterestID => pointsOfInterestList[pointsOfInterestID]
      );
      const sortedPointsOfInterest = allPointsOfInterest.reduce(
        getPOIsMemoization(selectedCity, cities.aroundMe),
        { pointsOfInterestOfMyCity: [], otherPointsOfInterest: [] }
      );
      const orderedSortedotherPointsOfInterest = orderBy(
        sortedPointsOfInterest.otherPointsOfInterest,
        'distanceToSelectedCity',
        'asc'
      );
      return concat(
        sortedPointsOfInterest.pointsOfInterestOfMyCity,
        orderedSortedotherPointsOfInterest
      );
    }
    return null;
  },
  selectPointOfInterestDetailsFromID: (
    { pointsOfInterest }: RootStateType,
    pointOfInterestID: number
  ): PointOfInterestType =>
    pointsOfInterest.pointsOfInterestList[pointOfInterestID],
};
