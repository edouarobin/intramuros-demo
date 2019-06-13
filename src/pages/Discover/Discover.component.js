// @flow

import React, { Component } from 'react';
import {
  Text,
  Image,
  FlatList,
  View,
  RefreshControl,
  Platform,
  AppState,
} from 'react-native';

import {
  Page,
  TopImageCard,
  HeaderCustom,
  Loader,
  TabBarIcon,
} from 'Intramuros/src/components';

import DiscoverIcon from 'Intramuros/src/assets/DiscoverIcon.png';
import globalStyle, {
  BIG_SCREEN_PADDING_OFFSET,
} from 'Intramuros/src/style/globalStyle';
import { logPOI } from './../../redux/utils';
import { size } from 'lodash';
import {
  TAB_NAVIGATOR_HEIGHT,
  PADDING_VERTICAL_TAB_NAVIGATOR,
} from 'Intramuros/src/navigation/AppNavigator.component.js';

type PropsType = {
  navigation: any,
  fetchPointsOfInterest: () => void,
  pointsOfInterestLoading: boolean,
  pointsOfInterest: PointsOfInterestDisplayableType,
  selectCityFromID: number => string,
  selectedCity: CityType,
};

type StateType = {
  appState: AppStateStatus,
  lastUpdate: number,
};

const eventKeyExtractor = (item): string => `${item.id}`;

export default class Discover extends Component<PropsType, StateType> {
  static navigationOptions = () => ({
    tabBarIcon: ({ tintColor }) => (
      <TabBarIcon
        picto={DiscoverIcon}
        label={'Découvrir'}
        tintColor={tintColor}
      />
    ),
  });

  state = {
    appState: AppState.currentState,
    lastUpdate: new Date().getTime(),
  };

  onRefresh = () => {
    this.setState({ lastUpdate: new Date().getTime() });
    this.props.fetchPointsOfInterest();
  };

  _handleAppStateChange = nextAppState => {
    let timeOfLastUpdate =
      (new Date().getTime() - this.state.lastUpdate) / 1000;
    console.log('durée=' + timeOfLastUpdate + ' secondes');
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active' &&
      timeOfLastUpdate > 300
    ) {
      console.log(
        'App has come to the foreground in Discover component after 300 seconds of inactivity!'
      );
      this.props.fetchPointsOfInterest();
      console.log('updating timeOfLastUpdate');
      this.setState({
        appState: nextAppState,
        lastUpdate: new Date().getTime(),
      });
    } else if (this.state.appState !== nextAppState) {
      console.log('upadte appstate in discover list page');
      this.setState({ appState: nextAppState });
    }
  };

  componentDidMount() {
    console.log('componentDidMount in Discover component!');
    this.props.fetchPointsOfInterest();
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    console.log('componentWillUnmount in Discover list!');
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  navigateOnPress = (pointOfInterestDetails: PointOfInterestType) => {
    this.props.navigation.navigate('DiscoverDetail', {
      pointOfInterestDetails,
    });

    let cityName = this.props.selectCityFromID(pointOfInterestDetails.city);
    logPOI(
      pointOfInterestDetails.id,
      pointOfInterestDetails.title,
      cityName,
      pointOfInterestDetails.city
    );
  };

  displaySubtitle = (city: number, category: string | null): string =>
    category
      ? `${this.props.selectCityFromID(city)} - ${category}`
      : `${this.props.selectCityFromID(city)}`;

  render() {
    return (
      <Page noPadding>
        <HeaderCustom title={this.props.selectedCity.agglo_name} />
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={
                this.props.pointsOfInterestLoading &&
                size(this.props.pointsOfInterest) > 0
              }
              onRefresh={this.onRefresh}
              colors={[globalStyle.colors.mainBlue]}
              tintColor={globalStyle.colors.mainBlue}
            />
          }
          showsVerticalScrollIndicator={false}
          data={this.props.pointsOfInterest}
          keyExtractor={eventKeyExtractor}
          style={{
            paddingTop: 10,
            backgroundColor: globalStyle.colors.greyUltraLight,
            paddingHorizontal: BIG_SCREEN_PADDING_OFFSET,
          }}
          removeClippedSubviews={Platform.OS === 'ios' ? false : true}
          renderItem={({ item }) => (
            <TopImageCard
              title={item.title}
              image={item.images[0]}
              subtitle={this.displaySubtitle(item.city, item.category)}
              distance={item.distanceToSelectedCity}
              onPress={() => this.navigateOnPress(item)}
              style={{
                marginBottom: 10,
                height: 168,
                marginHorizontal: 16,
              }}
              croppedData={item.croppedData}
              croppedActivated={item.croppedData ? true : false}
            />
          )}
          ListFooterComponent={<View style={{ height: 20 }} />}
          ListHeaderComponent={
            Platform.OS === 'ios' ? <View /> : <View style={{ height: 10 }} />
          }
          ListEmptyComponent={() => {
            if (this.props.pointsOfInterestLoading) {
              return (
                <Loader
                  isLoading={true}
                  message="Chargement en cours"
                  fullpage={true}
                />
              );
            } else {
              return (
                <Text
                  style={{ fontFamily: 'Lato-Regular' }}
                >{`Aucun point d'intérêt en ce moment`}</Text>
              );
            }
          }}
        />
      </Page>
    );
  }
}
