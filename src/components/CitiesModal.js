// @flow

import React, { PureComponent } from 'react';
import { Modal, Platform, Alert } from 'react-native';

import {
  HeaderBasicTitle,
  CitiesFlatlist,
  Loader,
} from 'Intramuros/src/components';
import {
  requestAuthorisationPosition,
  getCurrentPosition,
} from 'Intramuros/src/services/GeoLocation';

import _ from 'lodash';

type PropsType = {
  modalVisible: boolean,
  closeModal: () => void,
  citiesList: CitiesDisplayableType,
  selectedCity: CityType,
  selectedCitiesNotification: number[],
  citySelector: CityType => void,
  cityNotificationSelector: CityType => void,
  citiesLoading: boolean,
  selectAroundMe: ({ latitude: number, longitude: number }) => void,
  getCities: () => void,
};

type StateType = {
  error: any,
};

export default class CitiesModal extends PureComponent<PropsType, StateType> {
  state = {
    error: null,
    selectedCitiesNotification: [],
  };

  citySelector = (city: CityType, isCityAlreadySubscribed: boolean) => {
    //Si l'utilisateur a déja souscrit à la commune, pas besoin d'afficher la popup de souscription.
    if (isCityAlreadySubscribed) {
      this.props.citySelector(city, true);
    } else {
      Alert.alert(
        'Notifications',
        'Voulez-vous également vous abonner aux notifications de ' +
          city.name +
          ' ?',
        [
          {
            text: 'Oui',
            onPress: () => {
              this.props.citySelector(city, true);
            },
          },
          { text: 'Non', onPress: () => this.props.citySelector(city, false) },
        ],
        {
          cancelable: false,
        }
      );
    }
  };

  cityNotificationSelector = (city: CityType) => {
    this.props.cityNotificationSelector(city);
  };

  reloadListOfCities = () => {
    this.props.getCities();
  };

  findLocation = async () => {
    try {
      if (Platform.OS === 'ios') {
        await requestAuthorisationPosition();
      }
      const position = await getCurrentPosition();

      this.props.selectAroundMe({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
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

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.modalVisible}
        onRequestClose={() => null}
      >
        <HeaderBasicTitle
          text="Communes"
          onCrossPress={this.props.closeModal}
          info={Platform.OS === 'android'}
        />
        <CitiesFlatlist
          citiesList={this.props.citiesList}
          onCityPress={this.citySelector}
          onNotificationPress={this.cityNotificationSelector}
          selectedCity={this.props.selectedCity}
          selectedCitiesNotification={this.props.selectedCitiesNotification}
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
      </Modal>
    );
  }
}
