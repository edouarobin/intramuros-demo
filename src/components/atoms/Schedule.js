// @flow

import React, { PureComponent } from 'react';
import { Text, StyleSheet, View } from 'react-native';

import globalStyle from 'Intramuros/src/style/globalStyle';
import Icon from 'react-native-vector-icons/MaterialIcons';

type PropsType = {
  text: string,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  textStyle: {
    color: globalStyle.colors.greyishBrown,
    marginLeft: 10,
    fontFamily: 'Lato-Italic',
    flex: 1,
    flexWrap: 'wrap',
  },
  icon: { color: globalStyle.colors.greyishBrown, marginTop: 3, width: 30 },
});

export default class Schedule extends PureComponent<PropsType> {
  render() {
    const text = `${this.props.text}`;
    return (
      <View style={styles.container}>
        <Icon name="access-time" style={[styles.icon]} size={30} />
        <Text style={styles.textStyle}>{text}</Text>
      </View>
    );
  }
}
