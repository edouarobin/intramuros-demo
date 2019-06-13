// @flow

import React, { PureComponent } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { phonecall } from 'react-native-communications';

import globalStyle from 'Intramuros/src/style/globalStyle';
import Icon from 'react-native-vector-icons/Ionicons';

type PropsType = {
  number: string,
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
    fontFamily: 'Lato-Regular',
  },
  icon: {
    color: globalStyle.colors.mainBlue,
    marginTop: 3,
    width: 30,
    textAlign: 'center',
  },
});

export default class ContactNumber extends PureComponent<PropsType> {
  render() {
    const number = `${this.props.number}`;
    return (
      <TouchableOpacity
        onPress={() => phonecall(number, true)}
        style={styles.addressContainer}
      >
        <Icon name="ios-call" style={[styles.icon]} size={30} />
        <Text style={styles.textStyle}>{number}</Text>
      </TouchableOpacity>
    );
  }
}
