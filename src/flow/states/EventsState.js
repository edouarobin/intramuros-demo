// @flow
/* eslint-disable no-undef */

declare type NormalizedEventsType = {
  entities: { eventsList: { [number]: EventType } },
  result: number[],
};
declare type EventsListType = {
  [number]: EventType,
};
declare type EventsStoreType = {
  eventsList: { [number]: EventType },
  currentEventIDs: number[],
  futureEventIDs: number[],
};

declare type EventsDisplayableType = EventType[];
