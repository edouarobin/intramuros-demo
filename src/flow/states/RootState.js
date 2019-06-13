// @flow
/* eslint-disable no-undef */

declare type RootStateType = {
  cities: CitiesStoreType,
  events: EventsStoreType,
  categories: CategoriesStoreType,
  news: NewsStoreType,
  toaster: ToasterStoreType,
  pointsOfInterest: PointsOfInterestStoreType,
  directories: DirectoriesStoreType,
  anecdotes: AnecdotesStoreType,
  surveys: SurveysStoreType,
  schools: SchoolsStoreType,
  associations: AssosStoreType,
  commerces: CommercesStoreType,
  settings: SettingsStoreType,
};

declare type actionType = {
  type: string,
  payload: {
    [string]: any,
  },
};
