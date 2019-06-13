// @flow

import { normalize, schema } from 'normalizr';

import { modelizeAssos } from './modelizer';

const assos = new schema.Entity(
  'assosList',
  {},
  { processStrategy: modelizeAssos }
);
const associations = [assos];

export const assosNormalizer = (
  apiAssos: ApiAssosType[]
): NormalizedAssosType => {
  const normalizedData = normalize(apiAssos, associations);
  return normalizedData;
};

const oneAssos = new schema.Entity(
  'assos',
  {},
  { processStrategy: modelizeAssos }
);

export const oneAssosNormalizer = (
  apiAssos: ApiAssosType
): NormalizedAssosType => {
  const normalizedData = normalize(apiAssos, oneAssos);
  return normalizedData;
};
