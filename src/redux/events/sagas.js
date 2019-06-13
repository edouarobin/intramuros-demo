// @flow

import { put, all, takeLatest } from 'redux-saga/effects';

import { enhanceSagaCall } from 'Intramuros/src/redux/sagaEnhancer';

import { getEvents } from './api';
import { eventNormalizer } from './normalizer';
import actionTypes from './actionTypes';
import actionCreators from './actionCreators';

export function* getEventsSaga(): Generator<*, *, *> {
  try {
    const events: ApiEventType = yield enhanceSagaCall(getEvents, 'GET');
    const normalizedEvents: NormalizedEventsType = eventNormalizer(events);
    yield put(
      actionCreators.requestGetEventsSuccess({
        eventsList: normalizedEvents.entities.eventsList,
      })
    );
  } catch (err) {
    yield put(actionCreators.requestGetEventsFailed(err));
  }
}

export default function* eventsRootSaga(): Generator<*, *, *> {
  yield all([takeLatest(actionTypes.REQUEST.GET_EVENTS.START, getEventsSaga)]);
}
