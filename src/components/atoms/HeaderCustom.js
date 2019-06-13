// @flow

import React, { PureComponent } from 'react';
import { View } from 'react-native';

import { headerContainer, screenWidth } from 'Intramuros/src/style/globalStyle';

import { HeaderLogoLeft, CitySelectorButton } from 'Intramuros/src/components';

type PropsType = {
  title: string,
};

export default class HeaderCustom extends PureComponent<PropsType> {
  render() {
    return (
      <View
        style={[
          headerContainer,
          {
            maxWidth: screenWidth,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          },
        ]}
      >
        <HeaderLogoLeft />
        <CitySelectorButton pageName={this.props.title} />
      </View>
    );
  }
}
