// @flow

import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';

import globalStyle from 'Intramuros/src/style/globalStyle';
import * as Pages from 'Intramuros/src/pages';

export const TAB_NAVIGATOR_HEIGHT = 56;
export const PADDING_VERTICAL_TAB_NAVIGATOR = 8;

const wrapScreenWithOptions = screen => ({
  screen,
  navigationOptions: {
    gesturesEnabled: false,
  },
});

const MainTabBarNavigator = createBottomTabNavigator(
  {
    EventList: wrapScreenWithOptions(Pages.EventList),
    News: wrapScreenWithOptions(Pages.News),
    Discover: wrapScreenWithOptions(Pages.Discover),
    Services: wrapScreenWithOptions(Pages.Services),
  },
  {
    initialRouteName: 'EventList',
    tabBarOptions: {
      showLabel: false,
      showIcon: true,
      activeTintColor: globalStyle.colors.mainBlue,
      inactiveTintColor: globalStyle.colors.darkerGrey,
      style: {
        height: TAB_NAVIGATOR_HEIGHT,
        backgroundColor: globalStyle.colors.white,
        paddingVertical: PADDING_VERTICAL_TAB_NAVIGATOR,
      },
      labelStyle: {
        fontSize: 12,
        // marginBottom: 8,
        fontFamily: 'Lato-Regular',
      },
    },
  }
);

const AppNavigator = createStackNavigator(
  {
    SelectCity: wrapScreenWithOptions(Pages.SelectCity),
    MainTabBar: wrapScreenWithOptions(MainTabBarNavigator),
    EventDetail: wrapScreenWithOptions(Pages.EventDetail),
    NewsDetail: wrapScreenWithOptions(Pages.NewsDetail),
    AnecdoteDetail: wrapScreenWithOptions(Pages.AnecdoteDetail),
    DiscoverDetail: wrapScreenWithOptions(Pages.DiscoverDetail),
    DirectoryDetail: wrapScreenWithOptions(Pages.DirectoryDetail),
    FilterDetail: wrapScreenWithOptions(Pages.FilterDetail),
    DirectoryList: wrapScreenWithOptions(Pages.DirectoriesPage),
    ReportPage: wrapScreenWithOptions(Pages.ReportPage),
    SurveyPage: wrapScreenWithOptions(Pages.SurveyPage),
    SurveyDetail: wrapScreenWithOptions(Pages.SurveyDetail),
    SurveyDetailResult: wrapScreenWithOptions(Pages.SurveyDetailResult),
    SchoolsPage: wrapScreenWithOptions(Pages.SchoolsPage),
    SchoolDetail: wrapScreenWithOptions(Pages.SchoolDetail),
    AssosPage: wrapScreenWithOptions(Pages.AssosPage),
    AssoDetail: wrapScreenWithOptions(Pages.AssoDetail),
    CommercesPage: wrapScreenWithOptions(Pages.CommercesPage),
    CommerceDetail: wrapScreenWithOptions(Pages.CommerceDetail),
  },
  {
    mode: 'card',
    headerMode: 'none',
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
