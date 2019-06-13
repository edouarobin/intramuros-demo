// @flow
/* eslint-disable no-undef */

declare type PointOfInterestType = {
  title: string,
  description: string,
  category: string | null,
  createdAt: string,
  updatedAt: string,
  city: number,
  images: string[],
  addressLabel: string,
  latitude: number,
  longitude: number,
  id: number,
  distanceToSelectedCity?: number | null,
  url1: string,
  url2: string,
  url3: string,
  schedule: string,
  price: string,
  croppedData: string,
};
