// @flow
import { orderBy } from 'lodash';

export const getFiltersCounterFromEvents = (events: EventType[]) => {
  //   //On calcule les compteurs des filtres en parcourant tous les événements.
  let categoriesCounter = {};
  events.map(event => {
    if (event.category) {
      if (categoriesCounter[event.category]) {
        categoriesCounter[event.category] =
          categoriesCounter[event.category] + 1;
      } else {
        categoriesCounter[event.category] = 1;
      }
    }
  });
  return categoriesCounter;
};

export const calculateMyFilters = (currentFilters, myCounters) => {
  let myFilters = currentFilters ? currentFilters : [];
  //On ajoute le compteur à chaque item filter
  myFilters.map(item => {
    item.counter = myCounters && myCounters[item.id] ? myCounters[item.id] : 0;
    return item;
  });
  //On affiche les filtres qui ont le plus d'événements en premier
  myFilters = orderBy(myFilters, ['counter'], ['desc']);
  return myFilters;
};
