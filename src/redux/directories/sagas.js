// @flow

import { put, all, takeLatest } from 'redux-saga/effects';

import { enhanceSagaCall } from 'Intramuros/src/redux/sagaEnhancer';

import { getDirectories } from './api';
import { directoryNormalizer } from './normalizer';
import actionTypes from './actionTypes';
import actionCreators from './actionCreators';

export function* getDirectoriesSaga(): Generator<*, *, *> {
  try {
    const directories: ApiDirectoryType[] = yield enhanceSagaCall(
      getDirectories,
      'GET'
    );
    const normalizedDirectories: NormalizedDirectoryType = directoryNormalizer(
      directories
    );
    const directoriesList = normalizedDirectories.entities.directoriesList;
    const mapDirectoriesToCities = directories.reduce(
      (mappedCityDirectories, currentDirectory) => {
        const currentCity = currentDirectory.city;
        if (mappedCityDirectories[currentCity]) {
          mappedCityDirectories[currentCity].push(currentDirectory.id);
          return mappedCityDirectories;
        }
        const newMappedCityDirectories = mappedCityDirectories;
        newMappedCityDirectories[currentCity] = [currentDirectory.id];
        return newMappedCityDirectories;
      },
      {}
    );
    yield put(
      actionCreators.requestGetDirectoriesSuccess({
        directoriesList,
        directoriesIDs: normalizedDirectories.result,
        mapDirectoriesToCities,
      })
    );
  } catch (err) {
    yield put(actionCreators.requestGetDirectoriesFailed(err));
  }
}

export default function* directoriesRootSaga(): Generator<*, *, *> {
  yield all([
    takeLatest(actionTypes.REQUEST.GET_DIRECTORIES.START, getDirectoriesSaga),
  ]);
}
