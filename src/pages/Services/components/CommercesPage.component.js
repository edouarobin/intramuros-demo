// @flow
import React, { PureComponent } from 'react';
import { View, Text, StatusBar, ScrollView } from 'react-native';
import {
  GoBackButtonWithTitleBlock,
  CommercesFlatlist,
  Loader,
} from 'Intramuros/src/components';
import { indexOf, size } from 'lodash';

type PropsType = {
  navigation: any,
  selectedCity: CityType,
  commerces: CommercesDisplayableType,
  favoriteCommerces: number[],
  saveFavoriteCommerceId: (id: number) => void,
  removeFavoriteCommerceId: (id: number) => void,
};

type StateType = {};

export default class CommercesPage extends PureComponent<PropsType, StateType> {
  render() {
    const {
      selectedCity,
      commerces,
      favoriteCommerces,
      saveFavoriteCommerceId,
      removeFavoriteCommerceId,
    } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
          animated={true}
        />

        <GoBackButtonWithTitleBlock
          navigation={this.props.navigation}
          color="black"
          title="Commerces"
        />
        {size(commerces) > 0 ? (
          <CommercesFlatlist
            commercesList={commerces}
            selectedCity={selectedCity}
            favoriteCommerces={favoriteCommerces}
            saveFavoriteCommerceId={saveFavoriteCommerceId}
            removeFavoriteCommerceId={removeFavoriteCommerceId}
            navigation={this.props.navigation}
          />
        ) : (
          <Loader isLoading message="Chargement des commerces" fullpage />
        )}
      </View>
    );
  }
}
