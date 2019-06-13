// @flow

import React, { Component } from 'react';
import {
  Text,
  Image,
  ScrollView,
  FlatList,
  View,
  RefreshControl,
  Platform,
  AppState,
} from 'react-native';

import {
  Page,
  EventCategory,
  LeftImageCard,
  TopImageCard,
  HeaderCustom,
  TabBarIcon,
} from 'Intramuros/src/components';
import NewsIcon from 'Intramuros/src/assets/NewsIcon.png';
import { formatDateLong } from 'Intramuros/src/services/FormatDate';
import globalStyle from 'Intramuros/src/style/globalStyle';
import { logAnecdote, logNews } from './../../redux/utils';
import {
  TAB_NAVIGATOR_HEIGHT,
  PADDING_VERTICAL_TAB_NAVIGATOR,
} from 'Intramuros/src/navigation/AppNavigator.component.js';
import { BIG_SCREEN_PADDING_OFFSET } from 'Intramuros/src/style/globalStyle';

type PropsType = {
  navigation: any,
  fetchNews: () => void,
  fetchAnecdotes: () => void,
  news: NewsDisplayableType,
  anecdotes: AnecdotesDisplayableType,
  selectedCity: CityType,
  newsLoading: boolean,
  anecdotesLoading: boolean,
  isAroundMeSelected: boolean,
  selectCityFromID: number => string,
  selectAggloFromID: number => string,
};

type StateType = {
  appState: AppStateStatus,
  lastUpdate: number,
};

const eventKeyExtractor = (item): string => `${item.id}`;

export default class News extends Component<PropsType, StateType> {
  static navigationOptions = () => ({
    tabBarIcon: ({ tintColor }) => (
      <TabBarIcon picto={NewsIcon} label={'Journal'} tintColor={tintColor} />
    ),
  });

  state = {
    appState: AppState.currentState,
    lastUpdate: new Date().getTime(),
  };

  onRefresh = () => {
    this.setState({ lastUpdate: new Date().getTime() });
    this.props.fetchNews();
    this.props.fetchAnecdotes();
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
        'App has come to the foreground in News list after 300 seconds of inactivity!'
      );
      this.props.fetchNews();
      this.props.fetchAnecdotes();
      console.log('updating timeOfLastUpdate');
      this.setState({
        appState: nextAppState,
        lastUpdate: new Date().getTime(),
      });
    } else if (this.state.appState !== nextAppState) {
      console.log('upadte appstate in news list page');
      this.setState({ appState: nextAppState });
    }
  };

  componentDidMount() {
    this.props.fetchNews();
    this.props.fetchAnecdotes();
    console.log('componentDidMount in News list!');
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    console.log('componentWillUnmount in News list!');
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  newsNavigateOnPress = (item: NewsType) => {
    let newsID = item.id;
    this.props.navigation.navigate('NewsDetail', { newsID });

    let title = item.title;
    if (item.agglo) {
      let aggloId = item.agglo;
      let aggloName = this.props.selectAggloFromID(item.agglo);
      logNews(newsID, title, aggloName, aggloId, true);
    } else {
      let cityId = item.city;
      let cityName = this.props.selectCityFromID(cityId);
      logNews(newsID, title, cityName, cityId, false);
    }
  };

  anecdoteNavigateOnPress = (anecdoteID: number, title: string) => {
    this.props.navigation.navigate('AnecdoteDetail', { anecdoteID });
    logAnecdote(anecdoteID, title);
  };

  getCityName = (): string => {
    const cityName = this.props.selectedCity
      ? this.props.selectedCity.name
      : '';
    if (['A', 'E', 'I', 'O', 'U', 'Y'].includes(cityName[0])) {
      return `d'${cityName}`;
    }
    if (cityName.substring(0, 3) === 'Le ') {
      return `du ${cityName.substring(3)}`;
    }

    return `de ${cityName}`;
  };

  render() {
    const cityName = `Actualités ${this.getCityName()}`;
    return (
      <Page noPadding>
        <HeaderCustom
          title={
            this.props.selectedCity ? this.props.selectedCity.agglo_name : ''
          }
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            paddingVertical: 10,
            backgroundColor: globalStyle.colors.greyUltraLight,
            paddingHorizontal: BIG_SCREEN_PADDING_OFFSET,
          }}
          refreshControl={
            <RefreshControl
              refreshing={this.props.newsLoading || this.props.anecdotesLoading}
              onRefresh={this.onRefresh}
              colors={[globalStyle.colors.mainBlue]}
              tintColor={globalStyle.colors.mainBlue}
            />
          }
          removeClippedSubviews={Platform.OS === 'ios' ? false : true}
        >
          {/* <EventCategory style={{ marginTop: Platform.OS === 'ios' ? 0 : 10 }}>
            {'Anecdotes sur ma région'}
          </EventCategory>
          {this.props.anecdotes.length !== 0 ? (
            <FlatList
              style={{
                marginBottom: 5,
                paddingHorizontal: 16,
              }}
              data={this.props.anecdotes}
              keyExtractor={eventKeyExtractor}
              horizontal
              renderItem={({ item }) => (
                <TopImageCard
                  title={item.title}
                  image={item.image}
                  onPress={() =>
                    this.anecdoteNavigateOnPress(item.id, item.title)
                  }
                  style={{
                    marginVertical: 10,
                    marginRight: 6,
                    marginLeft: 2,
                    width: 208,
                    height: 168,
                  }}
                  isAnecdote={true}
                />
              )}
              showsHorizontalScrollIndicator={false}
              removeClippedSubviews={Platform.OS === 'ios' ? false : true}
            />
          ) : (
            <Text style={{ paddingLeft: 16 }}>
              Aucune anecdote pour le moment
            </Text>
          )} */}
          {this.props.isAroundMeSelected ? (
            <EventCategory
              style={{ marginTop: Platform.OS === 'ios' ? 0 : 10 }}
            >
              {cityName}
            </EventCategory>
          ) : (
            <EventCategory
              style={{ marginTop: Platform.OS === 'ios' ? 0 : 10 }}
            >
              Actualités de ma commune
            </EventCategory>
          )}
          {this.props.news.length !== 0 ? (
            <FlatList
              data={this.props.news}
              keyExtractor={eventKeyExtractor}
              style={{ paddingHorizontal: 16 }}
              renderItem={({ item }) => (
                <LeftImageCard
                  title={item.title}
                  image={item.image}
                  subtitle={
                    'Publié le ' + formatDateLong(item.updatedAt, false)
                  }
                  onPress={() => this.newsNavigateOnPress(item)}
                  isAgglo={item.agglo > 0}
                />
              )}
              ListFooterComponent={<View style={{ height: 50 }} />}
              removeClippedSubviews={Platform.OS === 'ios' ? false : true}
            />
          ) : (
            <Text
              style={{
                paddingLeft: 16,
                fontFamily: 'Lato-Regular',
                color: '#7d7d7d',
              }}
            >
              Aucune actualité en ce moment
            </Text>
          )}
        </ScrollView>
      </Page>
    );
  }
}
