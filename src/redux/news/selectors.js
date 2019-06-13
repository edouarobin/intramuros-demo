// @flow

import { enhanceSelectors } from 'redux-async-actions-factory';
import { isEqual, filter, orderBy } from 'lodash';
import memoizeOne from 'memoize-one';

import { asyncActionsNames, storeName } from './actionTypes';

const getNews = (newsList, selectedCity, selectedAgglo) => {
  return orderBy(
    filter(
      newsList,
      news =>
        news && (news.city === selectedCity || news.agglo === selectedAgglo)
    ),
    'updatedAt',
    'desc'
  );
};

const getNewsMemoization = memoizeOne(getNews, isEqual);

export default {
  ...enhanceSelectors(storeName, asyncActionsNames),
  news: ({ news, cities }: RootStateType): NewsDisplayableType | null =>
    getNewsMemoization(
      news.newsList,
      cities.selectedCity,
      cities.selectedAgglo
    ),
  selectNewsDetailsFromID: ({ news }: RootStateType, newsID: number) =>
    news && news.newsList && news.newsList[newsID] ? news.newsList[newsID] : {},
};
