// @flow

import { normalize, schema } from 'normalizr';

import { modelizePointOfInterest } from './modelizer';

const pointOfInterest = new schema.Entity(
  'pointsOfInterestList',
  {},
  { processStrategy: modelizePointOfInterest }
);
const pointsOfInterest = [pointOfInterest];

export const pointsOfInterestNormalizer = (
  apiPointsOfInterest: ApiPointOfInterestType
): NormalizedPointsOfInterestType => {
  const normalizedData = normalize(apiPointsOfInterest, pointsOfInterest);
  return normalizedData;
};
