// @flow

import { normalize, schema } from 'normalizr';

import { modelizeEvent } from './modelizer';

const event = new schema.Entity(
  'eventsList',
  {},
  { processStrategy: modelizeEvent }
);
const events = [event];

export const eventNormalizer = (
  apiEvents: ApiEventType
): NormalizedEventsType => {
  const normalizedData = normalize(apiEvents, events);
  return normalizedData;
};

const oneEvent = new schema.Entity(
  'event',
  {},
  { processStrategy: modelizeEvent }
);

export const oneEventNormalizer = (
  apiEvent: ApiEventType
): NormalizedEventsType => {
  const normalizedData = normalize(apiEvent, oneEvent);
  return normalizedData;
};
