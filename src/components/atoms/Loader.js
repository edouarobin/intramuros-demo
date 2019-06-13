// @flow

import React, { PureComponent } from 'react';
import { ActivityIndicator, View, StyleSheet, Dimensions } from 'react-native';

import { MessageLabel } from 'Intramuros/src/components';

import globalStyle from 'Intramuros/src/style/globalStyle';

const styles = StyleSheet.create({
  loaderFullPage: {
    height: Dimensions.get('window').height - globalStyle.sizes.headerHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderBar: {
    flexDirection: 'row',
    height: 20,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageStyle: {
    marginLeft: 10,
  },
});

type PropsType = {
  isLoading: boolean,
  message: string,
  fullpage: boolean,
};

export default class Loader extends PureComponent<PropsType> {
  render() {
    return this.props.isLoading ? (
      <View
        style={this.props.fullpage ? styles.loaderFullPage : styles.loaderBar}
      >
        <ActivityIndicator
          size={this.props.fullpage ? 'large' : 'small'}
          color={globalStyle.colors.mainBlue}
        />
        <MessageLabel
          message={this.props.message}
          textStyle={styles.messageStyle}
        />
      </View>
    ) : null;
  }
}
