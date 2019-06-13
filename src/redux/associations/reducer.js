// @flow

import {
  enhanceReducer,
  enhanceDefaultState,
} from 'redux-async-actions-factory';
import { cloneDeep, indexOf, isEmpty, toString } from 'lodash';
import actionTypes, { asyncActionsNames, storeName } from './actionTypes.js';
import { subscribe, unSubscribe } from '../../utils/subscriptions.js';
import { logUnSubscribeAsso, logSubscribeAsso } from '../../redux/utils';

export const defaultState: AssosStoreType = {
  ...enhanceDefaultState(asyncActionsNames),
  assosList: {},
  // assosIDs: [],
  // mapAssosToCities: {},
  assosNotification: [],
};

const assosReducer = (state: AssosStoreType, action: *) => {
  switch (action.type) {
    case actionTypes.REQUEST.GET_ASSOS.SUCCESS:
      console.log('GET_ASSOS.SUCCESS');
      console.log(action.payload.assosList);
      return {
        ...state,
        assosList: action.payload.assosList,
        // assosIDs: action.payload.assosIDs,
        // mapAssosToCities: action.payload.mapAssosToCities,
      };

    case actionTypes.REQUEST.GET_ASSOS_FROM_CITY.SUCCESS:
      let assosList = cloneDeep(state.assosList);
      if (isEmpty(assosList)) {
        assosList = {};
      }
      if (action.payload.assos) {
        let assos = action.payload.assos;
        let cityId = action.payload.cityId;
        if (assos && cityId) {
          //On met à jour les assos de la commune dans la liste
          assosList[cityId] = assos;
        }
      }

      return {
        ...state,
        assosList: assosList,
      };

    case actionTypes.TOGGLE_ASSOS_NOTIFICATION:
      const idAsso = action.payload.id;
      let newAssosNotification = cloneDeep(state.assosNotification);
      const isDelete = indexOf(newAssosNotification, idAsso) > -1;

      if (isDelete) {
        unSubscribe('asso_' + toString(idAsso));
        logUnSubscribeAsso(idAsso, action.payload.assoName);
        newAssosNotification = newAssosNotification
          ? newAssosNotification.filter(id => id !== idAsso)
          : [];
      } else {
        subscribe('asso_' + toString(idAsso));
        logSubscribeAsso(idAsso, action.payload.assoName);
        newAssosNotification.push(action.payload.id);
      }

      console.log(state.assosNotification);
      console.log(newAssosNotification);

      return {
        ...state,
        assosNotification: newAssosNotification,
      };

    default:
      return state;
  }
};

export default (
  state: AssosStoreType = defaultState,
  action: any
): AssosStoreType =>
  enhanceReducer(storeName, state, action, defaultState, assosReducer);
