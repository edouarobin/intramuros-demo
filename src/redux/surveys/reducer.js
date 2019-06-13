// @flow

import {
  enhanceReducer,
  enhanceDefaultState,
} from 'redux-async-actions-factory';
import { cloneDeep, indexOf } from 'lodash';
import actionTypes, { asyncActionsNames, storeName } from './actionTypes.js';

export const defaultState: SurveysStoreType = {
  ...enhanceDefaultState(asyncActionsNames),
  surveysList: {},
  surveysIDs: [],
  mapSurveysToCities: {},
  answeredSurveys: [],
};

const surveysReducer = (state: SurveysStoreType, action: *) => {
  switch (action.type) {
    case actionTypes.REQUEST.GET_SURVEYS.SUCCESS:
      return {
        ...state,
        surveysList: action.payload.surveysList,
        surveysIDs: action.payload.surveysIDs,
        mapSurveysToCities: action.payload.mapSurveysToCities,
      };
    case actionTypes.REQUEST.GET_SURVEY_FROM_ID.SUCCESS:
      console.log('REQUEST.GET_SURVEY_FROM_ID.SUCCESS');
      if (action.payload.survey) {
        let survey = action.payload.survey;
        let surveysIDs = cloneDeep(state.surveysIDs);
        let surveysList = cloneDeep(state.surveysList);
        let mapSurveysToCities = cloneDeep(state.mapSurveysToCities);

        //SurveyIds
        if (indexOf(surveysIDs, survey.id)) {
          //Nothin
        } else {
          surveysIDs.push(survey.id);
        }

        //surveysList
      }
      return {
        ...state,
      };
    case actionTypes.ANSWER_SURVEY:
      let newAnsweredSurveys = state.answeredSurveys
        ? cloneDeep(state.answeredSurveys)
        : [];
      const isExisting = newAnsweredSurveys.indexOf(action.payload.id) > -1;

      if (!isExisting) {
        console.log(
          'adding id: ' + action.payload.id + ' to answeredSurveys map'
        );
        newAnsweredSurveys.push(action.payload.id);
      }
      return {
        ...state,
        answeredSurveys: newAnsweredSurveys,
      };
    default:
      return state;
  }
};

export default (
  state: SurveysStoreType = defaultState,
  action: any
): SurveysStoreType =>
  enhanceReducer(storeName, state, action, defaultState, surveysReducer);
