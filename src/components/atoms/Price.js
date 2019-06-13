// @flow

import React, { PureComponent } from 'react';
import { Text, StyleSheet, View } from 'react-native';

import globalStyle from 'Intramuros/src/style/globalStyle';
import Icon from 'react-native-vector-icons/MaterialIcons';

type PropsType = {
  price: string,
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

export default class Price extends PureComponent<PropsType> {
  render() {
    const price = `${this.props.price}`;
    return (
      <View style={styles.container}>
        <Icon name="euro-symbol" style={[styles.icon]} size={30} />
        <Text style={styles.textStyle}>{price}</Text>
      </View>
    );
  }
}
