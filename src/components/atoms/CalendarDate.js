// @flow

import React, { PureComponent } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import globalStyle from 'Intramuros/src/style/globalStyle';
import {
  formatDateVeryShort,
  formatDate3,
} from 'Intramuros/src/services/FormatDate';

type PropsType = {
  date: string,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: globalStyle.colors.yellow,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    fontFamily: 'Lato-Regular',
    color: 'black',
  },
});

export default class CalendarDate extends PureComponent<PropsType> {
  render() {
    return (
      <View
        style={{
          height: '100%',
          zIndex: 0,
          position: 'absolute',
          width: '100%',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        <View style={styles.container}>
          <Text style={styles.text}>{formatDate3(this.props.date)}</Text>
        </View>
      </View>
    );
  }
}
