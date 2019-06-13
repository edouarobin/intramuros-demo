// @flow

import React, { PureComponent } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import globalStyle from 'Intramuros/src/style/globalStyle';

type PropsType = {
  distance: number,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: globalStyle.colors.yellow,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    borderRadius: 3,
    paddingHorizontal: 13,
  },
  text: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    color: 'black',
  },
});

export default class YellowLabelDistance extends PureComponent<PropsType> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{`À ${this.props.distance} km`}</Text>
      </View>
    );
  }
}
