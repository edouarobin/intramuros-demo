// @flow

import React, { PureComponent } from 'react';
import { Text, View, Image, TouchableOpacity, Alert } from 'react-native';

import { headerTitle } from 'Intramuros/src/style/globalStyle';
import { MyFastImage } from 'Intramuros/src/components';
import { SettingsModal } from 'Intramuros/src/components';
import IntramurosLogo from 'Intramuros/src/assets/IntramurosLogo.png';

type StateType = {
  modalVisible: boolean,
};

export default class HeaderLogoLeft extends PureComponent<PropsType> {
  state = {
    modalVisible: false,
  };

  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginLeft: 15,
        }}
      >
        <TouchableOpacity onPress={() => this.setState({ modalVisible: true })}>
          <MyFastImage
            style={{
              height: 44,
              width: 44,
            }}
            source={IntramurosLogo}
            localImage
            resizeMode={'contain'}
          />
        </TouchableOpacity>
        <SettingsModal
          modalVisible={this.state.modalVisible}
          closeModal={() => this.setState({ modalVisible: false })}
        />
      </View>
    );
  }
}
