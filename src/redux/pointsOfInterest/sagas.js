// @flow

import { put, all, takeLatest } from 'redux-saga/effects';

import { enhanceSagaCall } from 'Intramuros/src/redux/sagaEnhancer';

import actionCreators from './actionCreators';
import { getPointsOfInterest } from './api';
import { pointsOfInterestNormalizer } from './normalizer';
import actionTypes from './actionTypes';

export function* getPointsOfInterestSaga(): Generator<*, *, *> {
  try {
    const pointsOfInterest: ApiPointOfInterestType = yield enhanceSagaCall(
      getPointsOfInterest,
      'GET'
    );
    const normalizedPointsOfInterest: NormalizedPointsOfInterestType = pointsOfInterestNormalizer(
      pointsOfInterest
    );
    yield put(
      actionCreators.requestGetPointsOfInterestSuccess({
        pointsOfInterestList:
          normalizedPointsOfInterest.entities.pointsOfInterestList,
        pointsOfInterestIDs: normalizedPointsOfInterest.result,
      })
    );
  } catch (err) {
    yield put(actionCreators.requestGetPointsOfInterestFailed(err));
  }
}

export default function* pointsOfInterestRootSaga(): Generator<*, *, *> {
  yield all([
    takeLatest(
      actionTypes.REQUEST.GET_POINTS_OF_INTEREST.START,
      getPointsOfInterestSaga
    ),
  ]);
}
