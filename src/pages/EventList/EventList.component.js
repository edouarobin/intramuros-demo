// @flow

import React, { PureComponent } from 'react';
import {
  Text,
  Image,
  SectionList,
  View,
  RefreshControl,
  AppState,
} from 'react-native';

import {
  Page,
  HeaderCustom,
  LeftImageCardEventList,
  TabBarIcon,
} from 'Intramuros/src/components';
import EventsIcon from 'Intramuros/src/assets/EventsIcon.png';
import globalStyle, {
  NUMBER_OF_LINES,
  heightCard,
  SECTION_EVENT_HEIGHT,
  STATUS_BAR_HEIGHT,
  TAB_HEIGHT,
  BIG_SCREEN_PADDING_OFFSET,
} from 'Intramuros/src/style/globalStyle';
import { logEvent, logLaunchApp } from './../../redux/utils';
import { isEqual, slice, size } from 'lodash';
import memoizeOne from 'memoize-one';
import { myFirebase } from '../../redux/utils';
import { GenerateEventsListDataSource } from 'Intramuros/src/services/ListsToolsDataSource';
import SectionHeader from './components/SectionHeader';
import HeaderEventList from './components/HeaderEventList.container';
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout';
import { _processNotification } from '../../services/Notifications';
import {
  TAB_NAVIGATOR_HEIGHT,
  PADDING_VERTICAL_TAB_NAVIGATOR,
} from 'Intramuros/src/navigation/AppNavigator.component.js';

type PropsType = {
  navigation: any,
  fetchEvents: () => void,
  fetchCategories: () => void,
  allEventsFiltered: any,
  selectCityFromID: number => string,
  selectAggloFromID: number => string,
  selectedCity: CityType,
  citiesLoading: boolean,
  eventsLoading: boolean,
  categoriesLoading: boolean,
  fetchCities: () => void,
};

type StateType = {
  appState: any,
  selectedTab: string,
  numOfLines: number,
  lastUpdate: number,
  backPressed: boolean,
};

const eventKeyExtractor = (item, index) => {
  return `${item.id}`;
};
const TOP_SECTION_HEIGHT =
  266 + globalStyle.sizes.headerHeight + STATUS_BAR_HEIGHT; //content + hauteur du header + padding du header
const computeEventsDatasourceMemoization = memoizeOne(
  GenerateEventsListDataSource,
  isEqual
);

export default class EventList extends PureComponent<PropsType, StateType> {
  static navigationOptions = () => ({
    tabBarIcon: ({ tintColor }) => (
      <TabBarIcon
        picto={EventsIcon}
        label={'Événements'}
        tintColor={tintColor}
      />
    ),
  });

  state = {
    appState: AppState.currentState,
    selectedTab: 'Ma commune',
    numOfLines: NUMBER_OF_LINES,
    lastUpdate: new Date().getTime(),
    backPressed: false,
  };

  constructor(props) {
    super(props);

    this.getItemLayout = sectionListGetItemLayout({
      // The height of the row with rowData at the given sectionIndex and rowIndex
      getItemHeight: (rowData, sectionIndex, rowIndex) => heightCard + 12,

      // These four properties are optional
      getSeparatorHeight: () => 0, // The height of your separators
      getSectionHeaderHeight: () => SECTION_EVENT_HEIGHT, // The height of your section headers
      getSectionFooterHeight: () => 20 + 16 + 16, // The height of your section footers
      listHeaderHeight: 266, // The height of your list header. Attention: on dirait qu'il faut que ça soit plus grand que la valeur réelle ?!
    });
  }

  selectTab = (tabName: 'Ma commune' | 'Aux alentours') => {
    this.setState({ selectedTab: tabName });
  };

  refreshData = () => {
    this.props.fetchCities();
    this.props.fetchEvents();
    this.props.fetchCategories();
  };

