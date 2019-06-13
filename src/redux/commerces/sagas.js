// @flow

import { put, all, takeLatest } from 'redux-saga/effects';

import { enhanceSagaCall } from 'Intramuros/src/redux/sagaEnhancer';

import { getCommerces } from './api';
import { commerceNormalizer } from './normalizer';
import actionTypes from './actionTypes';
import actionCreators from './actionCreators';

export function* getCommercesSaga(): Generator<*, *, *> {
  try {
    const commerces: ApiCommerceType[] = yield enhanceSagaCall(
      getCommerces,
      'GET'
    );
    const normalizedCommerces: NormalizedCommerceType = commerceNormalizer(
      commerces
    );
    const commercesList = normalizedCommerces.entities.commercesList;
    const mapCommercesToCities = commerces.reduce(
      (mappedCommercesToCities, currentCommerce) => {
        const currentCity = currentCommerce.city;
        if (mappedCommercesToCities[currentCity]) {
          mappedCommercesToCities[currentCity].push(currentCommerce.id);
          return mappedCommercesToCities;
        }
        const newMappedCommercesToCities = mappedCommercesToCities;
        newMappedCommercesToCities[currentCity] = [currentCommerce.id];
        return newMappedCommercesToCities;
      },
      {}
    );
    yield put(
      actionCreators.requestGetCommercesSuccess({
        commercesList,
        commercesIDs: normalizedCommerces.result,
        mapCommercesToCities,
      })
    );
  } catch (err) {
    console.log(err);
    yield put(actionCreators.requestGetCommercesFailed(err));
  }
}

export default function* commercesRootSaga(): Generator<*, *, *> {
  yield all([
    takeLatest(actionTypes.REQUEST.GET_COMMERCES.START, getCommercesSaga),
  ]);
}
