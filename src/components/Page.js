// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';

import globalStyle from 'Intramuros/src/style/globalStyle';
import { Toaster } from 'Intramuros/src/components';

type PropsType = {
  children: any,
  noPadding?: boolean,
  backgroundColor?: string,
};

const styles = StyleSheet.create({
  pageStyle: {
    flex: 1,
    backgroundColor: globalStyle.colors.white,
    paddingTop: 26,
    paddingHorizontal: 16,
  },
  noPadding: { paddingTop: 0, paddingHorizontal: 0 },
});

export default class Page extends PureComponent<PropsType> {
  render() {
    return (
      <View
        style={[
          styles.pageStyle,
          this.props.noPadding && styles.noPadding,
          this.props.backgroundColor && {
            backgroundColor: this.props.backgroundColor,
          },
        ]}
      >
        <StatusBar
          translucent
          animated={true}
          backgroundColor={globalStyle.colors.middleBlue}
          barStyle="light-content"
        />
        {this.props.children}
        <Toaster />
      </View>
    );
  }
}
