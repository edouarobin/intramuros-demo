// @flow

import { enhanceSelectors } from 'redux-async-actions-factory';

import { asyncActionsNames, storeName } from './actionTypes';

export default {
  ...enhanceSelectors(storeName, asyncActionsNames),
  anecdotes: ({ anecdotes }: RootStateType): AnecdotesDisplayableType | null =>
    anecdotes.anecdotesIDs.map(
      anecdotesID => anecdotes.anecdotesList[anecdotesID]
    ),
  selectAnecdoteDetailsFromID: (
    { anecdotes }: RootStateType,
    anecdoteID: number
  ) => anecdotes.anecdotesList[anecdoteID],
};
