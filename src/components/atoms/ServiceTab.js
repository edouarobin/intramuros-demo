// @flow

import React, { PureComponent } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

import globalStyle from 'Intramuros/src/style/globalStyle';

type PropsType = {
  tabName: 'Annuaire' | 'Alerter ma mairie',
  isSelected: boolean,
  selectTab: ('Annuaire' | 'Alerter ma mairie') => void,
};

const styles = StyleSheet.create({
  serviceTab: {
    borderBottomWidth: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textIfSelected: {
    fontFamily: 'Lato-Bold',
    fontSize: 14,
    color: 'black',
  },
  textIfNotSelected: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    color: globalStyle.colors.darkerGrey,
  },
  barStyle: {
    height: 2,
    width: '100%',
    backgroundColor: globalStyle.colors.mainBlue,
  },
});

export default class ServiceTab extends PureComponent<PropsType> {
  render() {
    return (
      <TouchableOpacity
        style={styles.serviceTab}
        onPress={() => this.props.selectTab(this.props.tabName)}
      >
        <View style={styles.textContainer}>
          <Text
            style={
              this.props.isSelected
                ? styles.textIfSelected
                : styles.textIfNotSelected
            }
          >
            {this.props.tabName}
          </Text>
        </View>
        {this.props.isSelected && <View style={styles.barStyle} />}
      </TouchableOpacity>
    );
  }
}
