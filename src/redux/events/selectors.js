// @flow

import { enhanceSelectors } from 'redux-async-actions-factory';
import memoize from 'memoize-one';
import { asyncActionsNames, storeName } from './actionTypes';
import { getAllEventsFiltered } from './utils';
import { isEqual } from 'lodash';

const _getAllEventsFiltered = memoize(
  (
    eventDistance,
    eventsList,
    selectedCity,
    selectedAgglo,
    longitude,
    latitude
  ) =>
    getAllEventsFiltered(
      eventDistance,
      eventsList,
      selectedCity,
      selectedAgglo,
      longitude,
      latitude
    ),
  isEqual
);

export default {
  ...enhanceSelectors(storeName, asyncActionsNames),
  allEventsFiltered: ({
    settings,
    events,
    cities,
  }: RootStateType): EventsDisplayableType | null => {
    return _getAllEventsFiltered(
      settings.eventDistance,
      events.eventsList,
      cities.selectedCity,
      cities.selectedAgglo,
      cities && cities.citiesList && cities.citiesList[cities.selectedCity]
        ? cities.citiesList[cities.selectedCity].longitude
        : null,
      cities && cities.citiesList && cities.citiesList[cities.selectedCity]
        ? cities.citiesList[cities.selectedCity].latitude
        : null
    );
  },
  selectEventDetailsFromID: ({ events }: RootStateType, eventId: number) =>
    events.eventsList[eventId],
};
