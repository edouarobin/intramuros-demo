// @flow
import React, { PureComponent } from 'react';
import { View, Text, StatusBar, ScrollView } from 'react-native';
import {
  GoBackButtonWithTitleBlock,
  SchoolsFlatlist,
  Loader,
} from 'Intramuros/src/components';
import { indexOf, size } from 'lodash';

type PropsType = {
  navigation: any,
  selectedCity: CityType,
  schools: SchoolsDisplayableType,
  favoriteSchools: number[],
  saveFavoriteSchoolId: (id: number) => void,
  removeFavoriteSchoolId: (id: number) => void,
};

type StateType = {};

export default class SchoolsPage extends PureComponent<PropsType, StateType> {
  render() {
    const { schools, favoriteSchools } = this.props;
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
          title="Établissements scolaires"
        />
        {size(schools) > 0 ? (
          <SchoolsFlatlist
            schoolsList={schools}
            selectedCity={this.props.selectedCity}
            favoriteSchools={favoriteSchools}
            saveFavoriteSchoolId={this.props.saveFavoriteSchoolId}
            removeFavoriteSchoolId={this.props.removeFavoriteSchoolId}
            navigation={this.props.navigation}
          />
        ) : (
          <Loader
            isLoading
            message="Chargement des établissements scolaires"
            fullpage
          />
        )}
      </View>
    );
  }
}
