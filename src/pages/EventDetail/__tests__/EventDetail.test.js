// @flow-weak

import React from 'react';
import renderer from 'react-test-renderer';

import EventDetail from '../EventDetail.component';

const mockEventDetails = {
  title: 'title',
  description: 'description',
  author: 'author',
  startDate: '2017-06-12',
  endDate: '2017-06-15',
  city: 2,
  id: 1,
  addressLabel: '48 boulevard des Batignolles, 75013 Paris',
};

it('Fully renders the EventDetails page', () => {
  const tree = renderer
    .create(<EventDetail navigation={{}} eventDetails={mockEventDetails} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
