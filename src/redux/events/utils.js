// @flow

import { isAfter, isToday, isTomorrow } from 'date-fns';
import {
  fastDistanceConverter,
  distanceMaxForDisplay,
} from 'Intramuros/src/services/GeoLocation';
import memoizeOne from 'memoize-one';
import { filter, size, map, indexOf, isEqual } from 'lodash';

export const isCurrentEvent = (startDate: Date, endDate: Date) => {
  let now = new Date();
  return (
    (isAfter(now, startDate) || isToday(startDate)) &&
    (isAfter(endDate, now) || isToday(endDate))
  );
};

export const isEventStartTomorrow = (startDate: Date) => {
  return isTomorrow(startDate);
};

export const isEventStartToday = (startDate: Date) => {
  return isToday(startDate);
};

export const isCityEvent = (
  event: EventType,
  cityId: number,
  aggloId: number
) => {
  if (event) {
    return isEqual(event.city, cityId) || isEqual(event.agglo, aggloId);
  }
  return false;
};

export const getAllEventsFiltered = (
  eventDistance: number,
  eventsList: { [number]: EventType },
  selectedCity: number,
  selectedAgglo: number,
  longitude,
  latitude
) => {
  let allEventsFiltered = {
    all: [],
    boostEvents: [],
    cityEvents: [],
    aroundEvents: [],
  };
  if (size(eventsList) > 0) {
    let all = [];
    let boostEvents = [];
    let cityEvents = [];
    let aroundEvents = [];

    //Si pas de distance dans les settings, on prend par défaut (40km)
    const distanceMax = eventDistance ? eventDistance : distanceMaxForDisplay;
    console.log('distanceMax = ' + distanceMax);

    let allEvents = map(eventsList, event => {
      //Ajout des infos sur la distance
      event.distanceToPositionOrCity = fastDistanceConverter(event, {
        longitude,
        latitude,
      });
      event.displayedDistanceToPositionOrCity =
        selectedCity === event.city
          ? ''
          : `${parseInt(event.distanceToPositionOrCity / 1000, 0)} km`;

      //A la une (boost event)
      if (isABoostEvent(event, selectedCity, selectedAgglo, distanceMax)) {
        boostEvents.push(event);
      }

      //Ma commune & Aux alentours
      if (isCityEvent(event, selectedCity, selectedAgglo)) {
        //Ma commune
        cityEvents.push(event);
        all.push(event);
      } else if (
        !event.private &&
        event.distanceToPositionOrCity < distanceMax
      ) {
        //Aux alentours: non privés et < distance max
        aroundEvents.push(event);
        all.push(event);
      }
      return event;
    });

    all = all.sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime() ||
        a.distanceToPositionOrCity - b.distanceToPositionOrCity
    );
    allEventsFiltered.all = all;

    //sort boostEvents
    boostEvents = boostEvents.sort(
      (a, b) =>
        a.distanceToPositionOrCity - b.distanceToPositionOrCity ||
        // Tri par rapport à la date de début. Les plus récents en premier.
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime() ||
        // Tri par rapport à la durée de l'event. Les plus courts en premier.
        new Date(a.endDate).getTime() -
          new Date(a.startDate).getTime() -
          (new Date(b.endDate).getTime() - new Date(b.startDate).getTime())
    );
    allEventsFiltered.boostEvents = boostEvents;

    //sort cityEvents Ma commune
    cityEvents = cityEvents.sort(
      (a, b) =>
        // Les plus récents en premier.
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );
    allEventsFiltered.cityEvents = cityEvents;

    //sort aroundEvents aux alentours
    aroundEvents = aroundEvents.sort(
      (a, b) =>
        // Les plus récents en premier.
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime() ||
        a.distanceToPositionOrCity - b.distanceToPositionOrCity
    );
    allEventsFiltered.aroundEvents = aroundEvents;
    return allEventsFiltered;
  }
  return allEventsFiltered;
};

const isABoostEvent = (
  event: EventType,
  selectedCityId: number,
  selectedAggloId: number,
  distanceMax: number
) => {
  // A - evenement dans ma commune OU dans mon interco
  // Conditions: commence demain OU en ce moment
  if (isCityEvent(event, selectedCityId, selectedAggloId)) {
    return (
      isEventStartTomorrow(event.startDate) ||
      isCurrentEvent(event.startDate, event.endDate)
    );
  }
  // B - evenement aux alentours
  // Conditions: (commence demain OU aujourd'hui) ET < distanceMax ET non privé
  else {
    return (
      (isEventStartTomorrow(event.startDate) ||
        isEventStartToday(event.startDate)) &&
      !event.private &&
      event.distanceToPositionOrCity < distanceMax
    );
  }
  return false;
};
