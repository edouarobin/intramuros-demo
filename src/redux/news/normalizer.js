// @flow

import { normalize, schema } from 'normalizr';
import { modelizeNews } from './modelizer';

const pieceOfNews = new schema.Entity(
  'newsList',
  {},
  { processStrategy: modelizeNews }
);
const news = [pieceOfNews];

export const newsNormalizer = (apiNews: ApiNewsType): NormalizedNewsType => {
  return normalize(apiNews, news);
};
