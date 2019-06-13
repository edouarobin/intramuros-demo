// @flow

import React, { PureComponent } from 'react';
import {
  FlatList,
  Text,
  View,
  SectionList,
  StyleSheet,
  TextInput,
  ScrollView,
  Platform,
} from 'react-native';
import _ from 'lodash';

import { LineFilterButton } from 'Intramuros/src/components';
import globalStyle from 'Intramuros/src/style/globalStyle';

type PropsType = {
  selectedFilters: number[],
  onFilterPress: CategoryType => void,
  dataSource: any,
  counters: {},
};

const styles = StyleSheet.create({
  textSectionHeader: {
    color: '#454545',
    fontFamily: 'Lato-Bold',
    fontSize: 20,
    marginLeft: 25,
    marginRight: 16,
    lineHeight: globalStyle.sizes.medium,
  },
  containerStyle: {
    flex: 1,
    backgroundColor: globalStyle.colors.greyUltraLight,
  },
});

const filterKeyExtractor = (item): string => `${item.id}`;

export default class FiltersFlatlist extends PureComponent<PropsType> {
  render() {
    return (
      <ScrollView
        scrollEnabled={true}
        showsVerticalScrollIndicator={true}
        removeClippedSubviews={Platform.OS === 'ios' ? false : true}
        keyboardShouldPersistTaps="always"
      >
        <View style={styles.containerStyle}>
          <SectionList
            renderItem={({ item }) => (
              <LineFilterButton
                label={item.name}
                counter={
                  this.props.counters && this.props.counters[item.id]
                    ? this.props.counters[item.id]
                    : 0
                }
                onPress={() => this.props.onFilterPress(item)}
                isSelected={
                  (this.props.selectedFilters &&
                    this.props.selectedFilters.indexOf(item.id)) > -1
                    ? true
                    : false
                }
                picto={item.picto}
              />
            )}
            renderSectionHeader={({ section }) => (
              <View
                style={{
                  backgroundColor: globalStyle.colors.greyUltraLight,
                  height: 65,
                  paddingBottom: 10,
                  justifyContent: 'flex-end',
                  flexDirection: 'column',
                }}
              >
                <Text style={styles.textSectionHeader}>{section.key}</Text>
              </View>
            )}
            sections={this.props.dataSource}
            keyExtractor={filterKeyExtractor}
            stickySectionHeadersEnabled={false}
            keyboardShouldPersistTaps="always"
          />
        </View>
      </ScrollView>
    );
  }
}
