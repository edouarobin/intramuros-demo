// @flow

import { persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
// import { AsyncStorage as OldAsyncStorage } from 'react-native'
import getStoredStateMigrateV4 from 'redux-persist/lib/integration/getStoredStateMigrateV4';
import { reducer as citiesReducer } from './cities';
import { reducer as eventsReducer } from './events';
import { reducer as categoriesReducer } from './categories';
import { reducer as newsReducer } from './news';
import { reducer as anecdotesReducer } from './anecdotes';
import { reducer as toasterReducer } from './toaster';
import { reducer as pointsOfInterestReducer } from './pointsOfInterest';
import { reducer as directoriesReducer } from './directories';
import { reducer as reportsReducer } from './reports';
import { reducer as surveysReducer } from './surveys';
import { reducer as schoolsReducer } from './schools';
import { reducer as associationsReducer } from './associations';
import { reducer as commercesReducer } from './commerces';
import { reducer as settingsReducer } from './settings';

// clearOldStorage = async () => {
//   try {
//     const value = await OldAsyncStorage.getItem('persist:primary')
//     console.log(value)
//     OldAsyncStorage.clear(() => {
//       console.log('clear')
//     })
//   } catch (e) {
//     // read error
//   }
// }

// //Migration. A supprimer à la prochaine version. Evite d'avoir un ancien storage qui prend de la place.
// clearOldStorage()

// const oldConfigV4 = {
//   storage: OldAsyncStorage,
//   whitelist: [
//     'cities',
//     'events',
//     'categories',
//     'news',
//     'pointsOfInterest',
//     'directories',
//     'reports',
//     'anecdotes',
//     'surveys',
//     'schools',
//   ],
// }

const rootConfig = {
  key: 'root',
  storage: AsyncStorage,
  // getStoredState: getStoredStateMigrateV4(oldConfigV4),
  blacklist: [
    'events',
    'cities',
    'categories',
    'anecdotes',
    'news',
    'pointsOfInterest',
    'directories',
    'reports',
    'surveys',
    'schools',
    'associations',
    'commerces',
  ],
};

const rootReducer = combineReducers({
  events: persistReducer(
    {
      key: 'events',
      storage: AsyncStorage,
    },
    eventsReducer
  ),
  cities: persistReducer(
    {
      key: 'cities',
      storage: AsyncStorage,
    },
    citiesReducer
  ),
  categories: persistReducer(
    {
      key: 'categories',
      storage: AsyncStorage,
    },
    categoriesReducer
  ),
  news: persistReducer(
    {
      key: 'news',
      storage: AsyncStorage,
    },
    newsReducer
  ),
  anecdotes: persistReducer(
    {
      key: 'anecdotes',
      storage: AsyncStorage,
    },
    anecdotesReducer
  ),
  pointsOfInterest: persistReducer(
    {
      key: 'pointsOfInterest',
      storage: AsyncStorage,
    },
    pointsOfInterestReducer
  ),
  directories: persistReducer(
    {
      key: 'directories',
      storage: AsyncStorage,
    },
    directoriesReducer
  ),
  reports: persistReducer(
    {
      key: 'reports',
      storage: AsyncStorage,
    },
    reportsReducer
  ),
  surveys: persistReducer(
    {
      key: 'surveys',
      storage: AsyncStorage,
    },
    surveysReducer
  ),
  schools: persistReducer(
    {
      key: 'schools',
      storage: AsyncStorage,
    },
    schoolsReducer
  ),
  associations: persistReducer(
    {
      key: 'associations',
      storage: AsyncStorage,
    },
    associationsReducer
  ),
  commerces: persistReducer(
    {
      key: 'commerces',
      storage: AsyncStorage,
    },
    commercesReducer
  ),
  toaster: toasterReducer,
  settings: settingsReducer,
});

export default persistReducer(rootConfig, rootReducer);
