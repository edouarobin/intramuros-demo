// @flow

import { put, all, takeLatest, call } from 'redux-saga/effects';
import { orderBy } from 'lodash';

import { getCities } from './api';
import { cityNormalizer } from './normalizer';
import actionTypes from './actionTypes';
import actionCreators from './actionCreators';
import { deburr, lowerCase } from 'lodash';

export function* getCitiesSaga(): Generator<*, *, *> {
  try {
    const cities: ApiCityType = yield call(getCities);
    const sortedApiCities = orderBy(
      cities,
      [item => lowerCase(deburr(item.name))],
      'asc'
    );
    const normalizedCities: CitiesListType = cityNormalizer(sortedApiCities);
    yield put(
      actionCreators.requestGetCitiesSuccess({
        normalizedCities: normalizedCities.entities.citiesList,
        orderedAZCities: normalizedCities.result,
      })
    );
  } catch (err) {
    yield put(actionCreators.requestGetCitiesFailed(err));
  }
}

export default function* citiesRootSaga(): Generator<*, *, *> {
  yield all([takeLatest(actionTypes.REQUEST.GET_CITIES.START, getCitiesSaga)]);
}
