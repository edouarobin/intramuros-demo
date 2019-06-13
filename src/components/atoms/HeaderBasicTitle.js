// @flow

import React, { PureComponent } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Alert,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  headerContainer,
  headerTitle,
  IOS_STATUS_BAR_HEIGHT,
  HEADER_HEIGHT_MODAL,
} from 'Intramuros/src/style/globalStyle';

type PropsType = {
  text: string,
  onCrossPress: () => void,
  style: string,
  info: boolean,
};

const screenWidth = Dimensions.get('window').width;

function goToNotificationHelpCenter() {
  Linking.openURL('https://appli-intramuros.fr/notifications');
}

function _openAlertPopup() {
  Alert.alert(
    'Aide',
    'Vous ne recevez pas les notifications IntraMuros sur votre téléphone ? Il est possible que vous deviez effectuer une manipulation sur votre téléphone pour autoriser les notifications.',
    [
      { text: 'Aidez-moi', onPress: () => goToNotificationHelpCenter() },
      {
        text: "Pas besoin d'aide",
        onPress: () => {
          console.log('NON Pressed');
        },
      },
    ],
    {
      cancelable: false,
    }
  );
}

export default class HeaderBasicTitle extends PureComponent<PropsType> {
  render() {
    return (
      <View
        style={[
          headerContainer,
          {
            flexDirection: 'row',
            paddingTop: IOS_STATUS_BAR_HEIGHT,
            height: HEADER_HEIGHT_MODAL,
          },
          this.props.style,
        ]}
      >
        <View style={{ flex: 1 }}>
          {this.props.info ? (
            <TouchableOpacity
              activeOpacity={0.2}
              onPress={() => _openAlertPopup()}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Icon color="white" name="ios-help-circle-outline" size={23} />
            </TouchableOpacity>
          ) : null}
        </View>
        <Text
          style={[headerTitle, { width: screenWidth * 0.6 }]}
          numberOfLines={1}
        >
          {this.props.text}
        </Text>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={this.props.onCrossPress}
        >
          <Icon name="md-close" size={30} color="white" />
        </TouchableOpacity>
      </View>
    );
  }
}
