// @flow-weak

import React from 'react';
import renderer from 'react-test-renderer';

import DiscoverDetail from '../DiscoverDetail.component';

it('Fully renders the DiscoverDetails page', () => {
  const mockPointOfInterestDetails = {
    title: 'Château de Brézé',
    description: 'qzf hzmEF HQZMEF QMZOEF ZQMF ',
    category: 'Château',
    createdAt: '2017-11-16T15:42:46.804527Z',
    updatedAt: '2017-11-16T22:51:24.862558Z',
    city: 1,
    images: ['https://el…', 'https://el…'],
    addressLabel: '2 Rue du Château, 49260 Brézé, France',
    latitude: 47.1746017,
    longitude: -0.0581200999999965,
    id: 4,
    distanceToSelectedCity: 10,
  };
  const tree = renderer
    .create(
      <DiscoverDetail
        navigation={{
          state: {
            params: { pointOfInterestDetails: mockPointOfInterestDetails },
          },
        }}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
