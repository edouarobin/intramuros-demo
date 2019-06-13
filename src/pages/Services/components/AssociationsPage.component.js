// @flow
import React, { PureComponent } from 'react';
import { View, Text, StatusBar, ScrollView } from 'react-native';
import {
  GoBackButtonWithTitleBlock,
  AssosFlatlist,
  Loader,
} from 'Intramuros/src/components';
import { indexOf, size } from 'lodash';

type PropsType = {
  navigation: any,
  selectedCity: CityType,
  assos: AssosDisplayableType,
  selectedAssosNotification: number[],
  toggleAssoNotification: (id: number, assoName: string) => void,
};

type StateType = {};

export default class AssociationsPage extends PureComponent<
  PropsType,
  StateType
> {
  render() {
    const { assos, selectedAssosNotification } = this.props;
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
          title="Associations"
        />
        {size(assos) > 0 ? (
          <AssosFlatlist
            assosList={assos}
            selectedCity={this.props.selectedCity}
            selectedAssosNotification={selectedAssosNotification}
            toggleAssoNotification={this.props.toggleAssoNotification}
            navigation={this.props.navigation}
          />
        ) : (
          <Loader
            isLoading
            message="Chargement des associations de la commune ..."
            fullpage
          />
        )}
      </View>
    );
  }
}
