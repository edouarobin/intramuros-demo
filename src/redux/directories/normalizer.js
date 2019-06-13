// @flow

import { normalize, schema } from 'normalizr';

import { modelizeDirectory } from './modelizer';

const directory = new schema.Entity(
  'directoriesList',
  {},
  { processStrategy: modelizeDirectory }
);
const directories = [directory];

export const directoryNormalizer = (
  apiDirectory: ApiDirectoryType[]
): NormalizedDirectoryType => {
  const normalizedData = normalize(apiDirectory, directories);
  return normalizedData;
};
