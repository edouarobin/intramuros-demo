// @flow

import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { Page, CitiesFlatlist, Loader } from 'Intramuros/src/components';

import { Text, View, Platform, Alert } from 'react-native';

import {
  requestAuthorisationPosition,
  getCurrentPosition,
  getClosestCity,
} from 'Intramuros/src/services/GeoLocation';

import {
  headerContainer,
  screenWidth,
  headerTitle,
} from 'Intramuros/src/style/globalStyle';
import { refreshUserPropertyWithSelectedCity } from './../../redux/utils';
import { logLaunchApp } from '../../redux/utils';

type PropsType = {
  navigation: any,
  fetchCities: () => void,
  citiesList: CitiesDisplayableType,
  selectCity: (id: number, aggloId: number, cityName: string) => void,
  citiesLoading: boolean,
};

export default class SelectCity extends Component<PropsType> {
  citySelector = (city: CityType) => {
    this.props.selectCity(city.id, city.agglo_id, city.name);
    this.props.navigation.reset(
      [NavigationActions.navigate({ routeName: 'MainTabBar' })],
      0
    );
  };

  reloadListOfCities = () => {
    console.log("nouvelle tentative d'affichage des communes !");
    this.props.fetchCities();
  };

  findLocation = async () => {
    try {
      if (Platform.OS === 'ios') {
        await requestAuthorisationPosition();
      }
      const position = await getCurrentPosition();
      const newSelectedCity = getClosestCity(
        {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
        this.props.citiesList
      );
      this.props.selectCity(
        newSelectedCity.id,
        newSelectedCity.agglo_id,
        newSelectedCity.name
      );
      this.props.navigation.navigate('EventList');
    } catch (err) {
      this.setState({ error: err });
      console.log(
        'All exceptions raise GPS errors, but it might be something else',
        err
      );
      Alert.alert(
        'Position introuvable',
        'Veuillez activer votre service de localisation et autoriser IntraMuros à y acceder.',
        [{ text: 'OK' }],
        {
          cancelable: false,
        }
      );
    }
  };

  componentWillMount() {
    //Si la ville est déja sélectionnée on ne réaffiche pas cet écran à chaque fois et on passe à la suite.
    const selectedCity = this.props.selectedCity;
    if (selectedCity) {
      refreshUserPropertyWithSelectedCity(selectedCity.name, selectedCity.id);
      logLaunchApp(selectedCity.name, selectedCity.id);
      console.log('City already selected go to MainTabBar directly !');
      this.props.navigation.reset(
        [NavigationActions.navigate({ routeName: 'MainTabBar' })],
        0
      );
    } else {
      this.props.fetchCities();
      console.log('city is not yet selected');
    }
  }

  render() {
    return (
      <Page noPadding>
        <View
          style={[
            headerContainer,
            {
              maxWidth: screenWidth,
              justifyContent: 'center',
              flexDirection: 'row',
              alignItems: 'center',
            },
          ]}
        >
          <Text
            style={[
              headerTitle,
              {
                textAlign: 'center',
                marginHorizontal: 16,
              },
            ]}
            numberOfLines={2}
          >
            Sélectionnez votre commune
          </Text>
        </View>

        <CitiesFlatlist
          citiesList={this.props.citiesList}
          onCityPress={this.citySelector}
          notificationDisable={true}
          findLocation={this.findLocation}
          refresh={this.reloadListOfCities}
          isLoading={this.props.citiesLoading}
        />
        <Loader
          isLoading={this.props.citiesLoading}
          message="Chargement des communes"
          fullpage={
            !this.props.citiesList || this.props.citiesList.length === 0
          }
        />
      </Page>
    );
  }
}
