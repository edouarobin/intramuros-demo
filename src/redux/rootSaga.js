// @flow

import { all } from 'redux-saga/effects';

import citiesRootSaga from './cities/sagas';
import eventsRootSaga from './events/sagas';
import categoriesRootSaga from './categories/sagas';
import newsRootSaga from './news/sagas';
import anecdotesRootSaga from './anecdotes/sagas';
import pointsOfInterestRootSaga from './pointsOfInterest/sagas';
import directoriesRootSaga from './directories/sagas';
import reportsRootSaga from './reports/sagas';
import surveysRootSaga from './surveys/sagas';
import schoolsRootSaga from './schools/sagas';
import assosRootSaga from './associations/sagas';
import commercesRootSaga from './commerces/sagas';

export default function* rootSaga(): Generator<*, *, *> {
  yield all([
    citiesRootSaga(),
    eventsRootSaga(),
    categoriesRootSaga(),
    newsRootSaga(),
    anecdotesRootSaga(),
    pointsOfInterestRootSaga(),
    directoriesRootSaga(),
    reportsRootSaga(),
    surveysRootSaga(),
    schoolsRootSaga(),
    assosRootSaga(),
    commercesRootSaga(),
  ]);
}
