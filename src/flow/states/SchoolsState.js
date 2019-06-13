// @flow
/* eslint-disable no-undef */

declare type NormalizedSchoolType = {
  entities: { schoolsList: { [number]: SchoolsType } },
  result: number[],
};

declare type SchoolsStoreType = {
  schoolsList: { [number]: SchoolsType },
  schoolsIDs: number[],
  mapSchoolsToCities: { [number]: number[] },
  favoriteSchools: number[],
};

declare type SchoolsDisplayableType = SchoolsType[];
