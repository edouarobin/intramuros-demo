// @flow

import { enhanceActionCreators } from 'redux-async-actions-factory';

import actionTypes, { storeName, asyncActionsNames } from './actionTypes';

export default {
  ...enhanceActionCreators(storeName, asyncActionsNames, actionTypes),
};
