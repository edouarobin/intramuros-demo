// @flow

import { put, all, takeLatest } from 'redux-saga/effects';

import { enhanceSagaCall } from 'Intramuros/src/redux/sagaEnhancer';

import actionCreators from './actionCreators';
import { getNews } from './api';
import { newsNormalizer } from './normalizer';
import actionTypes from './actionTypes';

export function* getNewsSaga(): Generator<*, *, *> {
  try {
    const news: ApiNewsType = yield enhanceSagaCall(getNews, 'GET');
    const normalizedNews: NormalizedNewsType = newsNormalizer(news);
    yield put(
      actionCreators.requestGetNewsSuccess({
        newsList: normalizedNews.entities.newsList,
        newsIDs: normalizedNews.result,
      })
    );
  } catch (err) {
    yield put(actionCreators.requestGetNewsFailed(err));
  }
}

export default function* newsRootSaga(): Generator<*, *, *> {
  yield all([takeLatest(actionTypes.REQUEST.GET_NEWS.START, getNewsSaga)]);
}
