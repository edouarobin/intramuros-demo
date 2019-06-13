// @flow

import { enhanceSelectors } from 'redux-async-actions-factory';
import { orderBy } from 'lodash';

import { asyncActionsNames, storeName } from './actionTypes';

export default {
  ...enhanceSelectors(storeName, asyncActionsNames),
  directories: ({
    directories,
    cities,
  }: RootStateType): DirectoriesDisplayableType | null => {
    if (directories.mapDirectoriesToCities) {
      if (directories.mapDirectoriesToCities[cities.selectedCity]) {
        const cityDirectoriesIDs =
          directories.mapDirectoriesToCities[cities.selectedCity];
        const cityDirectories = cityDirectoriesIDs.map(
          ID => directories.directoriesList[ID]
        );
        const sortedCityDirectories = orderBy(
          cityDirectories,
          'orderIndex',
          'asc'
        );

        return sortedCityDirectories;
      }
    }
    return null;
  },
};
