// @flow

import React, { PureComponent } from 'react';
import { Text, StyleSheet } from 'react-native';
import type { StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import globalStyle from 'Intramuros/src/style/globalStyle';

type PropsType = {
  message: string,
  textStyle?: StyleObj,
};

const styles = StyleSheet.create({
  text: {
    color: globalStyle.colors.mainBlue,
    fontSize: 14,
  },
});

export default class MessageLabel extends PureComponent<PropsType> {
  render() {
    return (
      <Text style={[styles.text, this.props.textStyle]}>
        {this.props.message}
      </Text>
    );
  }
}
