// @flow

import { normalize, schema } from 'normalizr';

import { modelizeSurvey } from './modelizer';

const survey = new schema.Entity(
  'surveysList',
  {},
  { processStrategy: modelizeSurvey }
);
const surveys = [survey];

export const surveyNormalizer = (
  apiSurvey: ApiSurveyType[]
): NormalizedSurveyType => {
  const normalizedData = normalize(apiSurvey, surveys);
  return normalizedData;
};

const oneSurvey = new schema.Entity(
  'survey',
  {},
  { processStrategy: modelizeSurvey }
);

export const oneSurveyNormalizer = (
  apiSurvey: ApiSurveyType
): NormalizedSurveyType => {
  const normalizedData = normalize(apiSurvey, oneSurvey);
  return normalizedData;
};
