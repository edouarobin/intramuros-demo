// @flow

import {
  enhanceReducer,
  enhanceDefaultState,
} from 'redux-async-actions-factory';

// import { getClosestCityId } from 'Intramuros/src/services/GeoLocation';

import actionTypes, { asyncActionsNames, storeName } from './actionTypes.js';

import { logSelectCity, logUnSelectCity } from './../utils';
import { find, cloneDeep, toString, toNumber } from 'lodash';
import { subscribe, unSubscribe } from '../../utils/subscriptions.js';
import { logSubscribe, logUnSubscribe } from './../utils';

export const defaultState: CitiesStoreType = {
  ...enhanceDefaultState(asyncActionsNames),
  citiesList: {},
  orderedAZCities: [],
  selectedCity: null,
  modalVisible: false,
  aroundMe: { latitude: null, longitude: null },
  citiesNotification: [],
  citiesLoading: false,
};

const citiesReducer = (state: CitiesStoreType, action: *): CitiesStoreType => {
  switch (action.type) {
    case actionTypes.REQUEST.GET_CITIES.SUCCESS:
      //Clean des villes selectionnées pour les notifications
      myCitiesNotification = cloneDeep(state.citiesNotification);
      if (action.payload.orderedAZCities && myCitiesNotification) {
        //Clean des villes sélectionnés obsolètes
        myCitiesNotification = myCitiesNotification.reduce(function(
          result,
          id
        ) {
          if (action.payload.orderedAZCities.indexOf(id) > -1) {
            result.push(id);
            subscribe(toString(id));
          } else {
            unSubscribe(toString(id));
          }
          return result;
        },
        []);
      }

      return {
        ...state,
        citiesList: action.payload.normalizedCities,
        orderedAZCities: action.payload.orderedAZCities,
        citiesNotification: myCitiesNotification,
        citiesLoading: false,
      };
    case actionTypes.REQUEST.GET_CITIES.START:
      console.log('REQUEST.GET_CITIES.START ******/');

      return {
        ...state,
        citiesLoading: true,
      };

    case actionTypes.REQUEST.GET_CITIES.FAILED:
      console.log('REQUEST.GET_CITIES.FAILED ******/');

      return {
        ...state,
        citiesLoading: false,
      };

    case actionTypes.SELECT_CITY:
      let citiesNotification = cloneDeep(state.citiesNotification);
      let cityNotificationAlreadyEnabled =
        citiesNotification.indexOf(action.payload.id) > -1;

      if (action.payload.notification) {
        subscribe(toString(action.payload.id));

        if (!cityNotificationAlreadyEnabled) {
          citiesNotification.push(action.payload.id);
          logSubscribe(action.payload.id, action.payload.cityName);
        }
      } else {
        //Remove city from notification
        unSubscribe(toString(action.payload.id));

        if (cityNotificationAlreadyEnabled) {
          citiesNotification = citiesNotification.reduce(function(result, id) {
            if (id !== action.payload.id) {
              result.push(id);
            }
            return result;
          }, []);
        }
      }
      console.log({ citiesNotification });

      let _newCity = find(state.citiesList, {
        id: toNumber(action.payload.id),
      });
      let _oldCity = find(state.citiesList, {
        id: toNumber(state.selectedCity),
      });

      if (_oldCity && _oldCity !== _newCity) {
        logUnSelectCity(_oldCity.name, _oldCity.id);
      }
      if (_newCity) {
        logSelectCity(_newCity.name, _newCity.id);
      }

      return {
        ...state,
        modalVisible: false,
        selectedCity: action.payload.id,
        selectedAgglo: action.payload.aggloId,
        aroundMe: { latitude: null, longitude: null },
        citiesNotification: citiesNotification,
      };

    case actionTypes.TOGGLE_CITY_NOTIFICATION:
      const idCity = action.payload.id;
      let newCitiesNotification = cloneDeep(state.citiesNotification);
      const isDelete = newCitiesNotification.indexOf(idCity) > -1;

      if (isDelete) {
        unSubscribe(toString(idCity));
        logUnSubscribe(idCity, action.payload.cityName);
        newCitiesNotification = newCitiesNotification
          ? newCitiesNotification.filter(id => id !== idCity)
          : [];
      } else {
        subscribe(toString(idCity));
        logSubscribe(idCity, action.payload.cityName);
        newCitiesNotification.push(action.payload.id);
      }
      console.log(newCitiesNotification);
      console.log(state.citiesNotification);

      return {
        ...state,
        citiesNotification: newCitiesNotification,
      };
    // case actionTypes.SELECT_AROUND_ME: {
    //   const selectedCity = getClosestCityId(
    //     action.payload.coords,
    //     state.citiesList
    //   );

    //   const selectedAggloId = (state && state.citiesList && selectedCity && state.citiesList[selectedCity]) ? state.citiesList[selectedCity].agglo_id : null;

    //   let _newCity = find(state.citiesList, { 'id': selectedCity })
    //   let _oldCity = find(state.citiesList, { 'id': state.selectedCity })

    //   if (_oldCity && _oldCity !== _newCity) {
    //     logUnSelectCity(_oldCity.name, _oldCity.id);
    //   }
    //   if (_newCity) {
    //     logSelectCity(_newCity.name, _newCity.id);
    //   }

    //   return {
    //     ...state,
    //     modalVisible: false,
    //     selectedCity,
    //     selectedAgglo: selectedAggloId,
    //     //aroundMe: action.payload.coords,
    //     // Le bouton "Me géolocaliser" sélectionne automatiquement la ville la plus proche
    //     aroundMe: { latitude: null, longitude: null },
    //   };
    // }
    case actionTypes.OPEN_MODAL:
      return {
        ...state,
        modalVisible: true,
      };
    case actionTypes.CLOSE_MODAL:
      return {
        ...state,
        modalVisible: false,
      };
    default:
      return state;
  }
};

export default (
  state: CitiesStoreType = defaultState,
  action: any
): CitiesStoreType =>
  enhanceReducer(storeName, state, action, defaultState, citiesReducer);
