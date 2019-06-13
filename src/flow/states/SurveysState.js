// @flow
/* eslint-disable no-undef */

declare type NormalizedSurveyType = {
  entities: { surveysList: { [number]: SurveysType } },
  result: number[],
};

declare type SurveysStoreType = {
  surveysList: { [number]: SurveysType },
  surveysIDs: number[],
  mapSurveysToCities: { [number]: number[] },
  answeredSurveys: number[],
};

declare type SurveysDisplayableType = SurveysType[];
