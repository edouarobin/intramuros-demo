// @flow

import { put, all, takeLatest } from 'redux-saga/effects';

import { enhanceSagaCall } from 'Intramuros/src/redux/sagaEnhancer';

import actionCreators from './actionCreators';
import { getAnecdotes } from './api';
import { anecdotesNormalizer } from './normalizer';
import actionTypes from './actionTypes';

export function* getAnecdotesSaga(): Generator<*, *, *> {
  try {
    const anecdotes: ApiAnecdoteType = yield enhanceSagaCall(
      getAnecdotes,
      'GET'
    );
    const normalizedAnecdotes: NormalizedAnecdoteType = anecdotesNormalizer(
      anecdotes
    );
    yield put(
      actionCreators.requestGetAnecdotesSuccess({
        anecdotesList: normalizedAnecdotes.entities.anecdotesList,
        anecdotesIDs: normalizedAnecdotes.result,
      })
    );
  } catch (err) {
    yield put(actionCreators.requestGetAnecdotesFailed(err));
  }
}

export default function* anecdotesRootSaga(): Generator<*, *, *> {
  yield all([
    takeLatest(actionTypes.REQUEST.GET_ANECDOTES.START, getAnecdotesSaga),
  ]);
}
