// @flow

import { put, all, takeLatest } from 'redux-saga/effects';

import { enhanceSagaCall } from 'Intramuros/src/redux/sagaEnhancer';

import { getSurveys, getSurveyFromId } from './api';
import { surveyNormalizer, oneSurveyNormalizer } from './normalizer';
import actionTypes from './actionTypes';
import actionCreators from './actionCreators';

export function* getSurveysSaga(): Generator<*, *, *> {
  try {
    const surveys: ApiSurveyType[] = yield enhanceSagaCall(getSurveys, 'GET');
    const normalizedSurveys: NormalizedSurveyType = surveyNormalizer(surveys);
    const surveysList = normalizedSurveys.entities.surveysList;
    const mapSurveysToCities = surveys.reduce(
      (mappedCitySurveys, currentSurvey) => {
        const currentCity = currentSurvey.city;
        if (mappedCitySurveys[currentCity]) {
          mappedCitySurveys[currentCity].push(currentSurvey.id);
          return mappedCitySurveys;
        }
        const newMappedCitySurveys = mappedCitySurveys;
        newMappedCitySurveys[currentCity] = [currentSurvey.id];
        return newMappedCitySurveys;
      },
      {}
    );
    yield put(
      actionCreators.requestGetSurveysSuccess({
        surveysList,
        surveysIDs: normalizedSurveys.result,
        mapSurveysToCities,
      })
    );
  } catch (err) {
    console.log(err);
    yield put(actionCreators.requestGetSurveysFailed(err));
  }
}

export function* getSurveyFromIdSaga(action): Generator<*, *, *> {
  try {
    console.log('call saga to get survey detail');
    console.log(action);
    const survey: ApiSurveyType = yield enhanceSagaCall(
      () => getSurveyFromId(action.payload.id),
      'GET'
    );

    const normalizedSurvey = oneSurveyNormalizer(survey).entities.survey[
      action.payload.id
    ];
    console.log(normalizedSurvey);
    console.log(survey);
    yield put(
      actionCreators.requestGetSurveyFromIdSuccess({
        survey: normalizedSurvey,
      })
    );
  } catch (err) {
    console.log(err);
    yield put(actionCreators.requestGetSurveyFromIdFailed(err));
  }
}

export default function* surveysRootSaga(): Generator<*, *, *> {
  yield all([
    takeLatest(actionTypes.REQUEST.GET_SURVEYS.START, getSurveysSaga),
    takeLatest(
      actionTypes.REQUEST.GET_SURVEY_FROM_ID.START,
      getSurveyFromIdSaga
    ),
  ]);
}
