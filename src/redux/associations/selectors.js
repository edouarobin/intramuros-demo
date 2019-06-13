// @flow

import { enhanceSelectors } from 'redux-async-actions-factory';
import { orderBy, forEach, find, isEmpty, toNumber } from 'lodash';
import { isAfter, isToday } from 'date-fns';
import { asyncActionsNames, storeName } from './actionTypes';

export default {
  ...enhanceSelectors(storeName, asyncActionsNames),
  assos: ({
    associations,
    cities,
  }: RootStateType): SurveysDisplayableType | null => {
    if (
      associations &&
      cities &&
      associations.assosList &&
      associations.assosList[cities.selectedCity]
    ) {
      return associations.assosList[cities.selectedCity];
    }
    return null;
  },
  selectAssosFromID: (
    { associations }: RootStateType,
    assoID: number,
    cityOfAsso?: number
  ) => {
    let assoFounded = null;
    if (associations && associations.assosList) {
      if (cityOfAsso) {
        assoFounded = find(associations.assosList[cityOfAsso], {
          id: toNumber(assoID),
        });
      } else {
        //On ne connait pas la city de l'asso, on passe en revue toutes la liste.
        forEach(associations.assosList, assos => {
          let asso = find(assos, { id: toNumber(assoID) });
          if (!isEmpty(asso)) {
            assoFounded = asso;
            return false;
          }
        });
      }
      return assoFounded;
    }
    return null;
  },
  selectedAssosNotification: (rootState: RootStateType): number[] | null => {
    return rootState.associations.assosNotification;
  },
};
