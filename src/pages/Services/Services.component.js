// @flow

import React, { Component } from 'react';
import {
  Image,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  RefreshControl,
  AppState,
} from 'react-native';
import {
  Page,
  CityInfoBlock,
  HeaderCustom,
  TabBarIcon,
} from 'Intramuros/src/components';
import globalStyle from 'Intramuros/src/style/globalStyle';
import ServicesIcon from 'Intramuros/src/assets/ServicesIcon.png';
import ServicesBlocks from './ServicesBlocks';
import { isAfter, isToday, isBefore } from 'date-fns';
import { forEach, size } from 'lodash';
import {
  TAB_NAVIGATOR_HEIGHT,
  PADDING_VERTICAL_TAB_NAVIGATOR,
} from 'Intramuros/src/navigation/AppNavigator.component.js';

type PropsType = {
  navigation: NavigationPropsType<>,
  fetchDirectories: () => void,
  fetchSurveys: () => void,
  fetchSchools: () => void,
  fetchCommerces: () => void,
  fetchAssos: () => void,
  fetchAssosFromCity: () => void,
  directories: DirectoriesDisplayableType,
  surveys: SurveysDisplayableType,
  selectedCity: CityType,
  surveyLoading: boolean,
  schools: SchoolsDisplayableType,
  schoolLoading: boolean,
  commerces: CommercesDisplayableType,
  commerceLoading: boolean,
  directoriesLoading: boolean,
  associations: AssosDisplayableType,
  associationLoading: boolean,
};

type StateType = {
  appState: any,
  lastUpdate: number,
};

export default class Services extends Component<PropsType, StateType> {
  static navigationOptions = () => ({
    tabBarIcon: ({ tintColor }) => (
      <TabBarIcon picto={ServicesIcon} label={'Mairie'} tintColor={tintColor} />
    ),
  });

  state = {
    appState: AppState.currentState,
    lastUpdate: new Date().getTime(),
  };

  _goToPage = (pageName: string) => {
    switch (pageName) {
      case 'DirectoryList':
        return this.props.navigation.navigate(pageName, {});
      case 'ReportPage':
        return this.props.navigation.navigate(pageName, {});
      case 'SurveyPage':
        return this.props.navigation.navigate(pageName, {});
      case 'SchoolsPage':
        return this.props.navigation.navigate(pageName, {});
      case 'AssosPage':
        return this.props.navigation.navigate(pageName, {});
      case 'CommercesPage':
        return this.props.navigation.navigate(pageName, {});
      default:
        return null;
    }
  };

  _numberSurveyInProgress = () => {
    let counter = 0;
    forEach(this.props.surveys, survey => {
      if (survey.inProgress) {
        counter++;
      }
    });

    return counter;
  };

  _numberSurveyResults = () => {
    let counter = 0;
    forEach(this.props.surveys, survey => {
      if (!survey.inProgress && !survey.onlyFreeQuestion) {
        counter++;
      }
    });
    return counter;
  };

  _refreshData = () => {
    this.props.fetchDirectories();
    this.props.fetchSurveys();
    this.props.fetchSchools();
    // this.props.fetchAssos();
    if (this.props.selectedCity) {
      this.props.fetchAssosFromCity(this.props.selectedCity.id);
    }
    this.props.fetchCommerces();
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
      console.log('App has come to the foreground in Service mairie page!');
      this._refreshData();
      this.setState({
        appState: nextAppState,
        lastUpdate: new Date().getTime(),
      });
    } else if (this.state.appState !== nextAppState) {
      console.log('upadte appstate in event list page');
      this.setState({ appState: nextAppState });
    }
  };

  componentDidMount() {
    this._refreshData();
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.selectedCity &&
      prevProps.selectedCity.id &&
      this.props.selectedCity &&
      this.props.selectedCity.id &&
      prevProps.selectedCity.id !== this.props.selectedCity.id
    ) {
      //Refresh data when changing city
      console.log('City changed => refreshing data');
      this._refreshData();
    }
  }

  onRefresh = () => {
    this.setState({ lastUpdate: new Date().getTime() });
    this._refreshData();
  };

  render() {
    return (
      <Page noPadding backgroundColor={'#EEEEF9'}>
        <HeaderCustom title={this.props.selectedCity.agglo_name} />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={
                this.props.surveyLoading ||
                this.props.schoolLoading ||
                this.props.directoriesLoading ||
                this.props.associationLoading ||
                this.props.commerceLoading
              }
              onRefresh={this.onRefresh}
              colors={[globalStyle.colors.mainBlue]}
              tintColor={globalStyle.colors.mainBlue}
            />
          }
        >
          <CityInfoBlock cityDetails={this.props.selectedCity} />
          <ServicesBlocks
            showSchools={size(this.props.schools) > 0}
            _goToPage={this._goToPage}
            counterSurveyInProgress={this._numberSurveyInProgress()}
            showSurveyBlock={
              this._numberSurveyResults() > 0 ||
              this._numberSurveyInProgress() > 0
            }
            showAnnuaire={
              this.props.directories && this.props.directories.length > 0
            }
            signalProblems={this.props.selectedCity.signalProblems}
            showAssos={size(this.props.associations) > 0}
            showCommerces={size(this.props.commerces) > 0}
          />
        </ScrollView>
      </Page>
    );
  }
}
