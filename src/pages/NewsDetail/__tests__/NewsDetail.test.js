// @flow-weak

import React from 'react';
import renderer from 'react-test-renderer';

import NewsDetail from '../NewsDetail.component';

it('Fully renders the NewsDetails page', () => {
  const mockNewsDetails = {
    title: 'News !',
    description: 'dflkjs lkjsdl kfjsdlkj sdlk efef fsf ds f',
    createdAt: '2017-11-08T15:20:33.457740Z',
    updatedAt: '2017-11-14T10:41:36.111827Z',
    city: 5,
    image:
      'https://intramuros.cloud.bam.tech/media/news/673243e4d9232489945e19bff3ec85e9_News__dflkjs_lkj.png',
    id: 1,
  };
  const tree = renderer
    .create(<NewsDetail navigation={{}} newsDetails={mockNewsDetails} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
