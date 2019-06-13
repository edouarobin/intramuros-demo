// @flow

import React, { PureComponent } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { web } from 'react-native-communications';

import globalStyle from 'Intramuros/src/style/globalStyle';
import Icon from 'react-native-vector-icons/Ionicons';

type PropsType = {
  website: string,
  icon: boolean,
  fisrtElement: boolean,
};

const styles = StyleSheet.create({
  addressContainerFirstElement: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  textStyle: {
    color: globalStyle.colors.mainBlue,
    flex: 1,
    fontFamily: 'Lato-Regular',
  },
  textStyleMargin: {
    color: globalStyle.colors.mainBlue,
    marginLeft: 10,
    flex: 1,
    fontFamily: 'Lato-Regular',
  },
  icon: {
    color: globalStyle.colors.mainBlue,
    marginTop: 3,
    width: 30,
    textAlign: 'center',
  },
});

export default class ContactWeb extends PureComponent<PropsType> {
  render() {
    return (
      <TouchableOpacity
        onPress={() => web(this.props.website)}
        style={
          this.props.fisrtElement
            ? styles.addressContainerFirstElement
            : styles.addressContainer
        }
      >
        {this.props.icon ? (
          <Icon name="ios-globe" style={[styles.icon]} size={30} />
        ) : null}
        {this.props.icon ? (
          <Text numberOfLines={1} style={styles.textStyleMargin}>
            {this.props.website}
          </Text>
        ) : (
          <Text numberOfLines={1} style={styles.textStyle}>
            {this.props.website}
          </Text>
        )}
      </TouchableOpacity>
    );
  }
}
