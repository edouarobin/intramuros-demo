// @flow

import React, { PureComponent } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationActions } from 'react-navigation';
import globalStyle, { screenWidth } from 'Intramuros/src/style/globalStyle';
import { CitiesModal } from 'Intramuros/src/components';
import { getClosestCity } from 'Intramuros/src/services/GeoLocation';

type PropsType = {
  selectedCity: CityType,
  fetchCities: () => void,
  isAroundMeSelected: boolean,
  pageName: string,
  navigation: any,
  citiesList: CitiesDisplayableType,
  toggleCityNotification: (id: number, cityName: string) => void,
  selectCity: (
    id: number,
    aggloId: number,
    cityName: string,
    notification: boolean
  ) => void,
  selectedCity: CityType,
  selectedCitiesNotification: number[],
  citiesLoading: boolean,
};

export default class CitySelectorButton extends PureComponent<PropsType> {
  state = {
    modalVisible: false,
  };

  buttonClicked = () => {
    this.openModal();
    // this.props.fetchCities();
  };

  openModal = () => {
    this.setState({ modalVisible: true });
  };

  closeModal = () => {
    this.setState({ modalVisible: false });
  };

  citySelector = (city: CityType, notification?: boolean) => {
    this.props.selectCity(city.id, city.agglo_id, city.name, notification);
    this.closeModal();
  };

  cityNotificationSelector = (city: CityType) => {
    this.props.toggleCityNotification(city.id, city.name);
  };

  componentDidUpdate(prevProps, prevState) {
    //Crashlytics: if city does not exist anymore.
    if (!this.props.selectedCity) {
      console.log('City is corrupted. Go to select new one');
      this.props.navigation.reset(
        [NavigationActions.navigate({ routeName: 'SelectCity' })],
        0
      );
    }
  }

  aroundMeSelector = (coords: { latitude: number, longitude: number }) => {
    const newSelectedCity = getClosestCity(coords, this.props.citiesList);
    this.props.selectCity(
      newSelectedCity.id,
      newSelectedCity.agglo_id,
      newSelectedCity.name,
      true
    );
    this.closeModal();
  };

  render() {
    return (
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={this.buttonClicked}
        activeOpacity={0.5}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.cityName} numberOfLines={1}>
            {this.props.isAroundMeSelected
              ? 'Autour de moi'
              : this.props.selectedCity
              ? this.props.selectedCity.name
              : null}
          </Text>
          <Text style={styles.aggloName} numberOfLines={1}>
            {this.props.pageName}
          </Text>
        </View>

        <View style={styles.iconContainer}>
          <Icon name="caret-down" size={18} color="white" />
        </View>

        <CitiesModal
          modalVisible={this.state.modalVisible}
          closeModal={this.closeModal}
          citiesList={this.props.citiesList}
          citySelector={this.citySelector}
          cityNotificationSelector={this.cityNotificationSelector}
          selectedCity={this.props.selectedCity}
          selectedCitiesNotification={this.props.selectedCitiesNotification}
          citiesLoading={this.props.citiesLoading}
          selectAroundMe={this.aroundMeSelector}
          getCities={this.props.fetchCities}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    height: 40,
    paddingRight: 10,
    paddingLeft: 5,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    flexShrink: 1,
  },
  titleContainer: {
    flexShrink: 1,
    paddingRight: 10,
  },
  cityName: {
    color: 'white',
    fontFamily: 'Lato-Bold',
    fontSize: 17,
    paddingBottom: 2,
    textAlign: 'right',
  },
  aggloName: {
    color: 'white',
    fontFamily: 'Lato-Regular',
    paddingTop: 2,
    fontSize: 14,
    textAlign: 'right',
  },
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
