// @flow

import { enhanceActionCreators } from 'redux-async-actions-factory';

import actionTypes, { storeName, asyncActionsNames } from './actionTypes';

export const toggleAssosNotification = (id: number, assoName: string) => ({
  type: actionTypes.TOGGLE_ASSOS_NOTIFICATION,
  payload: {
    id,
    assoName,
  },
});

export default {
  ...enhanceActionCreators(storeName, asyncActionsNames, actionTypes),
  toggleAssosNotification,
};
