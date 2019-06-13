// @flow

import React, { PureComponent } from 'react';
import { Text, StyleSheet } from 'react-native';

type PropsType = {
  title: string,
  numberOfLines: number,
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    //fontWeight: 'bold',
    color: 'black',
  },
});

export default class Title extends PureComponent<PropsType> {
  render() {
    const numberLines = this.props.numberOfLines ? this.props.numberOfLines : 2;
    return (
      <Text
        numberOfLines={numberLines}
        ellipsizeMode={'tail'}
        style={styles.text}
      >
        {this.props.title}
      </Text>
    );
  }
}
