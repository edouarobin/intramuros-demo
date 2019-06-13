// @flow

import React, { PureComponent } from 'react';
import { Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { replace } from 'lodash';

import globalStyle from 'Intramuros/src/style/globalStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import { OpenMap } from 'Intramuros/src/services/OpenMap';

type PropsType = {
  address: string,
  latitude: number,
  longitude: number,
  label: string,
};

const styles = StyleSheet.create({
  addressContainer: {
    flexDirection: 'row',
    marginTop: 17,
    marginBottom: 28,
    alignSelf: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: globalStyle.colors.mainBlue,
    marginLeft: 10,
    textAlign: 'left',
    fontFamily: 'Lato-Regular',
  },
  icon: {
    color: globalStyle.colors.mainBlue,
    marginTop: 3,
    width: 20,
    textAlign: 'center',
  },
});

export default class AddressLabel extends PureComponent<PropsType> {
  removeFranceFromAddres = (address: string): string =>
    replace(address, ', France', '');

  getCoordinatesAndOpenMap = () => {
    if (this.props.latitude && this.props.longitude) {
      OpenMap(this.props.latitude, this.props.longitude, this.props.label);
    }
  };

  render() {
    return (
      <TouchableOpacity
        style={styles.addressContainer}
        onPress={this.getCoordinatesAndOpenMap}
      >
        <Icon name="ios-pin" style={[styles.icon]} size={24} />
        <Text style={styles.textStyle}>
          {this.removeFranceFromAddres(this.props.address)}
        </Text>
      </TouchableOpacity>
    );
  }
}
