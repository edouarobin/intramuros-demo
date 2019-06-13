// @flow

import { normalize, schema } from 'normalizr';
import { orderBy } from 'lodash';

import { modelizeAnecdotes } from './modelizer';

const anecdote = new schema.Entity(
  'anecdotesList',
  {},
  { processStrategy: modelizeAnecdotes }
);
const anecdotes = [anecdote];

export const anecdotesNormalizer = (
  apiAnecdotes: ApiAnecdoteType
): NormalizedAnecdoteType => {
  const sortedAnecdotes = orderBy(apiAnecdotes, 'updated_at', 'desc');
  const normalizedData = normalize(sortedAnecdotes, anecdotes);
  return normalizedData;
};
