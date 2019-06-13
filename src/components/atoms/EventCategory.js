// @flow

import React, { PureComponent } from 'react';
import { Text, StyleSheet } from 'react-native';

import globalStyle from 'Intramuros/src/style/globalStyle';

type PropsType = {
  children: string,
  style?: Object,
};

const styles = StyleSheet.create({
  titleStyle: {
    fontFamily: 'Lato-BoldItalic',
    color: globalStyle.colors.greyishBrown,
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 16,
  },
});

export default class EventCategory extends PureComponent<PropsType> {
  render() {
    return (
      <Text style={[styles.titleStyle, this.props.style]}>
        {this.props.children}
      </Text>
    );
  }
}
