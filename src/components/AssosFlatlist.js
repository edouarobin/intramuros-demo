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
  Button,
} from 'react-native';
import { isEqual } from 'lodash';
import { GenerateAssosListDataSource } from 'Intramuros/src/services/ListsToolsDataSource';
import { AssosLineButton, FilterInput } from 'Intramuros/src/components';
import globalStyle from 'Intramuros/src/style/globalStyle';
import memoize from 'memoize-one';
import { indexOf, size } from 'lodash';
import KeyboardSpacer from 'react-native-keyboard-spacer';

type PropsType = {
  navigation: any,
  assosList: AssosDisplayableType,
  selectedCity?: CityType,
  selectedAssosNotification: number[],
  toggleAssoNotification: (id: number, assoName: string) => void,
};

const styles = StyleSheet.create({
  textSectionHeader: {
    color: '#535353',
    fontFamily: 'Lato-Regular',
    fontSize: 15,
    marginLeft: 16,
    marginRight: 16,
    lineHeight: globalStyle.sizes.medium,
  },
  containerStyle: { flex: 1, backgroundColor: globalStyle.colors.white },
});

const assoKeyExtractor = (item): string => `${item.id}`;

export default class AssosFlatlist extends PureComponent<PropsType> {
  state = {
    filterText: null,
  };

  searchChanged = text => {
    this.setState({ filterText: text });
  };

  _calculateDatasource = memoize(
    (assosList, filterText) =>
      GenerateAssosListDataSource(assosList, filterText),
    isEqual
  );

  _goToAssolDetail = (asso: AssosType) => {
    this.props.navigation.navigate('AssoDetail', { asso: asso });
  };

  render() {
    const dataSource = this._calculateDatasource(
      this.props.assosList,
      this.state.filterText
    );
    return (
      <ScrollView
        scrollEnabled={true}
        showsVerticalScrollIndicator={true}
        removeClippedSubviews={Platform.OS === 'ios' ? false : true}
        keyboardShouldPersistTaps="always"
        style={{ backgroundColor: globalStyle.colors.white }}
      >
        <View style={styles.containerStyle}>
          <FilterInput
            searchChanged={this.searchChanged}
            placeHolder={'Trouver une association'}
            searchText={this.state.filterText}
          />
          <SectionList
            renderItem={({ item }) => {
              return (
                <AssosLineButton
                  label={item.name}
                  picto={item.logo ? item.logo : item.category_picto}
                  onPress={() => this._goToAssolDetail(item)}
                  onNotificationPress={() => {
                    this.props.toggleAssoNotification(item.id, item.name);
                  }}
                  isNotificationSelected={
                    indexOf(this.props.selectedAssosNotification, item.id) > -1
                  }
                />
              );
            }}
            renderSectionHeader={({ section }) => (
              <View
                style={{
                  backgroundColor: globalStyle.colors.white,
                  height: 55,
                  paddingBottom: 10,
                  justifyContent: 'flex-end',
                  flexDirection: 'column',
                }}
              >
                <Text style={styles.textSectionHeader}>{section.key} </Text>
              </View>
            )}
            ListEmptyComponent={() => {
              if (this.state.filterText)
                return (
                  <Text
                    style={{
                      marginTop: 16,
                      marginBottom: 16,
                      height: 20,
                      fontSize: 18,
                      fontFamily: 'Lato-Regular',
                      color: globalStyle.colors.darkerGrey,
                      textAlign: 'center',
                    }}
                  >
                    {'Aucun résultat.'}
                  </Text>
                );
              return null;
            }}
            sections={dataSource}
            keyExtractor={assoKeyExtractor}
            ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
            stickySectionHeadersEnabled={false}
            keyboardShouldPersistTaps="always"
            style={{ marginBottom: 40 }}
            initialNumToRender={30}
          />
        </View>
        <KeyboardSpacer />
      </ScrollView>
    );
  }
}
