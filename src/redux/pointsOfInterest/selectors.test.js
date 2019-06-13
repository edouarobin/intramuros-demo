// @flow-weak

import selectors from './selectors.js';

jest.mock('redux-async-actions-factory', () => ({
  enhanceSelectors: () => ({}),
  enhanceActionTypes: () => ({}),
}));

describe('select points of interest according to the selected city', () => {
  it('should show the points of interest in the city 1 first', () => {
    const mockStore = {
      cities: {
        aroundMe: {
          latitude: 0,
          longitude: 0,
        },
        selectedCity: 1,
        citiesList: {
          1: {
            title: 'Yolo',
            latitude: 0,
            longitude: 0,
          },
        },
      },
      pointsOfInterest: {
        pointsOfInterestList: {
          '1': {
            title: 'BAM',
            city: 1,
            id: 1,
            latitude: 0,
            longitude: 0,
          },
          '3': {
            title: 'Eglise Azé',
            city: 11,
            id: 3,
            latitude: 0,
            longitude: 0,
          },
          '2': {
            title: 'test',
            city: 1,
            id: 2,
            latitude: 0,
            longitude: 0,
          },
        },
        pointsOfInterestIDs: [1, 2, 3],
      },
    };

    const mockSortedPoi = [
      {
        title: 'BAM',
        city: 1,
        id: 1,
        latitude: 0,
        longitude: 0,
        distanceToSelectedCity: 0,
      },
      {
        title: 'test',
        city: 1,
        id: 2,
        latitude: 0,
        longitude: 0,
        distanceToSelectedCity: 0,
      },
      {
        title: 'Eglise Azé',
        city: 11,
        id: 3,
        latitude: 0,
        longitude: 0,
        distanceToSelectedCity: 0,
      },
    ];

    expect(selectors.pointsOfInterest(mockStore)).toEqual(mockSortedPoi);
  });

  it('should return null', () => {
    const mockStore = {
      cities: {
        aroundMe: {
          latitude: null,
          longitude: null,
        },
        selectedCity: 1,
        citiesList: {
          1: {
            title: 'Yolo',
            latitude: 0,
            longitude: 0,
          },
        },
      },
      pointsOfInterest: {},
      pointsOfInterestIDs: [],
    };

    const mockSortedPoi = null;

    expect(selectors.pointsOfInterest(mockStore)).toEqual(mockSortedPoi);
  });
});
