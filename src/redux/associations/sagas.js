// @flow

import { put, all, takeLatest } from 'redux-saga/effects';

import { enhanceSagaCall } from 'Intramuros/src/redux/sagaEnhancer';

import { getAssos, getAssosFromCityId } from './api';
import { assosNormalizer, oneAssosNormalizer } from './normalizer';
import actionTypes from './actionTypes';
import actionCreators from './actionCreators';
import { deburr, lowerCase, orderBy } from 'lodash';

export function* getAssosSaga(): Generator<*, *, *> {
  try {
    const assos: ApiAssosType[] = yield enhanceSagaCall(getAssos, 'GET');
    // const normalizedAssos: NormalizedAssosType = assosNormalizer(
    //   assos
    // );
    // const assosList = normalizedAssos.entities.assosList;

    const assosList = assos.reduce((mappedCityAssos, currentAsso) => {
      const currentCity = currentAsso.city;
      if (mappedCityAssos[currentCity]) {
        mappedCityAssos[currentCity].push(currentAsso);
        return mappedCityAssos;
      }
      const newMappedCityAssos = mappedCityAssos;
      newMappedCityAssos[currentCity] = [currentAsso];
      return newMappedCityAssos;
    }, {});
    yield put(
      actionCreators.requestGetAssosSuccess({
        assosList: assosList,
        // assosIDs: normalizedAssos.result,
        // mapAssosToCities: mapAssosToCities,
      })
    );
  } catch (err) {
    console.log(err);
    yield put(actionCreators.requestGetAssosFailed(err));
  }
}

export function* getAssosFromCityIdSaga(action): Generator<*, *, *> {
  try {
    const assos: ApiAssosType[] = yield enhanceSagaCall(
      () => getAssosFromCityId(action.payload.id),
      'GET'
    );

    const sortedApiAssos = orderBy(
      assos,
      [item => lowerCase(deburr(item.name))],
      'asc'
    );

    yield put(
      actionCreators.requestGetAssosFromCitySuccess({
        cityId: action.payload.id,
        assos: sortedApiAssos,
      })
    );
  } catch (err) {
    console.log(err);
    yield put(actionCreators.requestGetAssosFromCityFailed(err));
  }
}

export default function* assosRootSaga(): Generator<*, *, *> {
  yield all([
    takeLatest(actionTypes.REQUEST.GET_ASSOS.START, getAssosSaga),
    takeLatest(
      actionTypes.REQUEST.GET_ASSOS_FROM_CITY.START,
      getAssosFromCityIdSaga
    ),
  ]);
}
