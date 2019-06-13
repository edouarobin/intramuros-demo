// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
// $FlowFixMe
import LinearGradient from 'react-native-linear-gradient';

import { eventDetailGradient } from 'Intramuros/src/style/globalStyle';
import { GoBackButton } from 'Intramuros/src/components';

type PropsType = {
  navigation: any,
  gradientColor: string,
  goBackColor: string,
};

export default class GoBackButtonWithGradient extends PureComponent<PropsType> {
  render() {
    return (
      <LinearGradient
        colors={[this.props.gradientColor, 'rgba(256,256,256,0)']}
        style={{
          position: 'absolute',
          flex: 1,
          zIndex: 1,
          width: '100%',
          height: eventDetailGradient,
        }}
      >
        <GoBackButton
          navigation={this.props.navigation}
          color={this.props.goBackColor}
        />
      </LinearGradient>
    );
  }
}
