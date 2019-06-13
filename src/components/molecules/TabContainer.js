// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';

import { ServiceTab } from 'Intramuros/src/components';

type PropsType = {
  selectedTab: 'Annuaire' | 'Alerter ma mairie',
  selectTab: ('Annuaire' | 'Alerter ma mairie') => void,
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    height: 48,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: 'white',
    elevation: 5,
  },
});

export default class TabContainer extends PureComponent<PropsType> {
  render() {
    return (
      <View style={styles.tabContainer}>
        <ServiceTab
          tabName="Annuaire"
          isSelected={this.props.selectedTab === 'Annuaire'}
          selectTab={this.props.selectTab}
        />
        <ServiceTab
          tabName="Alerter ma mairie"
          isSelected={this.props.selectedTab === 'Alerter ma mairie'}
          selectTab={this.props.selectTab}
        />
      </View>
    );
  }
}
