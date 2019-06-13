// @flow

import { normalize, schema } from 'normalizr';

import { modelizeCity } from './modelizer';

const city = new schema.Entity(
  'citiesList',
  {},
  { processStrategy: modelizeCity }
);
const cities = [city];

export const cityNormalizer = (
  sortedApiCities: ApiCityType
): CitiesListType => {
  const normalizedData = normalize(sortedApiCities, cities);
  return normalizedData;
};
