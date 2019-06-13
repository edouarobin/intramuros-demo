// @flow

import { enhanceSelectors } from 'redux-async-actions-factory';
import { orderBy } from 'lodash';
import { isAfter, isToday } from 'date-fns';
import { asyncActionsNames, storeName } from './actionTypes';

export const isInProgress = (survey: SurveysType) => {
  if (survey) {
    return isAfter(survey.end_date, new Date()) || isToday(survey.end_date);
  }
  return true;
};

export default {
  ...enhanceSelectors(storeName, asyncActionsNames),
  surveys: ({
    surveys,
    cities,
  }: RootStateType): SurveysDisplayableType | null => {
    if (surveys.mapSurveysToCities) {
      if (surveys.mapSurveysToCities[cities.selectedCity]) {
        const citySurveysIDs = surveys.mapSurveysToCities[cities.selectedCity];
        const citySurveys = citySurveysIDs.map(ID => {
          let survey = surveys.surveysList[ID];
          //On ajoute l'info si le sondage est en cours ou non.
          if (survey) {
            survey.inProgress = isInProgress(survey);
          }

          return survey;
        });

        const sortedCitySurveys = orderBy(
          citySurveys,
          ['inProgress', 'end_date'],
          ['desc', 'desc']
        );

        return sortedCitySurveys;
      }
    }
    return null;
  },
  answeredSurveys: ({ surveys }: RootStateType): number[] | null => {
    return surveys ? surveys.answeredSurveys : null;
  },
  selectSurveyFromID: ({ surveys }: RootStateType, surveyID: number) => {
    if (surveys && surveys.surveysList && surveys.surveysList[surveyID]) {
      let survey = surveys.surveysList[surveyID];
      survey.inProgress = isInProgress(survey);
      return survey;
    } else {
      return null;
    }
  },
};
