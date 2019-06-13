// @flow

import { AppRegistry } from 'react-native';
import App from 'Intramuros/src/App';
import bgMessaging from './src/bgMessaging';

AppRegistry.registerComponent('Intramuros', () => App);
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging);
