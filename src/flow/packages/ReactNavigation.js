// @flow
/* eslint-disable no-undef */

declare module 'react-navigation' {
  declare var addNavigationHelpers: any => void;
  declare var StackNavigator: any => Object;
  declare var TabBarBottom: () => React$ComponentType<any>;
  declare var TabNavigator: (any, any) => void;
  declare var NavigationActions: () => void;
  declare var Header: any;
  declare var withNavigation: any;
}
