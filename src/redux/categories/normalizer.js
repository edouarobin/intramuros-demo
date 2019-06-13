// @flow

import { normalize, schema } from 'normalizr';

import { modelizeCategory } from './modelizer';

const category = new schema.Entity(
  'categoriesList',
  {},
  { processStrategy: modelizeCategory }
);
const categories = [category];

export const categoryNormalizer = (
  apiCategories: ApiCategoryType
): NormalizedCategoriesType => {
  const normalizedData = normalize(apiCategories, categories);
  return normalizedData;
};
