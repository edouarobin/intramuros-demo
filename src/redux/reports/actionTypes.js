// @flow

import { enhanceActionTypes } from 'redux-async-actions-factory';

export const storeName = 'REPORTS';
export const apiActionsNames = ['SEND_REPORT'];

export default {
  ...enhanceActionTypes(storeName, apiActionsNames),
};
