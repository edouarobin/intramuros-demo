// @flow
/* eslint-disable no-undef */

declare type NormalizedAnecdoteType = {
  entities: { anecdotesList: { [number]: AnecdoteType } },
  result: number[],
};

declare type AnecdotesStoreType = {
  anecdotesList: { [number]: AnecdoteType },
  anecdotesIDs: number[],
};

declare type AnecdotesDisplayableType = AnecdoteType[];