  onRefresh = () => {
    console.log('GO REFRESHING !');
    this.setState({ lastUpdate: new Date().getTime() });
    this.refreshData();
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
        'App has come to the foreground in Event list after 300 seconds of inactivity!'
      );
      this.refreshData();
      logLaunchApp(
        this.props.selectedCity ? this.props.selectedCity.name : '',
        this.props.selectedCity ? this.props.selectedCity.id : 0
      );
      this.setState({
        appState: nextAppState,
        lastUpdate: new Date().getTime(),
      });
    } else if (this.state.appState !== nextAppState) {
      this.setState({ appState: nextAppState });
    }
  };

  componentDidMount() {
    this.refreshData();

    myFirebase
      .notifications()
      .getInitialNotification()
      .then((notificationOpen: NotificationOpened) => {
        if (notificationOpen) {
          // App was opened by a notification
          const action = notificationOpen.action;
          // Get information about the notification that was opened
          const notification: Notification = notificationOpen.notification;
          if (notification._notificationId) {
            console.log('notificationID=' + notification._notificationId);
            myFirebase
              .notifications()
              .removeDeliveredNotification(notification._notificationId);
          }
          console.log('Received notification and App was closed');
          _processNotification(notification, this.props.navigation);
        }
      });

    this.notificationOpenedListener = myFirebase
      .notifications()
      .onNotificationOpened((notificationOpen: NotificationOpened) => {
        const action = notificationOpen.action;
        const notification: Notification = notificationOpen.notification;
        if (notification._notificationId) {
          console.log('notificationID=' + notification._notificationId);
          myFirebase
            .notifications()
            .removeDeliveredNotification(notification._notificationId);
        }
        console.log('Received notification when app is running');
        _processNotification(notification, this.props.navigation);
      });

    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    this.notificationOpenedListener();
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
      //Reset number of lines when changing city
      this.setState({ numOfLines: NUMBER_OF_LINES });
    }
  }

  navigateOnPress = (item: EventType) => {
    let eventID = item.id;
    this.props.navigation.navigate('EventDetail', { eventID });

    let eventTitle = item.title;
    if (item.agglo) {
      let aggloId = item.agglo;
      let aggloName = this.props.selectAggloFromID(item.agglo);
      logEvent(eventID, eventTitle, aggloName, aggloId, true);
    } else {
      let cityId = item.city;
      let cityName = this.props.selectCityFromID(cityId);
      logEvent(eventID, eventTitle, cityName, cityId, false);
    }
  };

  _renderItem = ({ item }) => {
    return (
      <View
        style={{
          zIndex: 0,
          paddingLeft: 9 + BIG_SCREEN_PADDING_OFFSET,
          paddingRight: 16 + BIG_SCREEN_PADDING_OFFSET,
        }}
        key={`${item.id}`}
      >
        <LeftImageCardEventList
          title={item.title}
          subtitle={item.city ? this.props.selectCityFromID(item.city) : null}
          subtitle2={item.displayedDistanceToPositionOrCity}
          image={item.image}
          onPress={this.navigateOnPress}
          startDate={item.startDate}
          endDate={item.endDate}
          isAgglo={item.agglo > 0}
          item={item}
        />
      </View>
    );
  };

  _renderSectionHeader = ({ section: { title } }) => {
    if (title) {
      return <SectionHeader sectionName={title} key={title} />;
    } else {
      return <View key={title} />;
    }
  };

  _renderEmptyComponent = () => {
    return (
      <Text
        style={{
          marginTop: 20,
          marginBottom: 16,
          height: 20,
          fontSize: 12,
          fontFamily: 'Lato-Regular',
          color: globalStyle.colors.darkerGrey,
          textAlign: 'center',
        }}
      >
        {this.state.selectedTab === 'Ma commune'
          ? 'Aucun événement dans ma commune'
          : 'Aucun événement aux alentours'}
      </Text>
    );
  };

  _sizeOfEventListSelected = () => {
    return size(
      this.state.selectedTab === 'Ma commune'
        ? this.props.allEventsFiltered.cityEvents
        : this.props.allEventsFiltered.aroundEvents
    );
  };

  _renderFooterComponent = () => {
    if (this._sizeOfEventListSelected() > 0) {
      return (
        <Text
          style={{
            marginTop: 16,
            marginBottom: 16,
            height: 20,
            fontSize: 12,
            fontFamily: 'Lato-Regular',
            color: globalStyle.colors.darkerGrey,
            textAlign: 'center',
          }}
        >
          {'Aucun autre événement pour le moment.'}
        </Text>
      );
    } else {
      return <View style={{ height: 20 + 16 + 16 }} />;
    }
  };

  _renderHeaderComponent = () => {
    return (
      <HeaderEventList
        navigateOnPress={this.navigateOnPress}
        selectTab={this.selectTab}
        selectedTab={this.state.selectedTab}
      />
    );
  };

  render() {
    console.log('citiesLoading ======');
    console.log(this.props.citiesLoading);
    let events =
      this.state.selectedTab === 'Ma commune'
        ? this.props.allEventsFiltered.cityEvents
        : this.props.allEventsFiltered.aroundEvents;
    let dataSource = computeEventsDatasourceMemoization(
      slice(events, 0, this.state.numOfLines)
    );

    return (
      <Page noPadding backgroundColor={{ backgroundColor: '#EEEEF9' }}>
        <HeaderCustom
          title={
            this.props.selectedCity ? this.props.selectedCity.agglo_name : null
          }
        />
        <SectionList
          showsVerticalScrollIndicator={true}
          ref={ref => {
            this.scrollList = ref;
          }}
          refreshControl={
            <RefreshControl
              refreshing={this.props.citiesLoading}
              onRefresh={this.onRefresh.bind(this)}
              colors={[globalStyle.colors.mainBlue]}
              tintColor={globalStyle.colors.mainBlue}
            />
          }
          style={{ backgroundColor: '#EEEEF9' }}
          initialNumToRender={10}
          sections={dataSource}
          keyExtractor={eventKeyExtractor}
          stickySectionHeadersEnabled={true}
          getItemLayout={this.getItemLayout}
          renderItem={this._renderItem}
          renderSectionHeader={this._renderSectionHeader}
          ListEmptyComponent={this._renderEmptyComponent}
          ListHeaderComponent={this._renderHeaderComponent}
          ListFooterComponent={this._renderFooterComponent}
          onEndReached={({ distanceFromEnd }) => {
            if (size(events) > this.state.numOfLines) {
              console.log('augmentation du numOfLines');
              this.setState({
                numOfLines: this.state.numOfLines + NUMBER_OF_LINES,
              });
            }
          }}
          onEndReachedThreshold={1}
        />
      </Page>
    );
  }
}
