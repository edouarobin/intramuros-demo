// @flow

import React, { PureComponent } from 'react';
import { Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { OpenSearchMap, OpenMap } from 'Intramuros/src/services/OpenMap';

import globalStyle from 'Intramuros/src/style/globalStyle';
import Icon from 'react-native-vector-icons/Ionicons';

type PropsType = {
  address: string,
  latitude?: number,
  longitude?: number,
};

const styles = StyleSheet.create({
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  textStyle: {
    color: globalStyle.colors.mainBlue,
    marginLeft: 10,
    flex: 1,
    flexWrap: 'wrap',
    fontFamily: 'Lato-Regular',
  },
  icon: {
    color: globalStyle.colors.mainBlue,
    marginTop: 3,
    width: 30,
    textAlign: 'center',
  },
});

export default class ContactMap extends PureComponent<PropsType> {
  openMapAddress = () => {
    if (this.props.address) {
      if (this.props.latitude && this.props.longitude) {
        OpenMap(this.props.latitude, this.props.longitude, this.props.address);
      } else {
        OpenSearchMap(this.props.address);
      }
    }
  };

  removeFranceFromAddres = (address: string): string =>
    address.replace(', France', '');

  render() {
    return (
      <TouchableOpacity
        onPress={this.openMapAddress}
        style={styles.addressContainer}
      >
        <Icon name="ios-pin" style={[styles.icon]} size={30} />
        <Text style={styles.textStyle}>
          {this.removeFranceFromAddres(this.props.address)}
        </Text>
      </TouchableOpacity>
    );
  }
}
