// @flow

import React, { PureComponent } from 'react';
import { Text, Image, View } from 'react-native';
import {
  TAB_NAVIGATOR_HEIGHT,
  PADDING_VERTICAL_TAB_NAVIGATOR,
} from 'Intramuros/src/navigation/AppNavigator.component.js';

type PropsType = {
  picto: any,
  label: string,
  tintColor: any,
};

export default class TabBarIcon extends PureComponent<PropsType> {
  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          style={{
            resizeMode: 'contain',
            height:
              (TAB_NAVIGATOR_HEIGHT - PADDING_VERTICAL_TAB_NAVIGATOR * 2) / 2,
            tintColor: this.props.tintColor,
          }}
          source={this.props.picto}
        />
        <Text
          style={{
            width: '100%',
            height:
              (TAB_NAVIGATOR_HEIGHT - PADDING_VERTICAL_TAB_NAVIGATOR * 2) / 2,
            fontSize: 12,
            fontFamily: 'Lato-Regular',
            color: this.props.tintColor,
            paddingTop: 3,
          }}
        >
          {this.props.label}
        </Text>
      </View>
    );
  }
}
