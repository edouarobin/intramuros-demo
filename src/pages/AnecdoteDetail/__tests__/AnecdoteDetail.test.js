// @flow-weak

import React from 'react';
import renderer from 'react-test-renderer';

import AnecdoteDetail from '../AnecdoteDetail.component';

const mockAnecdoteDetails = {
  title: 'Recette : La soupe angevine',
  description: `Découvrez ce cocktail angevin qui perdrait de son charme si on remplaçait le cointreau par de la  liqueur. On peut remplacer le crémant par du mousseux, ce qui est moins coûteux. 
  
  Tout d’abord, vous devez vous munir des ingrédients suivants :
  
       1 bouteille de crémant de Loire
       1 citron
       15 cl de cointreau
       12 cl de sirop de sucre de Cannes
  
  Tout en laissant la bouteille de crémant de Loire bien au frais, commencez par presser le citron
  Découvrez ce cocktail angevin qui perdrait de son charme si on remplaçait le cointreau par de la  liqueur. On peut remplacer le crémant par du mousseux, ce qui est moins coûteux. 
  
  Tout d’abord, vous devez vous munir des ingrédients suivants :
  
       1 bouteille de crémant de Loire
       1 citron
       15 cl de cointreau
       12 cl de sirop de sucre de Cannes`,
  createdAt: '2017-11-10T15:06:03.295894Z',
  updatedAt: '2017-11-28T17:09:19.978928Z',
  image:
    'https://elasticbeanstalk-eu-west-2-309758705895.s3.amazonaws.com/anecdotes/6cba01e87dab75af0bf4e7b662212ce2_Recette___D%C3%A9couvrez_.jpg',
  id: 1,
};

it('Fully renders the AnecdoteDetails page', () => {
  const tree = renderer
    .create(
      <AnecdoteDetail navigation={{}} anecdoteDetails={mockAnecdoteDetails} />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
