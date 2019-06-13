// @flow

import { enhanceActionCreators } from 'redux-async-actions-factory';

import actionTypes, { storeName, asyncActionsNames } from './actionTypes';

export const selectCity = (
  id: number,
  aggloId: number,
  cityName: string,
  notification?: boolean
) => ({
  type: actionTypes.SELECT_CITY,
  payload: {
    id,
    aggloId,
    cityName,
    notification,
  },
});

export const toggleCityNotification = (id: number, cityName: string) => ({
  type: actionTypes.TOGGLE_CITY_NOTIFICATION,
  payload: {
    id,
    cityName,
  },
});

export const openModal = () => ({ type: actionTypes.OPEN_MODAL });

export const closeModal = () => ({ type: actionTypes.CLOSE_MODAL });

export default {
  ...enhanceActionCreators(storeName, asyncActionsNames, actionTypes),
  selectCity,
  toggleCityNotification,
  openModal,
  closeModal,
};
