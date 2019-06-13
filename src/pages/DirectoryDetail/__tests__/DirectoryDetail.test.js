// @flow-weak

import React from 'react';
import renderer from 'react-test-renderer';

import DirectoryDetail from '../DirectoryDetail.component';

it('Fully renders the DirectoryDetails page', () => {
  const mockDirectory = {
    title: 'Mairie',
  };
  const tree = renderer
    .create(
      <DirectoryDetail
        navigation={{
          state: {
            params: { directory: mockDirectory },
          },
        }}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
