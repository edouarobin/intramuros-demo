// @flow

import { enhanceActionCreators } from 'redux-async-actions-factory';
import actionTypes, { apiActionsNames, storeName } from './actionTypes';

const actionCreators: Object = {
  ...enhanceActionCreators(storeName, apiActionsNames, actionTypes),
};

export default actionCreators;
