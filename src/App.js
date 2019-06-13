// @flow

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import createPersistentStore from './redux/store';
import AppNavigator from './navigation';

import {
  Platform,
  Alert,
  AppState,
  View,
  Text,
  StyleSheet,
  Button,
  Linking,
} from 'react-native';
import ENVIRONMENT from 'Intramuros/src/environment';
import VersionNumber from 'react-native-version-number';
import { myFirebase } from './redux/utils';

console.disableYellowBox = true;

const messaging = myFirebase.messaging();
const analytics = myFirebase.analytics();
analytics.setAnalyticsCollectionEnabled(true);

messaging.hasPermission().then(enabled => {
  if (enabled) {
    // Ok
  } else {
    // user doesn't have permission
    messaging
      .requestPermission()
      .then(() => {
        //alert('permission demandée')
      })
      .catch(error => {
        // User has rejected permissions
        //alert('Erreur lors de la demande de permission')
      });
  }
});

function goToAppStore() {
  if (Platform.OS === 'ios') {
    Linking.openURL('itms-apps://itunes.apple.com/app/id1312850573');
  } else {
    Linking.openURL('market://details?id=com.intramuros.Intramuros.production');
  }
}

function checkLatestAppVersion() {
  const url =
    Platform.OS === 'ios'
      ? 'https://d2lhfu16p9lkcg.cloudfront.net/version/versionApp-ios.json'
      : 'https://d2lhfu16p9lkcg.cloudfront.net/version/versionApp-android.json';
  return fetch(url)
    .then(response => response.json())
    .then(responseJson => {
      let newrelease =
        responseJson && responseJson.buildNumber > VersionNumber.buildVersion;
      if (newrelease) {
        Alert.alert(
          'Bonne nouvelle !',
          "Une nouvelle version de l'application est disponible. Voulez-vous la télécharger ?",
          [
            { text: 'Oui', onPress: () => goToAppStore() },
            {
              text: 'Non',
              onPress: () => {
                console.log('KO Pressed');
              },
            },
          ],
          {
            cancelable: false,
          }
        );
      }
    })
    .catch(error => {
      console.error(error);
    });
}

function processDeepLinkUrl(url: string) {
  if (url && url.includes('bienvenue')) {
    Alert.alert(
      'Bienvenue sur IntraMuros',
      'Découvrez toutes les richesses de votre commune et de ses alentours.',
      [
        {
          text: 'Ok',
          onPress: () => {
            console.log('OK Pressed');
          },
        },
      ],
      {
        cancelable: false,
      }
    );
  } else {
    console.log('unknown deeplink url');
  }
}

const { store, persistedStore } = createPersistentStore();

class App extends Component<void, StateType> {
  componentDidMount() {
    myFirebase
      .auth()
      .signInAnonymously()
      .then(() => {
        console.log(
          'user authentified, uid = ' + myFirebase.auth().currentUser.uid
        );
      });

    // Build a channel
    const channel = new myFirebase.notifications.Android.Channel(
      'alert-channel',
      'Alertes',
      myFirebase.notifications.Android.Importance.Max
    ).setDescription('Notifications des événements, actualités, sondages ...');

    // Create the channel
    myFirebase.notifications().android.createChannel(channel);

    myFirebase
      .links()
      .getInitialLink()
      .then(url => {
        if (url) {
          console.log('initial url founded');
          processDeepLinkUrl(url);
        }

        myFirebase.links().onLink(url => {
          if (url) {
            console.log('background url founded');
            processDeepLinkUrl(url);
          }
        });
      });

    // Traitement de la notification quand l'application est ouverte (foreground). On crée une notification locale.
    this.notificationListener = myFirebase
      .notifications()
      .onNotification((notification: Notification) => {
        if (
          notification &&
          notification._notificationId &&
          notification._title &&
          notification._body
        ) {
          const myNotification = new myFirebase.notifications.Notification()
            .setNotificationId(notification._notificationId)
            .setTitle(notification._title)
            .setBody(notification._body)
            .setSound('Default')
            .setData(notification._data);

          myNotification.android
            .setChannelId('alert-channel')
            .android.setColorized(true)
            .android.setColor('#2869e5')
            .android.setSmallIcon('ic_stat_intramuroslogo');

          // Display the notification
          console.log('Create local notification');
          myFirebase.notifications().displayNotification(myNotification);
        }
      });

    // Verify if the app is up to date
    checkLatestAppVersion();
  }

  componentWillUnmount() {
    this.notificationListener();
  }

  render() {
    return store ? (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistedStore}>
          <AppNavigator />
        </PersistGate>
      </Provider>
    ) : null;
  }
}

export default App;
