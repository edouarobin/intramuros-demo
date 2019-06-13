// @flow

import { normalize, schema } from 'normalizr';

import { modelizeSchool } from './modelizer';

const school = new schema.Entity(
  'schoolsList',
  {},
  { processStrategy: modelizeSchool }
);
const schools = [school];

export const schoolNormalizer = (
  apiSchool: ApiSchoolType[]
): NormalizedSchoolType => {
  const normalizedData = normalize(apiSchool, schools);
  return normalizedData;
};
