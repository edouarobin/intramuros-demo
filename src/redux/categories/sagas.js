// @flow

import { put, all, takeLatest } from 'redux-saga/effects';

import { enhanceSagaCall } from 'Intramuros/src/redux/sagaEnhancer';

import { calculateDefaultCategories } from './utils';
import { getCategories } from './api';
import { categoryNormalizer } from './normalizer';
import actionTypes from './actionTypes';
import actionCreators from './actionCreators';

export function* getCategoriesSaga(): Generator<*, *, *> {
  try {
    const categories: ApiCategoryType = yield enhanceSagaCall(
      getCategories,
      'GET'
    );
    const normalizedCategories: NormalizedCategoriesType = categoryNormalizer(
      categories
    );
    const { defaultCategoryIDs, categoryIDs } = calculateDefaultCategories(
      normalizedCategories.entities.categoriesList
    );

    yield put(
      actionCreators.requestGetCategoriesSuccess({
        categoriesList: normalizedCategories.entities.categoriesList,
        defaultCategoryIDs,
        categoryIDs,
      })
    );
  } catch (err) {
    yield put(actionCreators.requestGetCategoriesFailed(err));
  }
}

export default function* categoriesRootSaga(): Generator<*, *, *> {
  yield all([
    takeLatest(actionTypes.REQUEST.GET_CATEGORIES.START, getCategoriesSaga),
  ]);
}
