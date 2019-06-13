// @flow
/* eslint-disable no-undef */

declare type NormalizedDirectoryType = {
  entities: { directoriesList: { [number]: DirectoryType } },
  result: number[],
};

declare type DirectoriesStoreType = {
  directoriesList: { [number]: DirectoryType },
  directoriesIDs: number[],
  mapDirectoriesToCities: { [number]: number[] },
};

declare type DirectoriesDisplayableType = DirectoryType[];
