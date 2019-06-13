// @flow
/* eslint-disable no-undef */

declare type NormalizedPointsOfInterestType = {
  entities: { pointsOfInterestList: { [number]: PointOfInterestType } },
  result: number[],
};

declare type PointsOfInterestStoreType = {
  pointsOfInterestList: { [number]: PointOfInterestType },
  pointsOfInterestIDs: number[],
};

declare type PointsOfInterestDisplayableType = PointOfInterestType[];
