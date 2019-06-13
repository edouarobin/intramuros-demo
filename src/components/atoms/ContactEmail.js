// @flow

import React, { PureComponent } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { email } from 'react-native-communications';

import globalStyle from 'Intramuros/src/style/globalStyle';
import Icon from 'react-native-vector-icons/Ionicons';

type PropsType = {
  email: string,
};

const styles = StyleSheet.create({
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  textStyle: {
    color: globalStyle.colors.mainBlue,
    marginLeft: 10,
    flex: 1,
    flexWrap: 'wrap',
    fontFamily: 'Lato-Regular',
  },
  icon: {
    color: globalStyle.colors.mainBlue,
    marginTop: 3,
    width: 30,
    textAlign: 'center',
  },
});

export default class ContactEmail extends PureComponent<PropsType> {
  render() {
    return (
      <TouchableOpacity
        onPress={() => email([this.props.email], null, null, null, null)}
        style={styles.addressContainer}
      >
        <Icon name="ios-mail" style={[styles.icon]} size={30} />
        <Text style={styles.textStyle}>{this.props.email}</Text>
      </TouchableOpacity>
    );
  }
}
