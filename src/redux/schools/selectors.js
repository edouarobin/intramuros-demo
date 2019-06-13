// @flow

import { enhanceSelectors } from 'redux-async-actions-factory';
import { orderBy, map, isEqual, reduce, deburr, lowerCase } from 'lodash';
import { isAfter, isToday } from 'date-fns';
import { asyncActionsNames, storeName } from './actionTypes';
import memoizeOne from 'memoize-one';
import {
  fastDistanceConverter,
  // distanceMaxForDisplay,
} from 'Intramuros/src/services/GeoLocation';

const getSchools = (
  schoolsList: { [number]: SchoolsType },
  cities: CitiesStoreType
) => {
  if (schoolsList && cities) {
    const citiesList = cities.citiesList;
    const selectedCity = citiesList ? citiesList[cities.selectedCity] : null;
    if (selectedCity) {
      //Ajoute pour chaque school le nom de la commune et la distance par rapport à la commune sélectionnée. Max 40km
      schoolsList = reduce(
        schoolsList,
        function(result, school) {
          if (school.city === selectedCity.id) {
            school.cityName = selectedCity.name;
            school.distanceToSelectedCity = 0;
            school.distanceDisplay = '';
          } else {
            const cityOfSchool =
              citiesList && citiesList[school.city]
                ? citiesList[school.city]
                : null;
            if (cityOfSchool) {
              const distance = fastDistanceConverter(cityOfSchool, {
                longitude: selectedCity.longitude,
                latitude: selectedCity.latitude,
              });
              // if (distance > distanceMaxForDisplay) {
              //   //Si plus de 40km on ne l'affiche pas.
              //   console.log("school " + school.name + " is too far")
              //   return result
              // }
              school.distanceToSelectedCity = distance;
              school.distanceDisplay = ` - ${parseInt(distance / 1000, 0)} km`;
              school.cityName = cityOfSchool ? cityOfSchool.name : '';
            }
          }
          result.push(school);
          return result;
        },
        []
      );
    }

    const sortedSchools = orderBy(
      schoolsList,
      [item => lowerCase(deburr(item.name))],
      'asc'
    );
    return sortedSchools;
  }
  return [];
};

const getSchoolsMemoization = memoizeOne(getSchools, isEqual);

export default {
  ...enhanceSelectors(storeName, asyncActionsNames),
  schools: ({
    schools,
    cities,
  }: RootStateType): SchoolsDisplayableType | null => {
    return getSchoolsMemoization(schools.schoolsList, cities);
  },
  favoriteSchools: ({ schools }: RootStateType): number[] | null => {
    return schools ? schools.favoriteSchools : null;
  },
  selectSchoolFromID: ({ schools }: RootStateType, schoolID: number) => {
    if (schools && schools.schoolsList && schools.schoolsList[schoolID]) {
      let school = schools.schoolsList[schoolID];
      return school;
    } else {
      return null;
    }
  },
};
