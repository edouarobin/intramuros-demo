// @flow

import { normalize, schema } from 'normalizr';

import { modelizeCommerce } from './modelizer';

const commerce = new schema.Entity(
  'commercesList',
  {},
  { processStrategy: modelizeCommerce }
);
const commerces = [commerce];

export const commerceNormalizer = (
  apiCommerce: ApiCommerceType[]
): NormalizedCommerceType => {
  const normalizedData = normalize(apiCommerce, commerces);
  return normalizedData;
};
