// @flow

import React, { PureComponent } from 'react';
import { Text, StyleSheet, View } from 'react-native';

import globalStyle from 'Intramuros/src/style/globalStyle';

type PropsType = {
  subtitle: string,
  subtitle2?: string,
};

const styles = StyleSheet.create({
  text: {
    color: globalStyle.colors.greyishBrown,
    fontSize: 14,
    fontFamily: 'Lato-Regular',
    paddingTop: 4,
  },
  textAlone: {
    color: globalStyle.colors.greyishBrown,
    fontSize: 14,
    fontFamily: 'Lato-Regular',
    paddingTop: 4,
  },
});

export default class Subtitle extends PureComponent<PropsType> {
  render() {
    if (this.props.subtitle2) {
      let textMerged = this.props.subtitle2 + ' - ' + this.props.subtitle;
      return (
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.text} numberOfLines={1}>
            {textMerged}
          </Text>
        </View>
      );
    }
    return (
      <Text numberOfLines={1} style={styles.textAlone}>
        {this.props.subtitle}
      </Text>
    );
  }
}
