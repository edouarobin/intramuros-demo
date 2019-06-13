// @flow
/* eslint-disable no-undef */

declare type NormalizedNewsType = {
  entities: { newsList: { [number]: NewsType } },
  result: number[],
};

declare type NewsStoreType = {
  newsList: { [number]: NewsType },
  newsIDs: number[],
};

declare type NewsDisplayableType = NewsType[];
